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


class TagsApi(Resource):
    """Handles HTTP requests to URL: api/snippets."""

    def get(self):
        """Retrieve a all current tags."""

        all_tags_arr = all_tags()
        return jsonify([{"label": tag, "value": tag} for tag in all_tags_arr])


class LanguageApi(Resource):
    def get(self, id):
        try:
            snippet = []
            for doc in Snippet.objects(id=id):
                snippet.append(
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

            return jsonify(snippet)
        except DoesNotExist:
            raise SnippetNotExistsError
        except Exception:
            raise InternalServerError

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

    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            snippet = Snippet.objects.get(id=id, addedBy=user_id)
            snippet.delete()
            return {"message": "Snippet deleted"}, 200
        except DoesNotExist:
            raise DeletingSnippetError
        except Exception:
            raise InternalServerError


class FavesApi(Resource):
    @jwt_required()
    def post(self, id):
        user_id = get_jwt_identity()
        user = User.objects.get(username=user_id)
        snippet = Snippet.objects.get(id=id)
        if user in snippet.likedBy:
            print("existing")
            snippet.update(pull__likedBy=user, dec__score=1)
            snippet.save()
            user.update(pull__snippets_liked=snippet)
            user.save()
            print("snippet faved")
            return {"message": "Snippet unfaved"}, 200
        else:
            print("new")
            snippet.update(push__likedBy=user, inc__score=1)
            snippet.save()
            user.update(push__snippets_liked=snippet)
            user.save()
            print("snippet unfaved")
            return {"message": "Snippet faved"}, 200
