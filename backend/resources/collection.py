# from flask import Response, request
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from database.models import Snippet, Collection, User
# from flask_restful import Resource
# from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
# from resources.errors import SchemaValidationError, SnippetAlreadyExistsError, InternalServerError, \
#     UpdatingSnippetError, DeletingSnippetError, SnippetNotExistsError
# import datetime
#
# class Collection(db.Document):
#     name = db.StringField(required=True, unique=True)
#     owner = db.ReferenceField('User', required=True)
#     snippets = db.ListField(db.ReferenceField('Snippet'))
#     private = db.BooleanField(default=False)
#
# class CollectionsApi(Resource):
#     @jwt_required()
#     def get(self):
#         user_id = get_jwt_identity()
#         collection = Collection.objects(owner=user_id).to_json()
#         return Response(collection, mimetype="text/html", status=200)
#
#     @jwt_required()
#     def post(self):
#         try:
#             user_id = get_jwt_identity()
#             body = request.get_json()
#             owner = User.objects.get(username=user_id)
#             # snippet =
#
#             collection = Collection(**body, owner=owner)
#             collection.save()
#             user.update(push__snippets_created=snippet)
#             user.save()
#             id = snippet.id
#             return {'id': str(id)}, 200
#
#         except (FieldDoesNotExist, ValidationError):
#             raise SchemaValidationError
#         except NotUniqueError:
#             raise SnippetAlreadyExistsError
#         except Exception as e:
#             raise InternalServerError
#
#
# class CollectionApi(Resource):
#     @jwt_required()
#     def put(self, id):
#         try:
#             user_id = get_jwt_identity()
#             snippet = Snippet.objects.get(id=id, added_by=user_id)
#             body = request.get_json()
#             now = datetime.datetime.now(datetime.timezone.utc)
#             snippet.update(**body, updated_on=now)
#             return {'message': 'Snippet updated'}, 200
#
#         except InvalidQueryError:
#             raise SchemaValidationError
#         except DoesNotExist:
#             raise UpdatingSnippetError
#         except Exception:
#             raise InternalServerError
#
#     @jwt_required()
#     def delete(self, id):
#         try:
#             user_id = get_jwt_identity()
#             snippet = Snippet.objects.get(id=id, added_by=user_id)
#             snippet.delete()
#             return {'message': 'Snippet deleted'}, 200
#         except DoesNotExist:
#             raise DeletingSnippetError
#         except Exception:
#             raise InternalServerError
#
#     def get(self, id):
#         try:
#             snippet = Snippet.objects.get(id=id).to_json()
#             return Response(snippet, mimetype="application/json", status=200)
#         except DoesNotExist:
#             raise SnippetNotExistsError
#         except Exception:
#             raise InternalServerError
