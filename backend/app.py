import os

from flask import Flask

from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from admin.basicauth import initialize_basicauth
from admin.admin import initialize_admin
from admin.mail import initialize_mail
from admin.views import initialize_views
from admin.toolbar import initialize_toolbar
from admin.logger import initialize_logger

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

# Logger before app
initialize_logger()

app = Flask(__name__)

initialize_mail(app)
from resources.routes import initialize_routes

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

app.secret_key = os.environ.get("SECRET_KEY")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["DEBUG_TB_ENABLED"] = True
app.config["JSON_SORT_KEYS"] = False


initialize_db(app)
initialize_routes(api)

initialize_basicauth(app)
initialize_admin(app)
initialize_toolbar(app)
initialize_views()

if __name__ == "__main__":
    app.run(debug=True)
