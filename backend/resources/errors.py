"""
Extends the Exception class to create different custom exceptions and then create an errors dictionary,
which contains the error message and status codes for each exception.
Errors are added to the flask-restful Api class
"""


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
    "InternalServerError": {
        "message": "Something went wrong.",
        "status": 500
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields.",
        "status": 400
    },
    "SnippetAlreadyExistsError": {
        "message": "Code Snippet with given name already exists.",
        "status": 409
    },
    "UpdatingSnippetError": {
        "message": "Updating Code Snippet added by someone else is forbidden.",
        "status": 403
    },
    "DeletingSnippetError": {
        "message": "Deleting Code Snippet added by someone else is forbidden.",
        "status": 403
    },
    "SnippetNotExistsError": {
        "message": "Code Snippet with given id doesn't exist.",
        "status": 410
    },
    "UsernameAlreadyExistsError": {
        "message": "A user with that username already exists.",
        "status": 409
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists.",
        "status": 401
    },
    "UnauthorizedError": {
        "message": "Invalid username or password.",
        "status": 401
    },
    "EmailDoesNotExistError": {
        "message": "Couldn't find the user with given email address.",
        "status": 400
    },
    "BadTokenError": {
        "message": "Invalid token.",
        "status": 407
    }
}
