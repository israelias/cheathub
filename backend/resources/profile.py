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

#===========================================================================
# *                   User Profile RESTful Resource
# ?  Queries to a User model's relationship to Snippets and Collections
# All GET methods.
# Unique to a User's own saved Snippet and Collection documents
#===========================================================================

class MySnippetsApi(Resource):
    """Requests against the Snippet model to `api/users/<id>/snippets`"""

    def get(self, id):
        """Retrieve a complete list of all Snippets created by a user.

        Yields:
            Identify a User object against a User model via username (id).
            jsonify a Query object to the Snippets database of all
            Snippet objects with field `addedBy` equal to the User
            model's unique username.

        Returns:
            [{dict}]: JSON Flask Response
            A complete list of Snippet objects, with all nested fields
            dereferenced.
        Note:
            This endpoint is the primary endpoint for fetching User's
            Snippets profile.
        """
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
    """Requests against the Snippet model to `api/users/<id>/snippets/faves`"""

    def get(self, id):
        """Retrieve a complete list of all Snippets `liked` by a user.

        Yields:
            Identify a User object against a User model via username.
            jsonify a Query object to the Snippets database of all
            Snippet objects with a `likedBy` list field that includes the
            User.

        Returns:
            [{dict}]: JSON Flask Response
            A complete list of Snippet objects, with all nested fields
            dereferenced.
        Note:
            This API response is modeled to be received as a Collection object,
            even though it is a pure computation of values in nested document
            fields. This is done to simplofy frontend handlers as the `Faves`
            endpoint's UI is rendered as a unique `collection`.

        """
        user = User.objects.get(username=id)
        snips = Snippet.objects(likedBy=user)
        response = [
            {
                "_id": "faves",
                "name": "Faves",
                "owner": id,
                "private": False,
                "url": url_for("myfavesnippetsapi", id=id),
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
                        "url": url_for("myfavesnippetsapi", id=user),
                    }
                    for k in snips
                ],
            }
        ]

        return jsonify(response)


class MyCollectionsApi(Resource):
    """Requests against the Snippet model to `api/users/<id>/collections`"""

    def get(self, user_id):
        """Retrieve a complete list of all Collections created by a user.

        Yields:
            Identify a User object against a User model via username (id).
            jsonify a Query object to the Collections database of all
            Collection objects with field `owner` equal to the User
            model via unique username and/or id.

        Returns:
            [{dict}]: JSON Flask Response
            A complete list of Snippet objects, with all nested fields
            dereferenced.
        Note:
            This endpoint is the primary endpoint for fetching User's
            Snippets profile.
        """

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
                        "url": url_for("snippetapi", id=str(ObjectId(doc["id"]))),
                    }
                    for k in doc["snippets"]
                ],
            }
            for doc in collections
        ]

        return jsonify(response)


class MyCollectionApi(Resource):
    """Requests against the Snippet model to `api/users/<user_id>/collections/<id>`"""

    def get(self, user_id, id):
        """Retrieve one Collection created by a user.

        Yields:
            Identify a User object against a User model via username (user_id).
            jsonify a Query object to the Collections database of a
            Collection object with field `owner` equal to the User
            model via unique username `user_id`, and a `collecion_id`
            equal to the query `id`.

        Returns:
            [{dict}]: JSON Flask Response
            A healthy Collection object with unnested, dereferenced Snippets  
        Note:
            This endpoint returns a response identical to `api/collections/<id>`;
            the only difference being the `user_id` argument.
            This is to accommodate Collections flagged as `private` to the User, a
            field that is currently false for all Collections by default.
        """
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


class MyCollectionsOptionsApi(Resource):
    """Requests against the Collection model to `api/users/<user_id>/collections/options`"""

    def get(self, user_id):
        """Retrieve an array of all Collections available to the user.

        Yields:
            Identify a User object against a User model via username (user_id).
            jsonify a Query object to the Collections database of all
            Collection objects with field `owner` equal to the User
            model via unique username `user_id`, formatted as `options` in
            an HTML `select` element.

        Returns:
            [{dict}]: JSON Flask Response
                array of Collections with `label` and `value` keys for `Select` UI.  
        Note:
            This key endpoint is what allows the frontend to quickly present documents
            as creatable and/or multi-select options immediately following updates to
            a user's Collections profile.
        """
        user = User.objects.get(username=user_id)
        collections = Collection.objects(owner=user)
        response = [
            {"label": doc["name"], "value": str(ObjectId(doc["id"]))}
            for doc in collections
        ]
        return jsonify(response)


class MySnippetsOptionsApi(Resource):
    """Requests against the Snippet model to `api/users/<user_id>/snippets/options`"""

    def get(self, user_id):
        """Retrieve an array of all Snippets available to the user.

        Yields:
            Identify a User object against a User model via username (user_id).
            jsonify a Query object to the Snippet database of all
            Snippet objects with field `addedBy` equal to the User
            model via unique username `user_id`, formatted as `options` in
            an HTML `select` element.

        Returns:
            [{dict}]: JSON Flask Response
                array of Snippets with `label` and `value` keys for `Select` UI.  
        Note:
            This key endpoint is what allows the frontend to present documents
            as creatable and/or multi-select options in an instant following live 
            and/or recurrent updates and additions to a user's saved Snippets.
        """
        user = User.objects.get(username=user_id)
        snippets = Snippet.objects(addedBy=user)
        response = [
            {"label": doc["title"], "value": str(ObjectId(doc["id"]))}
            for doc in snippets
        ]

        return jsonify(response)
