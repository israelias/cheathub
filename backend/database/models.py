from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash


class Snippet(db.Document):
    meta = {'collection': 'gist'}
    title = db.StringField(required=True, unique=True)

    filename = db.StringField()
    category = db.StringField()
    tags = db.ListField(db.StringField())
    description = db.StringField()
    language = db.StringField(default='javascript')
    value = db.StringField()
    file = db.FileField()

    added_by = db.ReferenceField('User')
    liked_by = db.ListField(db.ReferenceField('User'))
    added_on = db.DateTimeField()
    updated_on = db.DateTimeField()
    private = db.BooleanField(default=False)

    def __repr__(self):
        return self.title


class User(db.Document):
    username = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    online = db.BooleanField(default=True)
    gists_created = db.ListField(db.ReferenceField('Gist', reverse_delete_rule=db.PULL))
    gists_liked = db.ListField(db.ReferenceField('Gist'))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username


User.register_delete_rule(Snippet, 'added_by', db.CASCADE)


class TokenBlocklist(db.Document):
    meta = {'collection': 'token_blocklist'}
    jti = db.StringField(max_length=36, null=False)
    created_on = db.DateTimeField(null=False)
    expires_on = db.DateTimeField(null=False)
    revoked_on = db.DateTimeField(null=False)
    revoked_by = db.ReferenceField('User')

