import os
from flask_basicauth import BasicAuth

if not os.path.exists("env.py"):
    pass
else:
    import env

basic_auth = BasicAuth()


def initialize_basicauth(app):
    """
    The initialize_basicauth function initializes the Flask app with basic authentication.
    It sets the username and password from environment variables, which are set in Vercel.

    Args:
        app: Access the flask app instance

    Returns:
        The app and the user name and password
    """
    app.config["BASIC_AUTH_USERNAME"] = os.environ.get("BASIC_AUTH_USERNAME")
    app.config["BASIC_AUTH_PASSWORD"] = os.environ.get("BASIC_AUTH_PASSWORD")
    app.config["BASIC_AUTH_REALM"] = os.environ.get("BASIC_AUTH_REALM")
    basic_auth.init_app(app)
