# from .auth import SignupApi, LoginApi, LogoutApi
# from .user import UsersApi, UserApi
# from .snippet import SnippetsApi, SnippetApi, LikeSnippetApi
# from .reset_password import ForgotPassword, ResetPassword
from flask_graphql import GraphQLView
from .query import auth_schema, data_schema


def initialize_url(app):
  app.add_url_rule(
    "/graphql/auth", view_func=GraphQLView.as_view("graphql", schema=auth_schema, graphiql=True)
  )
  app.add_url_rule(
    '/graphql', view_func=GraphQLView.as_view('graphql', schema=data_schema, graphiql=True)
  )



    # api.add_resource(SignupApi, '/api/auth/signup')
    # api.add_resource(LoginApi, '/api/auth/login')
    # api.add_resource(ForgotPassword, '/api/auth/forgot')
    # api.add_resource(ResetPassword, '/api/auth/reset')
    # api.add_resource(LogoutApi, '/api/auth/logout')
    # api.add_resource(UsersApi, '/api/users')
    # api.add_resource(UserApi, '/api/users/<id>')
    # api.add_resource(SnippetsApi, '/api/snippets')
    # api.add_resource(SnippetApi, '/api/snippets/<id>')
    # api.add_resource(LikeSnippetApi, '/api/likesnippet/<id>')
