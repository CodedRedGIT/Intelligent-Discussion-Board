from rest_framework.serializers import ModelSerializer
from .models import *


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
