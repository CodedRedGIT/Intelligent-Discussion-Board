from rest_framework.serializers import ModelSerializer
from .models import *


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class ClassSerializer(ModelSerializer):
    """
    Serializer for the Class model.
    """
    class Meta:
        model = Class
        fields = '__all__'
