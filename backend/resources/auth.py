from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    jwt_required,
)

from database.models import User, Snippet, Collection
from database.models import TokenBlocklist

from flask_restful import Resource
import datetime

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist
from resources.errors import (
    SchemaValidationError,
    UsernameAlreadyExistsError,
    EmailAlreadyExistsError,
    UnauthorizedError,
    InternalServerError,
)

#===========================================================================
# *             User Authentication  RESTful Resource
# ?  Queries User objects against the User model.
# All POST methods.
# Responsible for attaching tokens and hashed passwords to a User doc model,
# required to perform operations on a Snippet, a Collection and itself.
#===========================================================================

class SignupApi(Resource):
    """Requests against the Snippet model to `api/auth/signup`"""

    def post(self):
        """Create a new User object following the User model.

        Yields:
            Save a new User with the required username, email, password
            fields.
            Hash the password.
            Create three Snippets for the user to have some UI to play with
            upon authentication.
        Flags:
            Errors and returns status code with error message,
                200, otherwise.
        Returns:
            {dict}: JSON Flask Response
                with an access token and a username.
                sets a refresh cookie in headers.
        Note:
            The computation to update, save, reload a Snippet is required to
            ensure Objects have fully landed before they are referenced. It is extra 
            complicated for this endpoint as we are awaiting reloads for three models:
            User, Collection and Snippet, all of which vary in `having to exist` before
            the other.
        """
        try:
            body = request.get_json()
            user = User(**body)

            user.hash_password()
            user.save()
            user.reload()

            now = datetime.datetime.now(datetime.timezone.utc)

            id = user.id
            username = user.username
            
            # Required to instantiate a new reference to the very same 
            # and very new User for the purposes of attaching an owner 
            # to the snippets.
            saved_user = User.objects.get(username=username)

            snippet_py = Snippet(
                title="{}.py".format(username),
                tags=["first post"],
                description="From Cheat-Hub",
                language="python",
                value="print('hello {}')".format(username),
                addedBy=saved_user,
                addedOn=now,
            )

            snippet_js = Snippet(
                title="{}.js".format(username),
                tags=["first post"],
                description="From Cheat-Hub",
                language="javascript",
                value="console.log('hello {}');".format(username),
                addedBy=saved_user,
                addedOn=now,
            )

            snippet_sh = Snippet(
                title="{}.sh".format(username),
                tags=["first post"],
                description="From Cheat-Hub",
                language="bash",
                value="#!/bin/bash\n\necho 'hello {}'".format(username),
                addedBy=saved_user,
                addedOn=now,
            )

            snippet_py.save()
            snippet_py.reload()
            snippet_js.save()
            snippet_js.reload()
            snippet_sh.save()
            snippet_sh.reload()

            user.update(push_all__snippets_created=[snippet_py, snippet_js, snippet_sh])
            user.save()
            user.reload()

            collection = Collection(
                name="Greetings {}".format(username),
                snippets=[snippet_py, snippet_js, snippet_sh],
                date=now,
                owner=user,
            )

            collection.save()

            user.update(push__collections=collection)
            user.save()

            expires = datetime.timedelta(hours=3)
            access_token = create_access_token(
                identity=str(username), expires_delta=expires
            )
            refresh_token = create_refresh_token(
                identity=str(id), expires_delta=expires
            )
            refresh_cookie = [("Set-Cookie", "refresh_token={}".format(refresh_token))]

            return (
                {
                    "access_token": access_token,
                    "username": username,
                },
                200,
                refresh_cookie,
            )

        except FieldDoesNotExist:
            return {"message": "Request is missing required fields."}, 400

        except NotUniqueError:
            return {"message": "User with given email address already exists."}, 401

        except Exception as e:
            return {"message": "Something went wrong."}, 500


class LoginApi(Resource):
    """Requests against the Snippet model to `api/auth/login`"""

    def post(self):
        """Authenticate a User object against the User model.

        Yields:
            Check the email.
            Check the password.
        Flags:
            Errors and returns status code with error message,
                200, otherwise.
        Returns:
            {dict}: JSON Flask Response
                with an access token and a username.
                sets a refresh-cookie in headers.
        """
        try:
            body = request.get_json()
            user = User.objects.get(email=body.get("email"))
            authorized = user.check_password(body.get("password"))
            if not authorized:
                raise UnauthorizedError

            user.update(set__online=True)
            user.save()

            expires = datetime.timedelta(hours=3)
            access_token = create_access_token(
                identity=str(user.username), expires_delta=expires
            )
            refresh_token = create_refresh_token(
                identity=str(user.id), expires_delta=expires
            )
            refresh_cookie = [("Set-Cookie", "refresh_token={}".format(refresh_token))]

            return (
                {
                    "access_token": access_token,
                    "username": user.username,
                },
                200,
                refresh_cookie,
            )

        except (UnauthorizedError, DoesNotExist):
            return {"message": "Invalid username or password."}, 401

        except Exception as e:
            return {"message": "Something went wrong."}, 500


class LogoutApi(Resource):
    """Requests against the Snippet model to `api/auth/logout`"""

    @jwt_required()
    def post(self):
        """Create a new TokenBlockList document following a User's logout request.

        Yields:
            Save an exiting User's access token to the TokenBlockList database.
            This prevents the access token from being used between the logout event
            and its expiration.
        Flags:
            Errors and returns status code with error message,
                200, otherwise.
        Returns:
            {dict}: JSON Flask Response
                confirmation that the token has been revoked.

        """
        revoked_token = get_jwt()

        jti = revoked_token["jti"]
        owner = revoked_token["sub"]
        created_ts = int(revoked_token["iat"])
        expires_ts = int(revoked_token["exp"])

        created = datetime.datetime.utcfromtimestamp(created_ts).strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        expires = datetime.datetime.utcfromtimestamp(expires_ts).strftime(
            "%Y-%m-%d %H:%M:%S"
        )

        user = User.objects.get(username=owner)
        now = datetime.datetime.now(datetime.timezone.utc)

        block_token = TokenBlocklist(
            jti=jti,
            created_on=created,
            expires_on=expires,
            revoked_on=now,
            revoked_by=user,
        )
        block_token.save()

        user.update(set__online=False)

        return {"message": "JWT revoked"}
