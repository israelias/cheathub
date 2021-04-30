from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User, Collection
from flask_restful import Resource, marshal_with, url_for
from bson import ObjectId
import datetime
from flask_mongoengine.wtf import model_form
from flask_mongoengine import Pagination

from flask_restful.fields import Boolean, Nested, Integer, List, String, DateTime, Url
from flask_restful.reqparse import RequestParser
from flask_restful.inputs import positive, url

from mongoengine.errors import (
    FieldDoesNotExist,
    NotUniqueError,
    DoesNotExist,
    ValidationError,
    InvalidQueryError,
)
from resources.errors import (
    SchemaValidationError,
    SnippetAlreadyExistsError,
    InternalServerError,
    UpdatingSnippetError,
    DeletingSnippetError,
    SnippetNotExistsError,
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
    # all_fans,
    # all_usernames
)


class SnippetsApi(Resource):
    """Handles HTTP requests to URL: api/snippets."""

    # @jwt_required()
    def get(self):
        """Retrieve a list of public snippets."""

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
            raise SchemaValidationError
        except NotUniqueError:
            raise SnippetAlreadyExistsError
        except Exception as e:
            raise InternalServerError


class SnippetApi(Resource):
    def get(self, id):
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
            raise SnippetNotExistsError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            username = User.objects.get(username=user_id)
            snippet = Snippet.objects.get(id=id, addedBy=username)
            body = request.get_json()
            now = datetime.datetime.now(datetime.timezone.utc)
            snippet.update(**body, updatedOn=now)
            return {"message": "Snippet updated"}, 200

        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingSnippetError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            username = User.objects.get(username=user_id)
            snippet = Snippet.objects.get(id=id, addedBy=username)
            snippet.delete()
            return {"message": "Snippet deleted"}, 200
        except DoesNotExist:
            raise DeletingSnippetError
        except Exception:
            raise InternalServerError


class LikeSnippetApi(Resource):
    @jwt_required()
    def post(self, id):
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