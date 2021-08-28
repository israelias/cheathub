import os
from flask_basicauth import BasicAuth

basic_auth = BasicAuth()


def initialize_basicauth(app):
    basic_auth.init_app(app)
    app.config["BASIC_AUTH_USERNAME"] = os.environ.get("BASIC_AUTH_USERNAME")
    app.config["BASIC_AUTH_PASSWORD"] = os.environ.get("BASIC_AUTH_PASSWORD")
