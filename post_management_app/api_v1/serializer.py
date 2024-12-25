from rest_framework import serializers
from .models import PostModel

class PostModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = "__all__"
    # def create(self, validated_data):
    #     # Extract any additional data (e.g., username)
    #     username = validated_data.pop('username', None)

    #     # Handle the creation logic
    #     post = PostModel.objects.create(**validated_data)

    #     # Assign the username if needed
    #     if username:
    #         post.username = username
    #         post.save()

    #     return post


