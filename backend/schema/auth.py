from flask_graphql_auth import (
    GraphQLAuth
)

auth = GraphQLAuth()


def initialize_auth(app):
    auth.init_app(app)
    app.config["REFRESH_EXP_LENGTH"] = 30
    app.config["ACCESS_EXP_LENGTH"] = 10
