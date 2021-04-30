from .models import Snippet, User, Collection

# snippet_query = Snippet.objects()
# user_query = User.objects()


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



# def all_fans():
#     all_fans = []
#     for doc in snippet_query:
#         for fan in doc["likedBy"]:
#             if fan not in all_fans:
#                 all_fans.append(fan)
#     return all_fans


# def all_usernames():
#     all_usernames = []
#     for doc in User.objects.only("username"):
#         all_usernames.append(doc)
#     return all_usernames

# def all_users():
#     all_users = []
#     for doc in User.objects():
