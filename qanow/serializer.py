from rest_framework.serializers import ModelSerializer
from .models import *


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ClassSerializer(ModelSerializer):
    """
    Serializer for the Class model.
    """
    class Meta:
        model = Class
        fields = '__all__'