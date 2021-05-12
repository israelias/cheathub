from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User
from flask_restful import Resource, url_for
from bson import ObjectId
import datetime

from mongoengine.errors import (
    FieldDoesNotExist,
    NotUniqueError,
    DoesNotExist,
    ValidationError,
    InvalidQueryError,
)

from database.parsers import (
    pagination_parser,
    search_parser,
    tag_parser,
    language_parser,
)

from services.pagination_service import pagination_meta, pagination_links

from database.constants import (
    all_languages,
    all_tags,
)

# ===========================================================================
# *                Snippet  RESTful Resource
# ?  Queries Snippet objects against the Snippet database model.
#
# Responsible for all CRUD operations to a Snippet document.
# ===========================================================================


class SnippetsApi(Resource):
    """Requests against the Snippet model to `api/snippets` (plural)"""

    def get(self):
        """Retrieve a list of public snippets.

        Yields:
            Parse web args from the request.
            Get all existing tags from the databse.
            Query snippets that include tags from the request.
            If the tag field is empty,
                return all snippets with all tags.

        Returns:
            [{dict}]: JSON Flask Response
            A paginated list of Snippet objects
        """

        tag_request = tag_parser.parse_args()
        tags = tag_request["tags"]

        page_request = pagination_parser.parse_args()
        page = page_request["page"]
        per_page = page_request["per_page"]

        all_tags_arr = all_tags()

        paginated = (
            Snippet.objects(
                tags__in=tags if tags else all_tags_arr,
            )
            .order_by("-addedOn")
            .paginate(
                page=page,
                per_page=per_page,
            )
        )

        meta = pagination_meta(paginated)
        links = pagination_links(paginated, "snippetsapi")

        resp = {
            "links": links,
            "has_prev": paginated.has_prev,
            "has_next": paginated.has_next,
            "page": paginated.page,
            "total_pages": paginated.pages,
            "items_per_page": paginated.per_page,
            "total_items": paginated.total,
            "items": [
                {
                    "_id": str(ObjectId(k["id"])),
                    "title": k["title"],
                    "filename": k["filename"],
                    "description": k["description"],
                    "language": k["language"],
                    "value": k["value"],
                    "addedBy": k["addedBy"]["username"],
                    "likedBy": [elem["username"] for elem in k["likedBy"]],
                    "tags": k["tags"],
                    "addedOn": k["addedOn"],
                    "updatedOn": k["updatedOn"],
                    "private": k["private"],
                    "source": k["source"],
                    "url": url_for("snippetapi", id=str(ObjectId(k["id"]))),
                }
                for k in paginated.items
            ],
        }
        return jsonify(resp)

    @jwt_required()
    def post(self):
        """Save a Snippet document created by an authorized User.

        Yields:
            Identify a user object against a User model
            Set a Snippet document based on the Snippet model.
            Add the Snippet to the User's `snippets_created` field.
        Flags:
            File and validation errors
        Returns: {dict}
            JSON Flask Response, 200
                else: Notifies the frontend with status message.
        """
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(username=user_id)
            now = datetime.datetime.now(datetime.timezone.utc)

            snippet = Snippet(**body, addedBy=user, addedOn=now)
            snippet.save()
            user.update(push__snippets_created=snippet)
            user.save()
            id = snippet.id
            return {"id": str(id)}, 200

        except (FieldDoesNotExist, ValidationError):
            return {"message": "Request is missing required fields."}, 400
        except NotUniqueError:
            return {"message": "Code Snippet with given name already exists."}, 409
        except Exception as e:
            return {"message": "Something went wrong."}, 500


class SnippetApi(Resource):
    """Requests against the Snippet model to `api/snippets/<id>` (singular)"""

    def get(self, id):
        """Retrieve one Snippet object with a matching id.

        Yields:
            Identify a Snippet object against a Snippet model
        Flags:
            If it doesn't exist.
        Returns: [{dict}]
            mappable JSON Flask Response, 200
            an array, even with one value to keep the frontend handlers consistent.
                else: Notifies the frontend with status message.
        """
        try:
            snippet = Snippet.objects(id=id)
            response = [
                {
                    "_id": str(ObjectId(doc["id"])),
                    "title": doc["title"],
                    "filename": doc["filename"],
                    "description": doc["description"],
                    "language": doc["language"],
                    "value": doc["value"],
                    "addedBy": doc["addedBy"]["username"],
                    "likedBy": [elem["username"] for elem in doc["likedBy"]],
                    "tags": doc["tags"],
                    "addedOn": doc["addedOn"],
                    "updatedOn": doc["updatedOn"],
                    "private": doc["private"],
                    "source": doc["source"],
                    "score": doc["score"],
                }
                for doc in snippet
            ]

            return jsonify(response)
        except DoesNotExist:

            return {"message": "Code Snippet with given id doesn't exist."}, 410
        except Exception:

            return {"message": "Something went wrong."}, 500

    @jwt_required()
    def put(self, id):
        """Update one Snippet object with a matching id.

        Yields:
            Identify a user object against a User model via token.
            Identify a Snippet document created by the user object.
            Accept all updates to the Snippet document.
        Flags:
            If it doesn't exist.
            If required fields are missing.
        Returns: {dict}
            JSON Flask Response, 200
                else: Notifies the frontend with status code and message.
        """
        try:
            user_id = get_jwt_identity()
            username = User.objects.get(username=user_id)
            snippet = Snippet.objects.get(id=id, addedBy=username)
            body = request.get_json()
            now = datetime.datetime.now(datetime.timezone.utc)
            snippet.update(**body, updatedOn=now)
            return {"message": "Snippet updated"}, 200

        except InvalidQueryError:
            return {"message": "Request is missing required fields."}, 400
        except DoesNotExist:
            return {
                "message": "Updating Code Snippet added by someone else is forbidden."
            }, 403

        except Exception:
            return {"message": "Something went wrong."}, 500

    @jwt_required()
    def delete(self, id):
        """Delete one Snippet object with a matching id.

        Yields:
            Identify a user object against a User model via token.
            Identify a Snippet document created by the user object.
            Delete the Snippet document.
        Flags:
            If it doesn't exist and we've gotten this far,
                It means it's made by someone else.
            If required fields are missing.
        Returns: {dict}
            JSON Flask Response, 200
                else: Notifies the frontend with status code and message.
        """
        try:
            user_id = get_jwt_identity()
            username = User.objects.get(username=user_id)
            snippet = Snippet.objects.get(id=id, addedBy=username)
            snippet.delete()
            return {"message": "Snippet deleted"}, 200
        except DoesNotExist:
            return {
                "message": "Deleting Code Snippet added by someone else is forbidden."
            }, 403

        except Exception:
            return {"message": "Something went wrong."}, 500


class LikeSnippetApi(Resource):
    """Requests against the Snippet model to `api/likesnippet/<id>`"""

    @jwt_required()
    def post(self, id):
        """Add/Remove a Snippet reference to the `snippets_liked` list field of a User
            document with matching id; vice-versa to the `liked_by` list field of matching
            Snippet document.

        Yields:
            Identify a user object against a User model via token.
            Identify a Snippet document based on the `id` param.
            If the User is already in the Snippet's `liked_by` array,
                it means we're `unfaving` it.
            Otherwise, we're `faving` it.
            Update and reload both references to each other.
        Returns: {dict}
            JSON Flask Response, 200 with message
        Note:
            This response is a computation as there is no `Fave` collection.
        """
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        snippet = Snippet.objects.get(id=id)
        if user in snippet.likedBy:
            print("existing")
            snippet.update(pull__likedBy=user, dec__score=1)
            snippet.save()
            snippet.reload()
            user.update(pull__snippets_liked=snippet)
            user.save()
            user.reload()
            print("snippet unfaved")
            return {"message": "Snippet unfaved"}, 200
        else:
            print("new")
            snippet.update(push__likedBy=user, inc__score=1)
            snippet.save()
            snippet.reload()
            user.update(push__snippets_liked=snippet)
            user.save()
            user.reload()
            print("snippet faved")
            return {"message": "Snippet faved"}, 200