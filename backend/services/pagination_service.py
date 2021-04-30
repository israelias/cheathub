# from flask_mongoengine import Pagination,
# from flask import Pagination
from flask import Response, request, jsonify
from flask_restful import Resource, abort, marshal, url_for
from database.models import Snippet, User, Collection


def pagination_links(pagination, resource, **args):
    nav_links = {}
    per_page = pagination.per_page
    this_page = pagination.page
    last_page = pagination.pages
    nav_links["self"] = url_for(resource, **args, page=this_page, per_page=per_page)
    nav_links["first"] = url_for(resource, page=1, per_page=per_page)
    if pagination.has_prev:
        nav_links["prev"] = url_for(
            resource, **args, page=this_page - 1, per_page=per_page
        )

    if pagination.has_next:
        nav_links["next"] = url_for(
            resource, **args, page=this_page + 1, per_page=per_page
        )

    nav_links["last"] = url_for(resource, **args, page=last_page, per_page=per_page)

    return nav_links


def _pagination_nav_header_links(pagination):
    url_dict = pagination_links(pagination)
    link_header = ""
    for rel, url in url_dict.items():
        link_header += f'<{url}>; rel="{rel}", '
    return link_header.strip().strip(",")


def retrieve_widget(name):
    return Snippet.objects.filter(name=name.lower()).first_or_404(
        message=f"{name} not found in database."
    )


def pagination_meta(pagination):
    meta = {
        "has_prev": pagination.has_prev,
        "has_next": pagination.has_next,
        "page": pagination.page,
        "total_pages": pagination.pages,
        "items_per_page": pagination.per_page,
        "total_items": pagination.total,
    }
    return meta


def retrieve_widget_list(page, per_page):
    pagination = Snippet.objects.paginate(page=page, per_page=per_page)
    response_data = marshal(pagination, "pagination_model")
    response_data["links"] = pagination_links(pagination)
    # response = jsonify(response_data)
    response = jsonify([elem for elem in response_data])
    # response = [obj.to_mongo().to_dict() for obj in pagination.objects]
    # response.headers["Link"] = _pagination_nav_header_links(pagination)
    # response.headers["Total-Count"] = pagination.total
    return response
