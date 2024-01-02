# It creates a class called InternalServerError that inherits from the Exception class
# ===========================================================================
# *           Errors
# ?  Extends the Exception class to create different custom exceptions
#
# Errors dictionary with defined exceptions are passed to Flask-Restful's
# Api class upon `init` in app.py.
#
# Note: Errors/Exceptions for most response objects are written in the
# Resource class itself as Flask-Restful's Api class is mostly for
# internal validation of schemas via MongoEngine without returning an
# HTTP Exception.
# ===========================================================================


class InternalServerError(Exception):
    """It creates a class called InternalServerError that inherits from the Exception class."""

    pass


class SchemaValidationError(Exception):
    """It's a custom exception class that will be raised when the schema validation fails"""

    pass


class SnippetAlreadyExistsError(Exception):
    """ It's a custom exception that is raised when a snippet already exists"""

    pass


class UpdatingSnippetError(Exception):
    """ It's an exception that's raised when a snippet can't be updated"""

    pass


# It's an exception that's raised when a snippet can't be deleted
class DeletingSnippetError(Exception):
    pass


class SnippetNotExistsError(Exception):
    """It's a custom exception that is raised when a snippet is not found in the database"""

    pass


class UserNotExistsError(Exception):
    """This class is used to raise an error when a user does not exist"""

    pass


class UsernameAlreadyExistsError(Exception):
    """This class is used to raise an error when a username already exists in the database"""

    pass


class EmailAlreadyExistsError(Exception):
    """This class is used to raise an error when a user tries to register with an email that already exists in the database"""

    pass


class UnauthorizedError(Exception):
    """It's a custom exception class that inherits from the built-in Exception class"""

    pass


class EmailDoesNotExistError(Exception):
    """This class is used to raise an error when the email address provided does not exist in the database."""

    pass


class BadTokenError(Exception):
    """It creates a new class called BadTokenError that inherits from the Exception class."""

    pass


class ExpiredTokenError(Exception):
    """This class is used to raise an exception when a token has expired"""

    pass


errors = {
    "InternalServerError": {"message": "Something went wrong.", "status": 500},
    "SchemaValidationError": {
        "message": "Request is missing required fields.",
        "status": 400,
    },
    "SnippetAlreadyExistsError": {
        "message": "Code Snippet with given name already exists.",
        "status": 409,
    },
    "UpdatingSnippetError": {
        "message": "Updating Code Snippet added by someone else is forbidden.",
        "status": 403,
    },
    "DeletingSnippetError": {
        "message": "Deleting Code Snippet added by someone else is forbidden.",
        "status": 403,
    },
    "SnippetNotExistsError": {
        "message": "Code Snippet with given id doesn't exist.",
        "status": 410,
    },
    "UserNotExistsError": {
        "message": "Could not find a user with credentials.",
        "status": 410,
    },
    "UsernameAlreadyExistsError": {
        "message": "A user with that username already exists.",
        "status": 409,
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists.",
        "status": 401,
    },
    "UnauthorizedError": {"message": "Invalid username or password.", "status": 401},
    "EmailDoesNotExistError": {
        "message": "Couldn't find the user with given email address.",
        "status": 400,
    },
    "BadTokenError": {"message": "Invalid token.", "status": 407},
    "ExpiredTokenError": {"message": "Token is expired.", "status": 410},
}
