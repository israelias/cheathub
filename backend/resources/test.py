 from flask import  request, jsonify
 from database.models import Snippet, User


 def post(self):
    body = request.get_json()
    rest = body["snippets"]
    gistarray = []

    for snippet in rest:
        gist = Snippet.objects.get(
            title=snippet["title"],
            filename=snippet["filename"],
            description=snippet["description"],
            value=snippet["value"],
        )

        gist.update(
            set__addedBy=User.objects.get(
              username=snippet["addedBy"]
              ),
            set__likedBy=[
                User.objects.get(
                  username=k
                  ) for k in snippet["likedBy"]
            ],
        )

        gist.save()
        gistarray.append(gist)

    return jsonify(gistarray)

 from flask import  request, jsonify
 from database.models import Snippet, User
 import datetime

def post(self):
    body = request.get_json()
    rest = body['snippets']

    gistarray = []
    now = datetime.datetime.now(datetime.timezone.utc)

    for snippet in rest:

        owner = User.objects.get(
          username=snippet['addedBy']
          )

        tagslist = []
        for t in snippet['tags']:
            tagslist.append(t)

        gist = Snippet(
            title=snippet['title'],
            filename=snippet['filename'],
            description=snippet['description'],
            language=snippet['language'],
            value=snippet['value'],
            source=snippet['source'],

            addedOn=now,
            updatedOn=now,

            tags=tagslist,
            addedBy=owner,
        )

        gist.save()

        likeslist = []
        for user in snippet['likedBy']:
            me = User.objects.get(
              username=user
              )
            likeslist.append(me)

        gist.update(
          push__likedBy=likeslist
          )
        owner.update(
          push__snippets_created=gist
          )

        '''
        Potential further loop to update collection fields

        colList = []
        for col in snippet['collection']:
        colList = []
        collection = Collection.objects.get(
            name=col,
            owner=owner
            # snippets=add_to_set__snippets=gist
        )
        collection.save()
        collection.update(add_to_set__snippets=gist)
        owner.update(add_to_set__collections=collection)

        '''

        gistarray.append(gist)

        return jsonify(gistarray)





        def post(self):
        # try:
        body = request.get_json()
        rest = body["snippets"]
        gistarray = []

        for snippet in rest:
            gist = Snippet.objects.get(
                # title=snippet["title"],
                # filename=snippet["filename"],
                description=snippet["description"],
                value=snippet["value"],
            )

            for person in snippet["likedBy"]:
                you = User.objects.get(username=person)
                you.update(add_to_set__snippets_liked=gist)

            creator = User.objects.get(username=snippet["addedBy"])
            creator.update(add_to_set__snippets_created=gist)

            gistarray.append(gist)

        return jsonify(gistarray)




      def post(self):
        # try:
        body = request.get_json()
        rest = body["snippets"]
        gistarray = []

        for snippet in rest:
            gist = Snippet.objects.get(
                # title=snippet["title"],
                # filename=snippet["filename"],
                description=snippet["description"],
                value=snippet["value"],
            )

            creator = User.objects.get(username=snippet["addedBy"])

            for collection in snippet["collection"]:

                if Collection.objects(name=collection):
                    coll = Collection.objects.get(name=collection)
                    coll.update(add_to_set__snippets=gist)
                    owner = coll.owner
                    owner.update(add_to_set__collections=coll)

                else:
                    collect = Collection(
                        name=collection, owner=creator, snippets=list(gist)
                    )
                    collect.save()
                    creator.update(add_to_set__collections=collect)

            # creator.update(add_to_set__collections=gist)
            gistarray.append(gist)

        return jsonify(gistarray)