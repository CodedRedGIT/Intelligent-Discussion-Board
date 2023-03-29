from rest_framework.serializers import ModelSerializer
from .models import *


class ClassSerializer(ModelSerializer):
    class Meta:
        model = Class
        fields = ('id', 'class_section')


class MemberSerializer(ModelSerializer):
    classes = ClassSerializer(many=True)

    class Meta:
        model = Member
        fields = ('id', 'user', 'classes', 'member_type')


class PostSerializer(ModelSerializer):
    member_id = MemberSerializer()

    class Meta:
        model = Post
        fields = ('id', 'member_id', 'prompt',
                  'published_date', 'upvotes', 'tag')


class ReplySerializer(ModelSerializer):
    member_id = MemberSerializer()
    post_id = PostSerializer()

    class Meta:
        model = Reply
        fields = ('id', 'member_id', 'post_id',
                  'published_date', 'prompt', 'upvotes')


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
