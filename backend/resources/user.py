from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User, Collection
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
from mongoengine.queryset.visitor import Q


class UsersApi(Resource):
    def get(self):
        users = []
        for doc in User.objects():
            users.append(
                {
                    "_id": str(doc["id"]),
                    "username": doc["username"],
                    "online": doc["online"],
                    # Alternatively...
                    # 'snippets_created': doc['snippets_created'],
                    # 'snippets_liked': doc['snippets_liked']
                    "snippets_created": [k["title"] for k in doc["snippets_created"]],
                    "snippets_liked": list(doc["snippets_liked"]),
                    "collections": list(doc["collections"]),
                }
            )

        return jsonify(users)


class UserApi(Resource):
    @jwt_required()
    def put(self):
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
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(username=user_id)
            user.delete()
            return {"message": "User deleted"}, 200
        except Exception:
            raise InternalServerError

    def get(self, id):
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(username=user_id).to_json()
            return Response(user, mimetype="application/json", status=200)
        # except DoesNotExist:
        #     raise UserNotExistsError
        except Exception:
            raise InternalServerError
