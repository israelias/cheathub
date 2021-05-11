from flask_restful import Resource
from flask_restful.reqparse import RequestParser
from flask_restful.inputs import positive

pagination_parser = RequestParser(bundle_errors=True)
pagination_parser.add_argument(
    "page",
    type=positive,
    required=False,
    default=1,
)
pagination_parser.add_argument(
    "per_page", type=positive, required=False, choices=[5, 10, 25, 50, 100], default=25
)

search_parser = RequestParser(bundle_errors=True)
search_parser.add_argument(
    "query",
    type=str,
    required=False,
    store_missing=True,
)

tag_parser = RequestParser(bundle_errors=True)
tag_parser.add_argument(
    "tags",
    type=str,
    action="append",
    trim=True,
    required=False,
    store_missing=True,
)

language_parser = RequestParser(bundle_errors=True)
language_parser.add_argument(
    "language",
    type=str,
    required=False,
    store_missing=True,
)

user_parser = RequestParser(bundle_errors=True)
user_parser.add_argument("author", type=str, required=False)
user_parser.add_argument("liked_by", type=str, required=False)
