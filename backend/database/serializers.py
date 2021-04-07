from rest_framework_mongoengine.serializers import DocumentSerializer


class PostSerializer(DocumentSerializer):
    class Meta:
        model = Post
        depth = 2