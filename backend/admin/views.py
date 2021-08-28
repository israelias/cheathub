from .admin import admin
from flask_admin.contrib.mongoengine.view import ModelView
from .mongoview import MyModelView
from database.models import User, Snippet, Collection, TokenBlocklist

# https://flask-admin.readthedocs.io/en/latest/api/mod_contrib_mongoengine/


def initialize_views():
    admin.add_view(MyModelView(User))
    admin.add_view(MyModelView(Snippet))
    admin.add_view(MyModelView(Collection))
    admin.add_view(MyModelView(TokenBlocklist))