from flask_admin import Admin
from .mongoview import MyAdminIndexView


admin = Admin(
    name="Cheat-Hub Backend",
    index_view=MyAdminIndexView(),
    endpoint="admin",
    url="/admin",
    template_mode="bootstrap4",
)


def initialize_admin(app):
    admin.init_app(app)
    app.config["FLASK_ADMIN_SWATCH"] = "cerulean"