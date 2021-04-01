import graphene
from graphene.relay import Node
# from graphene_mongo.tests.nodes import PlayerNode, ReporterNode
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType

from database.models import User as UserModel
from database.models import Snippet as SnippetModel
from database.models import Collection as CollectionModel


class User(MongoengineObjectType):
    class Meta:
        description = "User"
        model = UserModel
        interfaces = (Node,)
        exclude = ("password",)


class Snippet(MongoengineObjectType):
    class Meta:
        description = "Snippet"
        model = SnippetModel
        interfaces = (Node,)
        # filter_fields = {
        #     'name': ['exact', 'icontains', 'istartswith']
        # }



class Query(graphene.ObjectType):
    node = Node.Field()

    all_users = MongoengineConnectionField(User)
    all_snippets = MongoengineConnectionField(Snippet)

