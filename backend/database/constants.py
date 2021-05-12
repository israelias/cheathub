from .models import Snippet, User, Collection

#===========================================================================
# *           Undefined Dynamic Database Constants
# ?  Functions that retrieve values from nested fields
# 
# Allows dynamic values to operate as collections via local computation.
#===========================================================================

def all_tags():
    all_tags = []
    all_snippets = Snippet.objects()
    for tag in Snippet.objects():
        for k in tag["tags"]:
            if k not in all_tags:
                all_tags.append(k)
    return all_tags


def all_languages():
    all_languages = []
    all_snippets = Snippet.objects()
    for doc in all_snippets:
        if doc["language"] not in all_languages:
            all_languages.append(doc["language"])
    return all_languages
