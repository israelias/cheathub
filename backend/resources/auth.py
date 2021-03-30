from flask import request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, jwt_required

from database.models import User
from database.models import TokenBlocklist

from flask_restful import Resource
import datetime

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist
from resources.errors import SchemaValidationError, UsernameAlreadyExistsError, EmailAlreadyExistsError, \
    UnauthorizedError, \
    InternalServerError


class SignupApi(Resource):
    def post(self):
        try:
            body = request.get_json()
            # @TODO Fix the exception error on exitinguser validation
            # existing = User.objects.get(username=body.get('username'))
            # if existing:
            #     raise UsernameAlreadyExistsError
            user = User(**body)
            user.hash_password()
            user.save()

            id = user.id
            username = user.username

            expires = datetime.timedelta(minutes=15)
            access_token = create_access_token(identity=str(username), expires_delta=expires)
            refresh_token = create_refresh_token(identity=str(id), expires_delta=expires)
            refresh_cookie = [('Set-Cookie', 'refresh_token={}'.format(refresh_token))]

            return {'access_token': access_token, 'username': username}, 200, refresh_cookie

        except FieldDoesNotExist:
            raise SchemaValidationError
        except NotUniqueError:
            raise EmailAlreadyExistsError
        except Exception as e:
            raise InternalServerError


class LoginApi(Resource):
    def post(self):
        try:
            body = request.get_json()
            user = User.objects.get(email=body.get('email'))
            authorized = user.check_password(body.get('password'))
            if not authorized:
                raise UnauthorizedError

            user.update(set__online=True)
            user.save()

            expires = datetime.timedelta(hours=3)
            access_token = create_access_token(identity=str(user.username), expires_delta=expires)
            refresh_token = create_refresh_token(identity=str(user.id), expires_delta=expires)
            refresh_cookie = [('Set-Cookie', 'refresh_token={}'.format(refresh_token))]

            return {'access_token': access_token, 'username': user.username}, 200, refresh_cookie

        except (UnauthorizedError, DoesNotExist):
            raise UnauthorizedError
        except Exception as e:
            raise InternalServerError


class LogoutApi(Resource):
    @jwt_required()
    def post(self):
        revoked_token = get_jwt()
        # TODO set refresh and access token identities rule
        jti = revoked_token['jti']
        owner = revoked_token['sub']
        created_ts = int(revoked_token['iat'])
        expires_ts = int(revoked_token['exp'])

        created = datetime.datetime.utcfromtimestamp(created_ts).strftime('%Y-%m-%d %H:%M:%S')
        expires = datetime.datetime.utcfromtimestamp(expires_ts).strftime('%Y-%m-%d %H:%M:%S')

        user = User.objects.get(username=owner)
        now = datetime.datetime.now(datetime.timezone.utc)

        block_token = TokenBlocklist(jti=jti, created_on=created, expires_on=expires, revoked_on=now, revoked_by=user)
        block_token.save()

        user.update(set__online=False)

        return {'message': "JWT revoked"}
