from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, SnippetAlreadyExistsError, InternalServerError, \
    UpdatingSnippetError, DeletingSnippetError, SnippetNotExistsError
import datetime


class SnippetsApi(Resource):
    def get(self):
        gists = Snippet.objects(private=False).to_json()
        return Response(gists, mimetype="text/html", status=200)

    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(username=user_id)
            now = datetime.datetime.now(datetime.timezone.utc)

            snippet = Snippet(**body, added_by=user, added_on=now)
            snippet.save()
            user.update(push__snippets_created=snippet)
            user.save()
            id = snippet.id
            return {'id': str(id)}, 200

        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except NotUniqueError:
            raise SnippetAlreadyExistsError
        except Exception as e:
            raise InternalServerError


class SnippetApi(Resource):
    @jwt_required()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            snippet = Snippet.objects.get(id=id, added_by=user_id)
            body = request.get_json()
            now = datetime.datetime.now(datetime.timezone.utc)
            snippet.update(**body, updated_on=now)
            return {'message': 'Snippet updated'}, 200

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
            return {'message': 'Snippet deleted'}, 200
        except DoesNotExist:
            raise DeletingSnippetError
        except Exception:
            raise InternalServerError

    def get(self, id):
        try:
            snippet = Snippet.objects.get(id=id).to_json()
            return Response(snippet, mimetype="application/json", status=200)
        except DoesNotExist:
            raise SnippetNotExistsError
        except Exception:
            raise InternalServerError


class LikeSnippetApi(Resource):
    @jwt_required()
    def post(self, id):
        user_id = get_jwt_identity()
        snippet = Snippet.objects.get(id=id)
        snippet.update(push__liked_by=user_id)
        snippet.save()
        user_id.update(push__snippets_liked=snippet)
        user_id.save()
