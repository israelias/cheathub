import os

from flask import Flask

from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_mail import Mail

from admin.basicauth import initialize_basicauth
from admin.admin import initialize_admin
from admin.views import initialize_views

from database.db import initialize_db
from flask_restful import Api
from resources.errors import errors


if not os.path.exists("env.py"):
    pass
else:
    import env

# ===========================================================================
# *               `Flask App and Configs`
# ? Executes Flask app deployment
# Initializes app and packages by order of dependency requirements
# ===========================================================================


app = Flask(__name__)

app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.environ.get("MAIL_PORT"))
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER")
app.config["MAIL_USE_TLS"] = True

mail = Mail(app)

# initialize_mail(app)
from resources.routes import initialize_routes

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

app.config["MONGODB_HOST"] = os.environ.get("MONGODB_HOST")
app.config["MONGODB_PORT"] = int(os.environ.get("MONGODB_PORT"))
app.secret_key = os.environ.get("SECRET_KEY")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["DEBUG_TB_ENABLED"] = True
app.config["JSON_SORT_KEYS"] = False


initialize_db(app)
initialize_routes(api)

initialize_basicauth(app)
initialize_admin(app)
initialize_views()


if __name__ == "__main__":
    app.run()