from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Question
from .serializer import QuestionSerializer


@api_view(['GET'])
def get_all_questions(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

