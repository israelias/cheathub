from .auth import SignupApi, LoginApi, LogoutApi
from .user import UsersApi, UserApi
from .snippet import SnippetsApi, SnippetApi, LikeSnippetApi
from .collection import CollectionApi, CollectionsApi
from .profile import (
    MySnippetsApi,
    MyFaveSnippetsApi,
    MyCollectionsApi,
    MyCollectionApi,
    MySnippetsOptionsApi,
    MyCollectionsOptionsApi,
)
from .search import SearchApi
from .status import Status

from .tags import TagsApi

from .reset_password import ForgotPassword, ResetPassword

# ===========================================================================
# *             Initialize Routes
# ?  Initializes assignment of defined resource classes to a url.
# Responsible for linking the backend resources to the frontend UI
# Definitions are synced with frontend fetch methods.
# ===========================================================================


def initialize_routes(api):
    """Backend root shows the status of the Api."""
    api.add_resource(Status, "/")

    """Sign up Api: Post. username, email and password. Token returned. """
    api.add_resource(SignupApi, "/api/auth/signup")

    """Sign in Api: Post. username, email and password. Token returned. """
    api.add_resource(LoginApi, "/api/auth/login")

    """Sign out Api: Post. username, email and password. Token returned. """
    api.add_resource(LogoutApi, "/api/auth/logout")

    """Users Api: Get, Post."""
    api.add_resource(UsersApi, "/api/users")

    """User Api: Get, Put, Delete."""
    api.add_resource(UserApi, "/api/users/<id>")

    """Snippets Api: Get, Post."""
    api.add_resource(SnippetsApi, "/api/snippets")
    """Snippets Api: Get, Put, Delete."""
    api.add_resource(SnippetApi, "/api/snippets/<id>")

    """Like/Fave Snippet Api: Post. Token required."""
    api.add_resource(LikeSnippetApi, "/api/likesnippet/<id>")

    """Collections Api: Get, Post."""
    api.add_resource(CollectionsApi, "/api/collections")

    """Collection Api: Get, Put, Delete."""
    api.add_resource(CollectionApi, "/api/collections/<id>")

    """User Profile Snippets Api: username id required"""
    api.add_resource(MySnippetsApi, "/api/users/<id>/snippets")

    """User Profile Fave Snippets Api: username id required"""
    api.add_resource(MyFaveSnippetsApi, "/api/users/<id>/snippets/faves")

    """User Profile Collections Api: username id required"""
    api.add_resource(MyCollectionsApi, "/api/users/<user_id>/collections")

    """User Profile Collection Api: collection id, username id required"""
    api.add_resource(MyCollectionApi, "/api/users/<user_id>/collections/<id>")

    """User Profile Snippet Options Api: username id required"""
    api.add_resource(MySnippetsOptionsApi, "/api/users/<user_id>/snippets/options")

    """User Profile Collections Options Api: username id required"""
    api.add_resource(
        MyCollectionsOptionsApi, "/api/users/<user_id>/collections/options"
    )

    """Search Snippets Api: search text, tag and language arg parsers enabled."""
    api.add_resource(SearchApi, "/api/search")

    """Tag list endpoint: List of all current tags returned. """
    api.add_resource(TagsApi, "/api/tags")

    api.add_resource(ForgotPassword, "/api/auth/forgot")
    api.add_resource(ResetPassword, "/api/auth/reset")
