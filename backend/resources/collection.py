from flask import Response, request, jsonify
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


class CollectionsApi(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        collections = []
        for doc in Collection.objects(private=False, owner=user_id):
            collections.append(
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
            )

        return jsonify(collections)

    @jwt_required()
    def post(self):
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
            raise SchemaValidationError
        except NotUniqueError:
            raise SnippetAlreadyExistsError
        except Exception as e:
            raise InternalServerError


class CollectionApi(Resource):
    def get(self, id):
        try:
            collection = []
            for doc in Collection.objects(id=id):
                collection.append(
                    {
                        "_id": str(ObjectId(doc["id"])),
                        "name": doc["name"],
                        "owner": doc["owner"]["username"],
                        "private": doc["private"],
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

    @jwt_required()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            collection = Collection.objects.get(id=id, owner=user_id)
            body = request.get_json()
            collection.update(**body)
            return {"message": "Collection updated"}, 200

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
            snippet = Snippet.objects.get(id=id, added_by=user_id)
            snippet.delete()
            return {"message": "Snippet deleted"}, 200
        except DoesNotExist:
            raise DeletingSnippetError
        except Exception:
            raise InternalServerError