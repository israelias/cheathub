from flask import Response, redirect
from flask_admin import AdminIndexView, expose
from flask_admin.contrib.mongoengine.view import ModelView
from werkzeug.exceptions import HTTPException
from .basicauth import basic_auth

"""
The following three classes are inherited from their respective base class,
and are customized, to make flask_admin compatible with BasicAuth.
"""


class AuthException(HTTPException):
    def __init__(self, message):
        super().__init__(
            message,
            Response(
                "You could not be authenticated. Please refresh the page.",
                401,
                {"WWW-Authenticate": 'Basic realm="Login Required"'},
            ),
        )


class MyModelView(ModelView):
    def is_accessible(self):
        if not basic_auth.authenticate():
            raise AuthException("Not authenticated.")
        else:
            return True

    def inaccessible_callback(self, name, **kwargs):
        return redirect(basic_auth.challenge())


class MyAdminIndexView(AdminIndexView):
    def is_accessible(self):
        if not basic_auth.authenticate():
            raise AuthException("Not authenticated.")
        else:
            return True

    def inaccessible_callback(self, name, **kwargs):
        return redirect(basic_auth.challenge())