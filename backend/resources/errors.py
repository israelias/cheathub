# ===========================================================================
# *           Errors
# ?  Extends the Exception class to create different custom exceptions
#
# Errors dictionary with defined exceptions are passed to Flask-Restful's
# Api classs upon `init` in app.py.
#
# Note: Errors/Exceptions for most response objects are written in the
# Resource class itself as Flask-Restful's Api class is mostly for
# internal validation of schemas via MongoEngine without returning an
# HTTP Exception.
# ===========================================================================


class InternalServerError(Exception):
    pass


class SchemaValidationError(Exception):
    pass


class SnippetAlreadyExistsError(Exception):
    pass


class UpdatingSnippetError(Exception):
    pass


class DeletingSnippetError(Exception):
    pass


class SnippetNotExistsError(Exception):
    pass


class UserNotExistsError(Exception):
    pass


class UsernameAlreadyExistsError(Exception):
    pass


class EmailAlreadyExistsError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


class EmailDoesNotExistError(Exception):
    pass


class BadTokenError(Exception):
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
}
