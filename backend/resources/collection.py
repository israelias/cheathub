from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, Collection, User
from flask_restful import Resource
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
import datetime
from bson import ObjectId

#===========================================================================
# *                Collection  RESTful Resource
# ?  Queries Collection objects against the Collection database model.
# 
# Responsible for all CRUD operations to a Collection document.
#===========================================================================

class CollectionsApi(Resource):
    """Requests against the Collection model to `api/collections` (plural)"""

    def get(self):
        """Retrieve loose list of all Collections.

        Yields:
            jsonify a Query object of the Collection model

        Returns:
            [{dict}]: JSON Flask Response
            A loose reference list of Collection objects
        Note:
            This endpoint is not the primary endpoint for fetching field details,
        """
        collections = Collection.objects(private=False)
        response = [
            {
                "_id": str(ObjectId(doc["id"])),
                "name": doc["name"],
                "owner": doc["owner"]["username"],
                "snippets": [
                    {
                        "snippet_title": k["title"],
                        "snippet_id": str(ObjectId(k["id"])),
                    }
                    for k in doc["snippets"]
                ],
                "private": doc["private"],
            }
            for doc in collections
        ]

        return jsonify(response)

    @jwt_required()
    def post(self):
        """Save a Collection document created by an authorized User.

        Yields:
            Identify a user object against a User model
            Set a Collection document based on the Collection model.
            Add the Collection to the User's `collections` field.
        Flags:
            File and validation errors
        Returns: {dict}
            JSON Flask Response, 200
                else: Notifies the frontend with status message.
        """
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            owner = User.objects.get(username=user_id)
            now = datetime.datetime.now(datetime.timezone.utc)

            collection = Collection(**body, owner=owner, date=now)
            collection.save()
            owner.update(push__collections=collection)
            owner.save()
            id = collection.id
            return {"id": str(id)}, 200

        except (FieldDoesNotExist, ValidationError):
            return {"message": "Request is missing required fields."}, 400
        except NotUniqueError:
            return {"message": "Collection with given name already exists."}, 409
        except Exception as e:
            return {"message": "Something went wrong."}, 500


class CollectionApi(Resource):
    """Requests against the Collection model to `api/collections/<id>` (singular)"""

    def get(self, id):
        """Retrieve one Collection object with a matching id.

        Yields:
            Identify a Collection object against a Collection model
        Flags:
            If it doesn't exist.
        Returns: [{dict}]
            mappable JSON Flask Response, 200,
            with dereferenced nested fields full of data,
            as an array even for one document to keep the frontend handlers consistent.
                else: Notifies the frontend with status message.
        """
        try:
            collection = []
            for doc in Collection.objects(id=id):
                collection.append(
                    {
                        "_id": str(ObjectId(doc["id"])),
                        "name": doc["name"],
                        "owner": doc["owner"]["username"],
                        "private": doc["private"],
                        "snippets_id": [
                            {"label": i["title"], "value": str(ObjectId(i["id"]))}
                            for i in doc["snippets"]
                        ],
                        "snippets": [
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
                            }
                            for k in doc["snippets"]
                        ],
                    }
                )

            return jsonify(collection)

        except DoesNotExist:
            return {"message": "Collection with given id doesn't exist."}, 410
        except Exception:
            return {"message": "Something went wrong."}, 500

    @jwt_required()
    def put(self, id):
        """Update one Collection object with a matching id.

        Yields:
            Identify a user object against a User model via token.
            Identify a Collection document created by the user object.
            Iterate through the `snippets` field of the request.
                Identify a Snippet object against the Snippet model
                for every item in the `snippets` field.
            Set this array as a the new `snippets` field in the Collection.

        Flags:
            If it doesn't exist.
            If required fields are missing.
        Returns: {dict}
            JSON Flask Response, 200
                else: Notifies the frontend with status code and message.
        Note:
            Looping and setting a new array seems like an expensive computation
            every time someone updates a collection, and the snippets within it.
            Why can't we just keep it if it's already there, add it if it isn't?
            Because the Snippet has to first exist in the database in order to
            `find` and add it to a Collection, the result will always be an
            `all or not all` flip. An alternative might be to create separate endpoints
            for adding and removing values from a nested document, which may or may
            not require the same amount of computation.
        """
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(username=user_id)
            collection = Collection.objects.get(id=id, owner=user)
            body = request.get_json()
            name = body["name"]
            snippets = body["snippets"]
            now = datetime.datetime.now(datetime.timezone.utc)

            snippet_array = []
            for snippet in snippets:
                snip = Snippet.objects.get(id=snippet)
                snippet_array.append(snip)

            collection.update(name=name, date=now, set__snippets=snippet_array)
            collection.save()

            return {"message": "Collection updated"}, 200

        except InvalidQueryError:
            return {"message": "Request is missing required fields."}, 400
        except DoesNotExist:
            return {
                "message": "Updating Collection added by someone else is forbidden."
            }, 403
        except Exception:
            return {"message": "Something went wrong."}, 500

    @jwt_required()
    def delete(self, id):
        """Delete one Collection object with a matching id.

        Yields:
            Identify a user object against a User model via token.
            Identify a Collection document created by the user object.
            Delete the Collection document.
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
            user = User.objects.get(username=user_id)
            collection = Collection.objects.get(id=id, owner=user)
            collection.delete()
            return {"message": "Collection deleted"}, 200
        except DoesNotExist:
            return {
                "message": "Deleting Collection added by someone else is forbidden."
            }, 403
        except Exception:
            return {"message": "Something went wrong."}, 500