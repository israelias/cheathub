from flask_restful import Resource
from flask_restful.fields import Boolean, Nested, Integer, List, String, DateTime, Url, Raw
from flask_restful.reqparse import RequestParser
from flask_restful.inputs import positive, url, regex

pagination_reqparser = RequestParser(bundle_errors=True)
pagination_reqparser.add_argument(
    "page", type=positive, required=False, default=1
)
pagination_reqparser.add_argument(
    "per_page", type=positive, required=False, choices=[5, 10, 25, 50, 100], default=10
)

search_reqparser = RequestParser(bundle_errors=True)

regexArray = [regex]
search_reqparser.add_argument(
    "tags", type=str, required=False
)

widget_owner_model =  {"email": String, "username": String}

widget_model = {
        "title": String,
        "filename": String,
        "addedOn": DateTime(attribute="addedOn"),
        "language": String,
        "description": String,
        "value": String,
        "active": Boolean,
        "owner": Nested(widget_owner_model),
        # "source": Url,
        # "links": Url("api.snippets")
        # "link": "api/snippets" 
    }


pagination_links_model = {"self": String, "prev": String, "next": String, "first": String, "last": String},



pagination_model = {
        "links": Nested(pagination_links_model, allow_null=True),
        "has_prev": Boolean,
        "has_next": Boolean,
        "page": Integer,
        "total_pages": Integer(attribute="pages"),
        "items_per_page": Integer(attribute="per_page"),
        "total_items": Integer(attribute="total"),
        "items": List(Nested(widget_model)),
    }

create_widget_reqparser = RequestParser(bundle_errors=True)
create_widget_reqparser.add_argument(
    "name",
    type=String,
    location="form",
    required=True,
    nullable=False,
    case_sensitive=True,
)
create_widget_reqparser.add_argument(
    "info_url",
    type=url,
    location="form",
    required=True,
    nullable=False,
)
create_widget_reqparser.add_argument(
    "deadline",
    type=DateTime,
    location="form",
    required=True,
    nullable=False,
)
update_widget_reqparser = create_widget_reqparser.copy()
update_widget_reqparser.remove_argument("name")

