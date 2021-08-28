from threading import Thread
from flask_mail import Message

from app import app
from app import mail

# from admin.mail import mail

from resources.errors import InternalServerError

"""
Create function send_mail() which takes subject, sender, recipients, text_body and html_body as arguments. It then creates a message object and runs send_async_email() in a separate thread, this is because while sending an email to the client we have to relay to the separate services such as Google, Outlook, etc
"""


def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except ConnectionRefusedError:
            raise InternalServerError("[MAIL SERVER] not working")


"""
Create function send_mail() which takes subject, sender, recipients, text_body and html_body as arguments. 
It then creates a message object and runs send_async_email() in a separate thread, this is because while sending 
an email to the client we have to relay to the separate services such as Google, Outlook, etc.
Since these services can take some time to actually send the email, we are going to tell the client that their request 
was successful and start sending the email in a separate thread
"""


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    mail.send(msg)
    Thread(target=send_async_email, args=(app, msg)).start()