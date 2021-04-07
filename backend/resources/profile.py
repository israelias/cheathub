from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User, Collection
from flask_restful import Resource, fields, marshal_with
from bson import ObjectId
import datetime
from flask_mongoengine.wtf import model_form


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
    # @jwt_required()
    def get(self, id):
        # user_id = get_jwt_identity()
        user = User.objects.get(username=id)
        snippets = []
        for doc in Snippet.objects(addedBy=user):
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
                }
            )

        return jsonify(snippets)


class MyFaveSnippetsApi(Resource):
    # @jwt_required()
    def get(self, id):
        # user_id = get_jwt_identity()
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
                }
            )

        return jsonify(snippets)


class MyCollectionsApi(Resource):
    # @jwt_required()
    def get(self, user_id):
        # user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        collections = []
        for doc in Collection.objects(owner=user):
            collections.append(
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
                # {
                #     "_id": str(ObjectId(doc["id"])),
                #     "name": doc["name"],
                #     "owner": doc["owner"],
                #     "snippets": [
                #         {
                #             "snippet_title": k["title"],
                #             "snippet_id": str(ObjectId(k["id"])),
                #         }
                #         for k in doc["snippets"]
                #     ],
                #     "private": doc["private"],
                # }
            )

        return jsonify(collections)


class MyCollectionApi(Resource):
    # @jwt_required()
    def get(self, user_id, id):
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