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
    def get(self):
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