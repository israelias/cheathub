from flask_mongoengine import MongoEngine, MongoEngineSessionInterface

db = MongoEngine()


def initialize_db(app):
    db.init_app(app)
    app.session_interface = MongoEngineSessionInterface(db)
