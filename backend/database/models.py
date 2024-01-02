from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
import datetime


# ===========================================================================
# *                       All Database Models
# ?  Defines Snippet, Collection, User, and TokenBlockList
# Models defined here override definitions in MongoDB Atlas
# Responsible for all rules; notably delete-rules for reference fields.
# ! Changes to this document may result in db errors in live deployments
# ===========================================================================


class Snippet(db.Document):
    """The `Snippet` class inherits from the `db.Document` class, which is a MongoEngine class that allows us to save
    documents to MongoDB"""

    meta = {
        "collection": "snippet",
    }

    title = db.StringField(required=True, unique=False)
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
    score = db.IntField(required=True, default=0)

    def like_count(self):
        """
        The like_count function returns the number of likes that a post has.
        It takes in self as an argument, which is the instance of Post that called it.

        Args:
            self: Refer to the object that is calling the method

        Returns:
            The length of the likedby list
        """
        return len(self.likedBy)

    def __repr__(self):
        """
        The __repr__ function is what tells Python how to represent an object of our class as a string.
        The default implementation for this function is to return the instance address, which in this case would be:
        &lt;__main__.Post object at 0x7f8c9d6b0a90&gt;

        Args:
            self: Refer to the object that is calling the function

        Returns:
            The title of the object
        """
        return self.title

    def __str__(self):
        return self.title


class Collection(db.Document):
    """This class is a MongoDB document that represents a collection of items"""

    meta = {"collection": "collection"}

    name = db.StringField(required=True, unique=False)
    owner = db.ReferenceField("User", required=True)
    snippets = db.ListField(db.ReferenceField("Snippet", reverse_delete_rule=db.PULL))
    private = db.BooleanField(default=False)
    date = db.DateTimeField(default=datetime.datetime.utcnow)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class User(db.Document):
    """The User class is a subclass of the db.Document class, which is a subclass of the db.Model class"""

    meta = {"collection": "user"}
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
        """
        The check_password function takes in a password and the hash of the password
        and checks if they are equal. If they are, it returns true. Otherwise, it returns false.

        Args:
            self: Reference the instance of the object that is being created
            password: Check the password entered by the user against the hashed password stored in the database

        Returns:
            True or false depending on whether the password_hash matches the password
        """
        return check_password_hash(self.password, password)

    def __repr__(self):
        return 'User(email="{}", username="{}")'.format(self.username, self.password)

    def __str__(self):
        return self.username


# Telling MongoDB that if a user is deleted, then all the snippets that the user created should be deleted as well.
User.register_delete_rule(Snippet, "addedBy", db.CASCADE)
User.register_delete_rule(Snippet, "likedBy", db.CASCADE)
# Telling MongoDB that if a user is deleted, then all the collections that the user created should be deleted as well.
User.register_delete_rule(Collection, "owner", db.CASCADE)


# > This class is used to store a list of tokens that are not allowed to be used in the system
class TokenBlocklist(db.Document):
    meta = {"collection": "token_blocklist"}
    jti = db.StringField(max_length=36, null=False)
    created_on = db.DateTimeField(null=False)
    expires_on = db.DateTimeField(null=False)
    revoked_on = db.DateTimeField(null=False)
    revoked_by = db.ReferenceField("User")


# Telling MongoDB that if a user is deleted, then all the tokens that the user created should be deleted as well.
User.register_delete_rule(TokenBlocklist, "revoked_by", db.CASCADE)
