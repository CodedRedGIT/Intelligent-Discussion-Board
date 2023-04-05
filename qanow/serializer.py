from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import *


class ClassSerializer(ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'


class MemberSerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class ReplySerializer(ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
