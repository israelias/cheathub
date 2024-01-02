from flask import Response
from flask_restful import Resource, url_for


# ===========================================================================
# *                Pagination
# ?  Wraps response objects of the Search API with pagination controls.
# Utilizes existing methods and page properties in MongoEngine's Pagination class.
# Responsible for managing the size of a response by limiting items per page.
# ===========================================================================


def pagination_links(pagination, resource, **args):
    """
    The pagination_links function generates links for the pagination of a resource.
    It takes in a Pagination object and returns a dictionary with the keys &quot;self&quot;,
    &quot;first&quot;, &quot;prev&quot;, &quot;next&quot; and &quot;last&quot;. The values are links to the current page,
    the first page, the previous page if one exists, next page if it exists and last
    page respectively. If there is no previous or next page then None is returned.

    Args:
        pagination: Determine the number of items to show per page
        resource: Determine the resource that is being paginated
        **args: Allow the pagination_links function to accept any number of other parameters

    Returns:
        A dictionary of links that are used to navigate through a list of items
    """
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
    """
    The pagination_meta function takes a pagination object and returns a dictionary with the meta information about
    the pagination. The meta information includes: has_prev, has_next, page, total_pages, items_per_page and total.

    Args:
        pagination: Get the pagination object from the

    Returns:
        A dictionary containing the following data:
    """
    meta = {
        "has_prev": pagination.has_prev,
        "has_next": pagination.has_next,
        "page": pagination.page,
        "total_pages": pagination.pages,
        "items_per_page": pagination.per_page,
        "total_items": pagination.total,
    }
    return meta
