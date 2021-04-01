from .models import Query as AuthQuery, Mutation
from .schema import Query as DataQuery, User, Snippet

auth_schema = graphene.Schema(query=AuthQuery, mutation=Mutation)
data_schema = graphene.Schema(query=DataQuery, types=[User, Snippet])
