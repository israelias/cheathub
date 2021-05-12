from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import User
from flask_restful import Resource
from bson import ObjectId

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
    UserNotExistsError,
)

# ===========================================================================
# *                User Document  RESTful Resource
# ?  Queries User objects against the User database model.
#
# Responsible for all CRUD operations to a User document.
# ===========================================================================


class UsersApi(Resource):
    """Requests against the User model to `api/users`"""

    def get(self):
        """Returns an array of all User objects."""

        users = []
        for doc in User.objects():
            users.append(
                {
                    "_id": str(doc["id"]),
                    "username": doc["username"],
                    "online": doc["online"],
                    "snippets_created": [
                        {
                            "snippet_title": k["title"],
                            "snippet_id": str(ObjectId(k["id"])),
                        }
                        for k in doc["snippets_created"]
                    ],
                    "snippets_liked": [
                        {
                            "snippet_title": k["title"],
                            "snippet_id": str(ObjectId(k["id"])),
                        }
                        for k in doc["snippets_liked"]
                    ],
                    "collections": [
                        {
                            "collection_name": k["name"],
                            "collection_id": str(ObjectId(k["id"])),
                        }
                        for k in doc["collections"]
                    ],
                }
            )

        return jsonify(users)


class UserApi(Resource):
    """Requests against the User model to `api/users/<id>`"""

    def get(self, id):
        """Returns a user object with username matching id."""

        try:
            user = []
            for doc in User.objects(username=id):
                user.append(
                    {
                        "_id": str(ObjectId(doc["id"])),
                        "username": doc["username"],
                        "online": doc["online"],
                        "snippets_created": [
                            {
                                "snippet_title": k["title"],
                                "snippet_id": str(ObjectId(k["id"])),
                            }
                            for k in doc["snippets_created"]
                        ],
                        "snippets_liked": [
                            {
                                "snippet_title": k["title"],
                                "snippet_id": str(ObjectId(k["id"])),
                            }
                            for k in doc["snippets_liked"]
                        ],
                        "collections": [
                            {
                                "collection_name": k["name"],
                                "collection_id": str(ObjectId(k["id"])),
                            }
                            for k in doc["collections"]
                        ],
                    }
                )
            return jsonify(user)

        except DoesNotExist:
            raise UserNotExistsError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def put(self):
        """Update one User object with a matching id.

        Raises:
            Schema validation errors.
            If required fields are missing.
        Returns: {dict}
            JSON Flask Response, 200
                else: Notifies the frontend with status code and message.
        """
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            User.objects.get(username=user_id).update(**body)
            return {"message": "Profile updated"}, 200
        except InvalidQueryError:
            raise SchemaValidationError
        except Exception:
            raise InternalServerError

    @jwt_required()
    def delete(self, id):
        """Delete one User object with a matching id.

        Returns: {dict}
            JSON Flask Response, 200
                with status message.
        """

        try:
            user_id = get_jwt_identity()
            user = User.objects.get(username=user_id)
            user.delete()
            return {"message": "User deleted"}, 200
        except Exception:
            raise InternalServerError
