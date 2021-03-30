from .admin import admin
from flask_admin.contrib.mongoengine.view import ModelView
from database.models import User, Movie, Task, Gist, Status, Type, TokenBlocklist

# https://flask-admin.readthedocs.io/en/latest/api/mod_contrib_mongoengine/


def initialize_views():
    admin.add_view(ModelView(User))
    admin.add_view(ModelView(Movie))
    admin.add_view(ModelView(Task))
    admin.add_view(ModelView(Status))
    admin.add_view(ModelView(Type))
    admin.add_view(ModelView(TokenBlocklist))
    admin.add_view(ModelView(Gist))

