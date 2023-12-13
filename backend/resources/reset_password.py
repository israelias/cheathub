from flask import request, render_template
from flask_jwt_extended import create_access_token, decode_token

from database.models import User
from flask_restful import Resource
from services.mail_service import send_email

from resources.errors import (
    SchemaValidationError,
    InternalServerError,
    EmailDoesNotExistError,
    BadTokenError,
    ExpiredTokenError,
)
from jwt.exceptions import (
    ExpiredSignatureError,
    DecodeError,
    InvalidTokenError,
)

import datetime


class ForgotPassword(Resource):
    """This class is a subclass of the Resource class, and it's used to handle the forgot password functionality."""

    @staticmethod
    def post(self):
        """
        The post function is used to send an email with a link that will allow the user to reset their password.
        The function takes in an email and checks if it exists in the database. If it does, then a token is generated
        and sent to the user's email address along with instructions on how to reset their password.

        Args:
            self: Reference the current instance of the class

        Returns:
            A response with a message that the email was sent
        """

        url = request.host_url + "reset/"
        try:
            body = request.get_json()
            email = body.get("email")
            if not email:
                raise SchemaValidationError

            user = User.objects.get(email=email)
            if not user:
                raise EmailDoesNotExistError

            expires = datetime.timedelta(hours=24)
            reset_token = create_access_token(str(user.id), expires_delta=expires)

            return send_email(
                "[Cheat-hub] Reset Your Password",
                sender="israelias.js@gmail.com",
                recipients=[user.email],
                text_body=render_template("reset_password.txt", url=url + reset_token),
                html_body=render_template("reset_password.html", url=url + reset_token),
            )
        except SchemaValidationError:
            raise SchemaValidationError
        except EmailDoesNotExistError:
            raise EmailDoesNotExistError
        except Exception as e:
            raise InternalServerError


class ResetPassword(Resource):
    """This class is a subclass of the Resource class from the Flask-RESTful library. It has a post method that takes in a JSON
    object with a username and password. It then checks if the username is in the database and if it is, it updates the
    password."""

    def post(self):
        """
        The post function is used to reset a user's password. It takes in the
        reset_token and password from the request body, and then checks if they are
        valid. If they are valid, it will update the user's password in MongoDB.

        Args:
            self: Reference the current instance of the class

        Returns:
            A message that password reset was successful
        """

        url = request.host_url + "reset/"
        try:
            body = request.get_json()
            reset_token = body.get("reset_token")
            password = body.get("password")

            if not reset_token or not password:
                raise SchemaValidationError

            user_id = decode_token(reset_token)["sub"]
            user = User.objects.get(id=user_id)

            user.modify(password=password)
            user.hash_password()
            user.save()

            return send_email(
                "[Cheat-hub] Password reset successful",
                sender="support@cheat-hub.com",
                recipients=[user.email],
                text_body="Password reset was successful",
                html_body="<p>Password reset was successful</p>",
            )

        except SchemaValidationError:
            raise SchemaValidationError
        except ExpiredSignatureError:
            raise ExpiredTokenError
        except (DecodeError, InvalidTokenError):
            raise BadTokenError
        except Exception as e:
            raise InternalServerError
