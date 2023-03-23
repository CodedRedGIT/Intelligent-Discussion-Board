from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .models import Question
from .serializer import QuestionSerializer


@api_view(['GET'])
def get_all_questions(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_question(request, id):
    questions = Question.objects.get(id=id)
    serializer = QuestionSerializer(questions, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful'})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.create_user(email, email, password)
        return Response({'message': 'User created successfully'})
    except:
        return Response({'error': 'Unable to create user'}, status=400)