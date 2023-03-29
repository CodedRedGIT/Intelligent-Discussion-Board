from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from .models import Class, Question
from .serializer import ClassSerializer, QuestionSerializer


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

    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            return Response({'message': 'Login successful'})
    except User.DoesNotExist:
        pass

    return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.create_user(email, email, password)
        return Response({'message': 'User created successfully'})
    except IntegrityError:
        return Response({'error': 'A user with this email already exists'}, status=400)
    except Exception as e:
        return Response({'error': f'Unable to create user: {str(e)}'}, status=400)
    
    
@api_view(['GET'])
def get_classes(request):
    """
    Retrieve a list of all classes.
    """
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data, status=200)
