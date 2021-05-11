from flask import Response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models import Snippet, User, Collection
from flask_restful import Resource, url_for
from bson import ObjectId
import datetime

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
    language_parser,
    tag_parser,
)

from services.pagination_service import pagination_meta, pagination_links

from database.constants import (
    all_languages,
    all_tags,
)


class SearchApi(Resource):
    """Handles query, language and tag params in URL search endpoint: api/search."""

    def get(self):

        """Retrieve a list of public snippets.

        Yields:
            `/api/search?`
            The base url.
            The URL string should follow this order:

            `query=hello%20world`
            Search query is required.
            The following params [language, tags, page] are optional, and are there to narrow the search.

            `&language=python`
            Language query hones search query down to a language.
            Frontend can call {language=a}
            If empty, params for search query will prevail, and all languages will return.

            `tags=javascript&tags=jquery`
            Tags query appends to a list.
            Frontend can cappend {tags=a&tags=b&tags=c} multiple times, and the parser will parse:
            [a, b, c]

            ` &page=1`
            Page param will be available authomatically.

        Raises:
            SnippetNotExistsError: The Snippet does not exist.
            InternalServerError: Server error.

        Returns:
            {dict}: JSON Flask Response
        """
        try:
            search_request = search_parser.parse_args()
            search = search_request["query"]

            language_request = language_parser.parse_args()
            language = language_request["language"]

            tag_request = tag_parser.parse_args()
            tags = tag_request["tags"]

            page_request = pagination_parser.parse_args()
            page = page_request["page"]
            per_page = page_request["per_page"]

            all_langs_arr = all_languages()
            all_tags_arr = all_tags()

            if len(search) == 0:
                query = (
                    Snippet.objects(
                        language__in=[language] if language else all_langs_arr,
                        tags__in=tags if tags else all_tags_arr,
                    )
                    .order_by("-addedOn")
                    .paginate(
                        page=page,
                        per_page=per_page,
                    )
                )
                links = pagination_links(
                    query, language=language, tags=tags, resource="searchapi"
                )
                resp = {
                    "links": links,
                    "has_prev": query.has_prev,
                    "has_next": query.has_next,
                    "page": query.page,
                    "total_pages": query.pages,
                    "items_per_page": query.per_page,
                    "total_items": query.total,
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
                            "url": url_for("snippetapi", id=str(ObjectId(k["id"]))),
                        }
                        for k in query.items
                    ],
                }

                return jsonify(resp)

            else:

                query = (
                    Snippet.objects()
                    .search_text(search, language="en")
                    .order_by("-addedOn")
                    .paginate(
                        page=page,
                        per_page=per_page,
                    )
                )

                meta = pagination_meta(query)
                links = pagination_links(
                    query,
                    query=search,
                    language=language,
                    tags=tags,
                    resource="searchapi",
                )

                resp = {
                    "links": links,
                    "has_prev": query.has_prev,
                    "has_next": query.has_next,
                    "page": query.page,
                    "total_pages": query.pages,
                    "items_per_page": query.per_page,
                    "total_items": query.total,
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
                            "url": url_for("snippetapi", id=str(ObjectId(k["id"]))),
                        }
                        for k in query.items
                    ],
                }

            return jsonify(resp)
        except DoesNotExist:
            raise SnippetNotExistsError
        except Exception:
            raise InternalServerError
