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
    """This class inherits from HTTPException and is used to raise an exception when a user is not authenticated."""

    def __init__(self, message):
        """
        The __init__ function is the constructor for a class. It is called whenever an instance of a class is created.
        The __init__ function can take arguments, but self (the first one) will always be the instance that has just been created.

        Args:
            self: Represent the instance of the object itself
            message: Display the message to the user

        Returns:
            The response object that is passed into the super function

        """
        super().__init__(
            message,
            Response(
                "You could not be authenticated. Please refresh the page.",
                401,
                {"WWW-Authenticate": 'Basic realm="Login Required"'},
            ),
        )


class MyModelView(ModelView):
    """This class is a subclass of `ModelView` that is used to create, read, update, and delete (CRUD) records in the
    database"""

    def is_accessible(self):
        """
        The is_accessible function is used to check if the user has access to a particular view.
        It is called automatically by Flask-Login and will return True if the user can access a page,
        or False otherwise. This function will be passed into every view as an @login_required decorator.

        Args:
            self: Access the attributes and methods of the class in python

        Returns:
            True if the user is authenticated
        """
        if not basic_auth.authenticate():
            raise AuthException("Not authenticated.")
        else:
            return True

    def inaccessible_callback(self, name, **kwargs):
        """
        The inaccessible_callback function is called when a user attempts to access a resource that they are not authorized for.
        It redirects the user to the login page, and provides them with an error message explaining why they were denied access.

        Args:
            self: Access the class instance
            name: Set the name of the view that is used for authentication
            **kwargs: Pass in any additional keyword arguments that are passed to the callback function

        Returns:
            A redirect to the login page
        """
        return redirect(basic_auth.challenge())


class MyAdminIndexView(AdminIndexView):
    """It's a class that inherits from the AdminIndexView class, and it overrides the index() method"""

    def is_accessible(self):
        """
        The is_accessible function is used to check if the user has logged in.
        If they have not, then they are redirected to the login page. If they have,
        then we return True and move on.

        Args:
            self: Access the attributes and methods of the class in python

        Returns:
            True if the user is authenticated and false otherwise
        """
        if not basic_auth.authenticate():
            raise AuthException("Not authenticated.")
        else:
            return True

    def inaccessible_callback(self, name, **kwargs):
        """
        The inaccessible_callback function is called when a user attempts to access an endpoint that requires authentication.
        It redirects the user to the login page, and provides them with a message explaining why they were denied access.

        Args:
            self: Access the class attributes
            name: Set the name of the view that will be called if a user is not logged in
            **kwargs: Pass keyworded variable length of arguments to a function

        Returns:
            A redirect to the login page
        """
        return redirect(basic_auth.challenge())
