from .admin import admin
from flask_admin.contrib.mongoengine.view import ModelView
from database.models import User, Snippet, Collection, TokenBlocklist

# https://flask-admin.readthedocs.io/en/latest/api/mod_contrib_mongoengine/


def initialize_views():
    admin.add_view(ModelView(User))
    admin.add_view(ModelView(Snippet))
    admin.add_view(ModelView(Collection))
    admin.add_view(ModelView(TokenBlocklist))

