# import os
# from flask_mail import Mail
#
# mail = Mail()
#
#
# def initialize_mail(app):
#     mail.init_app(app)
#     app.config['MAIL_SERVER'] = os.environ.get("MAIL_SERVER")
#     app.config['MAIL_PORT'] = int(os.environ.get("MAIL_PORT"))
#     app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME")
#     app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PORT")
