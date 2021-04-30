from database.models import Snippet


def get_all_tags(query):
    all_tags = []
    all_snippets = query.objects()
    for tag in Snippet.objects():
        for k in tag["tags"]:
            if k not in all_tags:
                all_tags.append(k)
    return all_tags

    # return Snippet.objects.filter(name=name.lower()).first_or_404()


def get_like_count(query):
    snippets = Snippet.objects()
    out = sorted(snippets, key=lambda item: len(item["likedBy"], reverse=True))
    return len(query.objects())
