from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, url_for
from bson import ObjectId

from database.models import Snippet, User, Collection

import datetime

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


class MySnippetsApi(Resource):
    """Defines private endpoint that returns an array of all snippets created by authorized user."""

    def get(self, id):
        """Get method at endpoint `/api/users/<id>/snippets` where `id` is the authorized user."""

        user = User.objects.get(username=id)

        snippets = Snippet.objects(addedBy=user).order_by("-addedOn")

        resp = [
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
                "url": url_for("snippetapi", id=str(ObjectId(doc["id"]))),
            }
            for doc in snippets
        ]

        return jsonify(resp)


class MyFaveSnippetsApi(Resource):
    """Defines private endpoint that returns an array of all snippets `liked` by authorized user."""

    def get(self, id):
        """Get method at endpoint `/api/users/<id>/snippets` where `id` is the authorized user."""

        user = User.objects.get(username=id)
        snippets = []
        for doc in Snippet.objects(likedBy=user):
            snippets.append(
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
                    "url": url_for("snippetapi", id=str(ObjectId(doc["id"]))),
                }
            )

        return jsonify(snippets)


class MyCollectionsApi(Resource):
    """Defines a private endpoint that returns an array of all all user-saved collections"""

    def get(self, user_id):
        """Get method at endpoint `/api/users/<user_id>/collections` where `user_id` is the authorized user's username."""

        user = User.objects.get(username=user_id)
        collections = Collection.objects(owner=user).order_by("-date")

        response = [
            {
                "_id": str(ObjectId(doc["id"])),
                "name": doc["name"],
                "owner": doc["owner"]["username"],
                "private": doc["private"],
                "url": url_for(
                    "mycollectionapi", user_id=user_id, id=str(ObjectId(doc["id"]))
                ),
                "snippets": [
                    {
                        "_id": str(ObjectId(doc["id"])),
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
                        "score": doc["score"],
                        "url": url_for("snippetapi", id=str(ObjectId(doc["id"]))),
                    }
                    for k in doc["snippets"]
                ],
            }
            for doc in collections
        ]

        return jsonify(response)


class MyCollectionApi(Resource):
    """Defines a private endpoint that returns a collection item from a user's own saved collections"""

    def get(self, user_id, id):
        """Get method at endpoint `/api/users/<user_id>/collections/<id>` where user_id is the authorized user's username, and `id` is the collection object id."""
        try:
            user = User.objects.get(username=user_id)
            collection = []
            for doc in Collection.objects(owner=user, id=id):
                collection.append(
                    {
                        "_id": str(ObjectId(doc["id"])),
                        "name": doc["name"],
                        "owner": doc["owner"]["username"],
                        "private": doc["private"],
                        "url": url_for(
                            "mycollectionapi",
                            user_id=user_id,
                            id=str(ObjectId(doc["id"])),
                        ),
                        "snippets": [
                            {
                                "_id": str(ObjectId(doc["id"])),
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
                                "url": url_for(
                                    "snippetapi", id=str(ObjectId(doc["id"]))
                                ),
                            }
                            for k in doc["snippets"]
                        ],
                    }
                )

            return jsonify(collection)

        except DoesNotExist:
            raise SnippetNotExistsError
        except Exception:
            raise InternalServerError