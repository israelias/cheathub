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


class SignupApi(Resource):
    def post(self):
        try:
            body = request.get_json()
            user = User(**body)

            user.hash_password()
            user.save()
            user.reload()

            now = datetime.datetime.now(datetime.timezone.utc)

            id = user.id
            username = user.username
            # Required for assigned an owner to snippets
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
            # snippet.update(set__addedBy=user)

            # snippet.save()
            # snippet.reload()
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
    def post(self):
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
            # raise UnauthorizedError
        except Exception as e:
            return {"message": "Something went wrong."}, 500
            # raise InternalServerError


class LogoutApi(Resource):
    @jwt_required()
    def post(self):
        revoked_token = get_jwt()
        # TODO set refresh and access token identities rule
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
