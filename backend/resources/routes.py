from .auth import SignupApi, LoginApi, LogoutApi
from .user import UsersApi, UserApi
from .snippet import SnippetsApi, SnippetApi, LikeSnippetApi
from .reset_password import ForgotPassword, ResetPassword


def initialize_routes(api):
    # api/auth/signup Post method, enter email and password
    api.add_resource(SignupApi, '/api/auth/signup')
    # api/auth/login Post method, enter email and password, token will be returned
    # to test, add type Bearer Token on Postman under Authorization and paste token in field
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(ForgotPassword, '/api/auth/forgot')
    api.add_resource(ResetPassword, '/api/auth/reset')
    api.add_resource(LogoutApi, '/api/auth/logout')

    api.add_resource(UsersApi, '/api/users')
    api.add_resource(UserApi, '/api/users/<id>')

    api.add_resource(SnippetsApi, '/api/snippets')
    api.add_resource(SnippetApi, '/api/snippets/<id>')
    api.add_resource(LikeSnippetApi, '/api/likesnippet/<id>')
