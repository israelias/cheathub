from flask_mongoengine import MongoEngine, MongoEngineSessionInterface

db = MongoEngine()


def initialize_db(app):
    db.init_app(app)
    app.session_interface = MongoEngineSessionInterface(db)

# def override_json_encoder(app):
#     from bson import ObjectId
#     from datetime import date

#     superclass = app.json_encoder

#     class _JsonEncoder(superclass):
#         def default(self, o):
#             if isinstance(o, ObjectId):
#                 return str(o)
#             if isinstance(o, date):
#                 return o.isoformat()
#             return superclass.default(self, o)

#     app.json = _JsonEncoder