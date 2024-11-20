from flask_admin import Admin
from .mongoview import MyAdminIndexView, MyModelView

# from database.db import db, session
# from database.models import User, Snippet, Collection, TokenBlocklist

admin = Admin(
    name="Cheat-Hub Backend",
    index_view=MyAdminIndexView(),
    endpoint="admin",
    url="/admin",
    template_mode="bootstrap3",
)


def initialize_admin(app):
    """
    The initialize_admin function is used to initialize the admin interface.
    It takes in an app object and initializes the admin interface with a cerulean theme.

    Args:
        app: Access the application instance

    Returns:
        The admin object that is created by the init_app function

    """
    app.config["FLASK_ADMIN_SWATCH"] = "cerulean"
    admin.init_app(app)
