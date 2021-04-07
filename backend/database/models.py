from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
import datetime


class Snippet(db.Document):
    meta = {"collection": "snippet"}
    title = db.StringField(required=True)

    def __str__(self):
        return self.title

    filename = db.StringField(unique=False)
    tags = db.ListField(db.StringField())
    description = db.StringField()
    language = db.StringField(default="javascript")
    value = db.StringField(required=True)

    addedBy = db.ReferenceField("User", required=True)
    likedBy = db.ListField(db.ReferenceField("User"))
    addedOn = db.DateTimeField(required=True, default=datetime.datetime.utcnow)
    updatedOn = db.DateTimeField()
    private = db.BooleanField(default=False)
    active: db.BooleanField(default=True)
    source = db.URLField(unique=False)

    def __repr__(self):
        return self.title


class Collection(db.Document):
    meta = {"collection": "collection", "cascade": True}

    name = db.StringField(required=True, unique=True)
    owner = db.ReferenceField("User", required=True)
    snippets = db.ListField(db.ReferenceField("Snippet", reverse_delete_rule=db.PULL))
    private = db.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class User(db.Document):
    meta = {
        "collection": "user",
        "cascade": True,
        "indexes": [
            {
                "fields": ["$username", "$email"],
                # "default_language": "english",
                "weights": {"username": 10, "email": 2},
            }
        ],
    }

    username = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    online = db.BooleanField(default=True)

    snippets_created = db.ListField(
        db.ReferenceField("Snippet", reverse_delete_rule=db.PULL)
    )
    snippets_liked = db.ListField(
        db.ReferenceField("Snippet", reverse_delete_rule=db.PULL)
    )

    collections = db.ListField(db.ReferenceField("Collection"))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode("utf8")

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return 'User(email="{}", username="{}")'.format(self.username, self.password)

    def __str__(self):
        return self.username


User.register_delete_rule(Snippet, "addedBy", db.CASCADE)
User.register_delete_rule(Snippet, "likedBy", db.CASCADE)
User.register_delete_rule(Collection, "owner", db.CASCADE)
# Collection.register_delete_rule(Snippet, 'owner', db.CASCADE)


class TokenBlocklist(db.Document):
    meta = {"collection": "token_blocklist"}
    jti = db.StringField(max_length=36, null=False)
    created_on = db.DateTimeField(null=False)
    expires_on = db.DateTimeField(null=False)
    revoked_on = db.DateTimeField(null=False)
    revoked_by = db.ReferenceField("User")
