from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User, Collection
from flask_restful import Resource, marshal_with
from bson import ObjectId
import datetime
from flask_mongoengine.wtf import model_form

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
    create_widget_reqparser,
    pagination_reqparser,
    widget_owner_model,
    widget_model,
    pagination_links_model,
    pagination_model,
    search_reqparser
)

from services.pagination_service import (
    # create_widget, 
    retrieve_widget_list,
    retrieve_widget
)

class SnippetsApi(Resource):
    """Handles HTTP requests to URL: api/snippets."""
    
    # @jwt_required()
    def get(self):
        """Retrieve a list of public snippets."""
        # /snippets?key1=val1&key2=val2
        # http :5000/api/v1/snippets?page=1&per_page=10
        request_data = pagination_reqparser.parse_args()
        # page = int(request_data.get("page", 1))
        page = request_data["page"]
        # per_page = int(request_data.get("per_page", 10))
        per_page = request_data["per_page"]
        # return retrieve_widget_list(page, per_page)
        # tags = request_data["tags"]
        # myTags = request.args.get('tags', ['java'])
        
        # search_data = search_reqparser.parse_args()
        # search_tags = search_data["tags"]
        
        allTags = []
        allSnips = Snippet.objects()
        for tag in Snippet.objects():
            for k in tag['tags']:
                if k not in allTags:
                    allTags.append(k)
        
        searchParser = RequestParser(bundle_errors=True)
        searchParser.add_argument('tags', type=str, required=False)
        searchArgs = searchParser.parse_args()
        testTags = searchArgs['tags']
        testTagsArr = [testTags]
        
        # parser = RequestParser()
        # parser.add_argument('key1', type=str)
        # parser.add_argument('key2', type=str)
        # parser.add_argument('page', type=positive, required=False, default=1 )
        # parser.add_argument('per_page', type=positive, required=False, choices=[5, 10, 25, 50, 100], default=10)
        # return parser.parse_args()
        
        # pagination = Pagination()
        # page = int(request.args.get('page',1))
        # limit = int(request.args.get('limit',10))
        
        paginated = Snippet.objects(
            tags__in=testTagsArr if testTags else allTags,
            ).order_by(
                'title'
                ).paginate(
                page=page, 
                per_page=per_page, 
                )    
            
        meta = {
            "has_prev": paginated.has_prev,
            "has_next": paginated.has_next,
            "page": paginated.page,
            "total_pages": paginated.pages,
            "items_per_page": paginated.per_page,
            "total_items": paginated.total,
        }
        
        # items = jsonify()
        
        resp = {
            "meta": meta,
            "items": [
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
                for k in paginated.items
            ]
        }

        return jsonify(resp)

    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            user = User.objects.get(username=user_id)
            now = datetime.datetime.now(datetime.timezone.utc)

            snippet = Snippet(**body, addedBy=user, addedOn=now)
            snippet.save()
            user.update(push__snippets_created=snippet)
            user.save()
            id = snippet.id
            return {"id": str(id)}, 200

        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except NotUniqueError:
            raise SnippetAlreadyExistsError
        except Exception as e:
            raise InternalServerError


# class SnippetSearchApi(Resource):
#     """Handles HTTP requests to URL: /snippets/{name}."""
#     @marshal_with(widget_model)
#     def get(self, name):
#         """Retrieve a widget."""
#         return retrieve_widget(name)
    

class SnippetApi(Resource):
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

    @jwt_required()
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

    @jwt_required()
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


class LikeSnippetApi(Resource):
    @jwt_required()
    def post(self, id):
        user_id = get_jwt_identity()
        snippet = Snippet.objects.get(id=id)
        snippet.update(push__likedBy=user_id)
        snippet.save()
        user_id.update(push__snippets_liked=snippet)
        user_id.save()
        return {"message": "Snippet liked"}, 200
