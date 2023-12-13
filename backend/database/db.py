from flask_mongoengine import MongoEngine, MongoEngineSessionInterface
import os
# ===========================================================================
# *                       Initialize Database
# ?  The module that connects to the cloud database  (MongoDB Atlas)
# Allows storing of documents to the cloud based on models defined locally.
# Requires connection string, set in environment vars and Heroku settings.
# ===========================================================================

# Creating a MongoEngine object.
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
    app.config["MONGODB_SETTINGS"] = [
        {
            # "db": "cheathubdb",
            "host":  os.environ.get("MONGODB_HOST"),
            "port": int(os.environ.get("MONGODB_PORT")),
            # "alias": "default",
        }
    ]
    db.init_app(app)
    app.session_interface = MongoEngineSessionInterface(db)
