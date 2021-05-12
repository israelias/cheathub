from flask_mongoengine import MongoEngine, MongoEngineSessionInterface

#===========================================================================
# *                       Initialize Database 
# ?  The module that connects to the cloud database  (MongoDB Atlas)
# Allows storing of documents to the cloud based on models defined locally.
# Requires connection string, set in environment vars and Heroku settings.
#===========================================================================

db = MongoEngine()


def initialize_db(app):
    db.init_app(app)
    app.session_interface = MongoEngineSessionInterface(db)
