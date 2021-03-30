from flask_admin import Admin


admin = Admin(name='Flask-React Todos', template_mode='bootstrap4')


def initialize_admin(app):
    admin.init_app(app)
