from flask import Response
from flask_restful import Resource, url_for

# ===========================================================================
# *                Pagination
# ?  Wraps response objects of the Search API with pagination controls.
# Utilizes existing methods and page properties in MongoEngine's Pagination class.
# Responsible for managing the size of a response by limiting items per page.
# ===========================================================================


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
