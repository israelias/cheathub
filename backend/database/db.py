import os
from flask_mongoengine import MongoEngine, MongoEngineSessionInterface
from flask_mongoengine.json import MongoEngineJSONEncoder


if not os.path.exists("env.py"):
    pass
else:
    import env


# ===========================================================================
# *                       Initialize Database
# ?  The module that connects to the cloud database  (MongoDB Atlas)
# Allows storing of documents to the cloud based on models defined locally.
# Requires connection string, set in environment vars and Heroku settings.
# ===========================================================================

db = MongoEngine()


def initialize_db(app):
    """
    The initialize_db function is called by the application factory.
    It initializes our database and sets up a custom JSON encoder for our models.

    Args:
        app: Access the application instance itself, and is used to get access to the

    Returns:
        A flask application object
    """
    app.config["MONGODB_HOST"] = os.environ.get("MONGODB_HOST")
    app.config["MONGODB_PORT"] = int(os.environ.get("MONGODB_PORT"))
    app.config["MONGODB_DB"] = os.environ.get("MONGODB_DB")
    app.config["MONGODB_USERNAME"] = os.environ.get("MONGODB_USERNAME")
    app.config["MONGODB_PASSWORD"] = os.environ.get("MONGODB_PASSWORD")

    app.session_interface = MongoEngineSessionInterface(db)
    app.json_encoder = MongoEngineJSONEncoder
    db.init_app(app)
