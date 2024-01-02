import os
from flask_mail import Mail

if not os.path.exists("env.py"):
    pass
else:
    import env

mail = Mail()


def initialize_mail(app):
    """
    The initialize_mail function initializes the Flask-Mail extension.
    It sets up the mail server, port, username and password for sending emails.
    The default sender is also set to be the email address of MAIL_DEFAULT_SENDER.

    Args:
        app: Access the application instance

    Returns:
        A configured flask mail object
    """
    app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER")
    app.config["MAIL_PORT"] = int(os.environ.get("MAIL_PORT"))
    app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER")
    app.config["MAIL_USE_SSL"] = True
    mail.init_app(app)

    # MAIL_SERVER : default ‘localhost’
    # MAIL_PORT : default 25
    # MAIL_USE_TLS : default False
    # MAIL_USE_SSL : default False
    # MAIL_DEBUG : default app.debug
    # MAIL_USERNAME : default None
    # MAIL_PASSWORD : default None
    # MAIL_DEFAULT_SENDER : default None
    # MAIL_MAX_EMAILS : default None
    # MAIL_SUPPRESS_SEND : default app.testing
    # MAIL_ASCII_ATTACHMENTS : default False
