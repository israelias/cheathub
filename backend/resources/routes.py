from .auth import SignupApi, LoginApi, LogoutApi
from .user import UsersApi, UserApi
from .snippet import SnippetsApi, SnippetApi, LikeSnippetApi
from .collection import CollectionApi, CollectionsApi
from .profile import (
    MySnippetsApi,
    MyFaveSnippetsApi,
    MyCollectionsApi,
    MyCollectionApi,
)
from .reset_password import ForgotPassword, ResetPassword
from .status import Status

def initialize_routes(api):
    
    # Root
    api.add_resource(Status, '/')
    # Sign Up
    # Post, username, email and password (Token returned)
    api.add_resource(SignupApi, "/api/auth/signup")
    # Sign In
    # Post, email and password (Token returned)
    api.add_resource(LoginApi, "/api/auth/login")
    # Log Out
    # Post, (Token required, Token revoked)
    api.add_resource(LogoutApi, "/api/auth/logout")
    api.add_resource(ForgotPassword, "/api/auth/forgot")
    api.add_resource(ResetPassword, "/api/auth/reset")

    # Friends Profile
    # Get, Post
    api.add_resource(UsersApi, "/api/users")
    # Get, Put, Delete
    api.add_resource(UserApi, "/api/users/<id>")

    # ALL SNIPPETS
    # Get, Post
    api.add_resource(SnippetsApi, "/api/snippets")
    # Get, Put, Delete
    api.add_resource(SnippetApi, "/api/snippets/<id>")

    # LIKE SNIPPET
    # Post (Token required)
    api.add_resource(LikeSnippetApi, "/api/likesnippet/<id>")

    # ALL COLLECTIONS
    # Get, Post
    api.add_resource(CollectionsApi, "/api/collections")
    # Get, Put, Delete
    api.add_resource(CollectionApi, "/api/collections/<id>")

    # USER PROFILE GET VIEWS
    # My Profile Snippets (Full)
    api.add_resource(MySnippetsApi, "/api/users/<id>/snippets")
    # My Profile Saved/Faved Snippets (Full)
    api.add_resource(MyFaveSnippetsApi, "/api/users/<id>/snippets/faves")
    # My Profile Collections (Preview)
    api.add_resource(MyCollectionsApi, "/api/users/<user_id>/collections")
    # My Profile Collection (Full with Snippets)
    api.add_resource(MyCollectionApi, "/api/users/<user_id>/collections/<id>")
