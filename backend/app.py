import os

from flask import Flask

from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from database.db import initialize_db
from flask_restful import Api
from resources.errors import errors
from resources.routes import initialize_routes

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


api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

app.config["MONGODB_HOST"] = os.environ.get("MONGODB_HOST")
app.config["MONGODB_PORT"] = int(os.environ.get("MONGODB_PORT"))
app.secret_key = os.environ.get("SECRET_KEY")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["FLASK_ADMIN_SWATCH"] = "cerulean"
app.config["DEBUG_TB_ENABLED"] = True
app.config["JSON_SORT_KEYS"] = False


initialize_db(app)
initialize_routes(api)





if __name__ == "__main__":
    app.run()