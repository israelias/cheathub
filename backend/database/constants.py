# ===========================================================================
# *           Undefined Dynamic Database Constants
# ?  Functions that retrieve values from nested fields
#
# Allows dynamic values to operate as collections via local computation.
# ===========================================================================

from .models import Snippet


def all_tags():
    """
    The all_tags function returns a list of all the tags in the database.
    It does this by iterating through each snippet and appending any new tag to
    the list of all_tags. It then returns that list.

    Returns:
        A list of all the tags in the database
    """

    all_tags = []
    all_snippets = Snippet.objects()
    for tag in Snippet.objects():
        for k in tag["tags"]:
            if k not in all_tags:
                all_tags.append(k)
    return all_tags


def all_languages():
    """
    The all_languages function returns a list of all the languages that have been used in any snippet.
    It does this by querying the Snippet collection and then iterating through each document to check if
    the language field is already in the list of all_languages. If it isn't, it adds it to the list.

    Returns:
        A list of all the languages in the database
    """

    all_languages = []
    all_snippets = Snippet.objects()
    for doc in all_snippets:
        if doc["language"] not in all_languages:
            all_languages.append(doc["language"])
    return all_languages
