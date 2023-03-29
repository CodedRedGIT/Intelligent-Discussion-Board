from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from .models import Class, Member, Post, Reply
from .serializer import ClassSerializer, MemberSerializer, PostSerializer, ReplySerializer, UserSerializer


@api_view(['GET'])
def get_all_classes(request):
    """
    Retrieve a list of all classes.
    """
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_all_members(request):
    """
    Retrieve a list of all members.
    """
    members = Member.objects.all()
    serializer = MemberSerializer(members, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_all_posts(request):
    """
    Retrieve a list of all posts.
    """
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_all_replies(request):
    """
    Retrieve a list of all replies.
    """
    replies = Reply.objects.all()
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_post(request, id):
    posts = Post.objects.get(id=id)
    serializer = PostSerializer(posts, many=False)
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
def get_member_info(request, id):
    """
    Retrieve a member's classes, member type, and user information.
    """
    try:
        member = Member.objects.get(id=id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)

    # Retrieve the member's classes
    classes = member.classes.all()
    class_serializer = ClassSerializer(classes, many=True)

    # Retrieve the member's member type
    member_type = member.get_member_type_display()

    # Retrieve the member's user information
    user_serializer = UserSerializer(member.user)

    # Combine the retrieved data into a single response
    response_data = {
        'member_id': id,
        'classes': class_serializer.data,
        'member_type': member_type,
        'user': user_serializer.data,
    }

    return Response(response_data, status=200)


@api_view(['GET'])
def get_class(request, id):
    """
    Retrieve a specific class by ID.
    """
    try:
        class_obj = Class.objects.get(id=id)
    except Class.DoesNotExist:
        return Response({'error': 'Class not found'}, status=404)

    serializer = ClassSerializer(class_obj)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_reply(request, id):
    """
    Retrieve a specific reply by ID.
    """
    try:
        reply_obj = Reply.objects.get(id=id)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=404)

    serializer = ReplySerializer(reply_obj)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_post_replies(request, post_id):
    """
    Retrieve all replies for a specific post.
    """
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    replies = post.replies.all()
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data, status=200)
