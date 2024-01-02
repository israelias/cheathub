from .admin import admin
from flask_admin.contrib.mongoengine.view import ModelView
from .mongoview import MyModelView
from database.models import User, Snippet, Collection, TokenBlocklist

# https://flask-admin.readthedocs.io/en/latest/api/mod_contrib_mongoengine/


def initialize_views():
    """
    The initialize_views function registers the admin views for the flask-admin extension.
    It is called in __init__.py, and therefore runs whenever this package is imported.

    Returns:
        The admin object
    """
    admin.add_view(MyModelView(User))
    admin.add_view(MyModelView(Snippet))
    admin.add_view(MyModelView(Collection))
    admin.add_view(MyModelView(TokenBlocklist))
