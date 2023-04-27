import datetime
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.db import transaction

from rest_framework_simplejwt.tokens import RefreshToken

from qanow.text_data import embedding_create, process_file_text, process_text, strip_text
from .models import Class, File, Member, ParentReply, Post, Reply
from .serializer import ClassSerializer, MemberSerializer, PostSerializer, ReplySerializer, UserSerializer


@api_view(['GET'])
def retrieve_files_by_class(request, id):
    try:
        # Retrieve the class with the given ID
        class_obj = Class.objects.get(pk=id)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)

    # Ensure that the user has permission to access this class
    if not request.user.is_staff and request.user.id != class_obj.owner_id:
        return JsonResponse({'error': 'You do not have permission to access this class'}, status=403)

    # Retrieve all files for this class
    files = File.objects.filter(class_id=id).order_by('-created_at')

    # Serialize the files and return them in the response
    data = [{'id': f.id, 'name': f.name, 'size': f.size, 'type': f.type, 'created_at': f.created_at} for f in files]
    return JsonResponse({'files': data})

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
    print(replies)
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_class_posts(request, id):
    # Retrieve the Class object with the given class_id
    try:
        class_obj = Class.objects.get(id=id)
    except Class.DoesNotExist:
        return JsonResponse({'error': 'Class not found'}, status=404)

    # Retrieve the posts associated with the Class object
    posts = class_obj.posts.all()

    # Serialize the posts using the PostSerializer
    serializer = PostSerializer(posts, many=True)

    # Return the serialized posts as a JSON response
    return Response(serializer.data)


@api_view(['GET'])
def get_post(request, id):
    posts = Post.objects.get(id=id)
    serializer = PostSerializer(posts, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_member_info(request, id):
    """
    Retrieve a member's classes, member type, and user information.
    """
    try:
        member = Member.objects.get(id=id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)

    # Retrieve the member's member type
    member_type = member.member_type

    # Retrieve the member's user information
    user_serializer = UserSerializer(member.user)

    # Combine the retrieved data into a single response
    response_data = {
        'member_id': id,
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


@api_view(['POST'])
def join_class(request):
    member_id = request.data.get('member_id')
    class_id = request.data.get('class_id')

    try:
        member = Member.objects.get(id=member_id)
        class_obj = Class.objects.get(id=class_id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)
    except Class.DoesNotExist:
        return Response({'error': 'Class not found'}, status=404)

    # Add the member to the class
    class_obj.members.add(member)

    # Serialize the updated class and return it in the response
    serializer = ClassSerializer(class_obj)
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

    # Construct the response data
    response_data = []
    for reply in replies:
        parent_reply_data = None
        if reply.parent_reply:
            parent_reply_data = {
                'member_email': reply.parent_reply.member_email,
                'prompt': reply.parent_reply.prompt
            }

        response_data.append({
            'id': reply.id,
            'prompt': reply.prompt,
            'upvotes': reply.upvotes,
            'published_date': reply.published_date,
            'email': reply.email,
            'parent_reply': parent_reply_data,
            'files': []  # Modify this to include the actual files data if needed
        })

    return Response(response_data, status=200)




@api_view(['GET'])
def get_member_classes(request, id):
    try:
        member = Member.objects.get(id=id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)

    classes = member.get_classes()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            member = Member.objects.get(user=user)
            serializer = MemberSerializer(member)

            # create a token for the user
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            access_token.set_exp(lifetime=datetime.timedelta(minutes=200))

            # return the serialized member and token in the response
            return Response({'member': serializer.data, 'access_token': str(refresh.access_token)}, status=200)
    except User.DoesNotExist:
        pass

    return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['GET'])
def get_session_data(request):
    user = request.user
    member = Member.objects.get(user=user)
    serializer = MemberSerializer(member)
    return Response({'access_token': str(request.auth), 'email': user.email, 'user_id': serializer.data['id']})


@api_view(['POST'])
def create_member(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.create_user(email, email, password)
        member = Member.objects.create(user=user, member_type='STUDENT')
        return Response({'message': 'User and member created successfully'}, status=201)
    except IntegrityError:
        return Response({'error': 'A user with this email already exists'}, status=400)
    except Exception as e:
        return Response({'error': f'Unable to create user: {str(e)}'}, status=400)


@api_view(['POST'])
def create_class(request):
    """
    Creates a new class with the provided section and assigns the member as the owner and member of the class.
    """
    section = request.data.get('section')
    member_id = request.data.get('member_id')

    try:
        member = Member.objects.get(id=member_id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)

    new_class = Class.objects.create(class_section=section)
    new_class.members.add(member)
    new_class.owners.add(member)
    data = {'id': new_class.id, 'class_section': new_class.class_section}
    return Response(data, status=201)


@api_view(['POST'])
def create_reply(request):
    post_id = request.data.get('post_id')

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    member_id = request.data.get('member_id')
    prompt = request.data.get('prompt')

    member = Member.objects.get(id=member_id)

    parent_id = request.data.get('parent_id')

    if parent_id:
        try:
            parent_reply = Reply.objects.get(id=parent_id)
        except Reply.DoesNotExist:
            return Response({'error': 'Parent Reply not found'}, status=404)

        parent_prompt = parent_reply.prompt
        parent_member_email = parent_reply.member_id.user.email

        parent_reply_object = ParentReply.objects.create(
            member_email=parent_member_email,
            prompt=parent_prompt
        )

        new_reply = Reply.objects.create(
            member_id=member,
            prompt=prompt,
            parent_reply=parent_reply_object
        )
    else:
        new_reply = Reply.objects.create(
            member_id=member,
            prompt=prompt
        )

    new_reply.files.set(request.FILES.getlist('file'))

    post.replies.add(new_reply)

    data = {
        'id': new_reply.id,
        'member_id': new_reply.member_id.id,
        'prompt': new_reply.prompt,
        'upvotes': new_reply.upvotes
    }
    return Response(data, status=201)



@api_view(['POST'])
def create_nested_reply(request):
    reply_id = request.data.get('reply_id')

    try:
        parent_reply = Reply.objects.get(id=reply_id)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=404)

    member_id = request.data.get('member_id')
    prompt = request.data.get('prompt')

    member = Member.objects.get(id=member_id)

    new_reply = Reply.objects.create(
        member_id=member,
        prompt=prompt,
        parent_reply=parent_reply,
    )
    new_reply.files.set(request.FILES.getlist('file'))

    serializer = ReplySerializer(new_reply)
    return Response(serializer.data, status=201)



@api_view(['POST'])
def create_post_check(request):
    class_id = request.data.get('class_id')

    try:
        class_obj = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({'error': 'Class not found'}, status=404)

    member_id = request.data.get('member_id')

    try:
        member = Member.objects.get(id=member_id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)

    prompt = request.data.get('prompt')

    processed_text_dict = process_text(prompt, class_id)

    if not processed_text_dict:
        processed_text_dict = process_file_text(prompt, class_id)

    response_data = []  # Initialize the response_data variable

    for post_id in processed_text_dict:
        post = Post.objects.get(id=post_id)
        prompt = post.prompt
        title = post.title
        response_data.append({'post_id': post_id, 'title': title, 'prompt': prompt})

    print("file answer: ")
    print(response_data)  # Print the response_data

    return Response(response_data, status=201)



@api_view(['POST'])
def save_file_for_class(request):
    class_id = request.POST.get('class_id')
    file = request.FILES.get('file')

    try:
        class_obj = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({'error': 'Class not found'}, status=400)

    file_text = strip_text(file)
    file_embedding = embedding_create(file_text)

    with transaction.atomic():
        file_obj = File.objects.create(file=file, embedding=file_embedding)
        class_obj.files.add(file_obj)

    return Response({'success': True}, status=200)


@api_view(['POST'])
def create_post(request):

    class_id = request.data.get('class_id')

    try:
        class_obj = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return Response({'error': 'Class not found'}, status=404)

    member_id = request.data.get('member_id')

    try:
        member = Member.objects.get(id=member_id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)

    prompt = request.data.get('prompt')
    tag = request.data.get('tag')
    title = request.data.get('title')

    new_post = Post.objects.create(
        member_id=member, prompt=prompt, title=title, tag=tag)
    
    new_post.files.set(request.FILES.getlist('file'))
    data = {'id': new_post.id, 'member_id': new_post.member_id.id, 'prompt': new_post.prompt,
            'published_date': new_post.published_date, 'upvotes': new_post.upvotes, 'replies': []}
    for reply in new_post.replies.all():
        data['replies'].append({'id': reply.id, 'member_id': reply.member_id.id, 'prompt': reply.prompt,
                               'published_date': reply.published_date, 'upvotes': reply.upvotes})

    class_obj.posts.add(new_post)
    return Response(data, status=201)


@api_view(['POST'])
def upvote_post(request, id):
    """
    Upvote a specific post.
    """
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    post.upvotes += 1
    post.save()

    serializer = PostSerializer(post)
    return Response(serializer.data, status=200)


@api_view(["GET"])
def get_member_type(request, id):
    try:
        member = Member.objects.get(id=id)
        member_type = member.member_type
        return JsonResponse(member_type, safe=False)
    except Member.DoesNotExist:
        return JsonResponse({"error": "Member does not exist."}, status=404)


@api_view(['POST'])
def change_member_type(request, id):
    try:
        member = Member.objects.get(id=id)
    except Member.DoesNotExist:
        return Response({'error': 'Member not found'}, status=404)
    
    new_type = 'INSTRUCTOR' if member.member_type == 'STUDENT' else 'STUDENT'
    member.member_type = new_type
    member.save()

    serializer = MemberSerializer(member)
    return Response(serializer.data, status=200)




@api_view(['POST'])
def upvote_reply(request, id):
    """
    Upvote a specific reply.
    """
    try:
        reply = Reply.objects.get(id=id)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=404)

    reply.upvotes += 1
    reply.save()

    serializer = ReplySerializer(reply)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def remove_upvote_post(request, id):
    """
    Remove an upvote from a specific post.
    """
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    if post.upvotes > 0:
        post.upvotes -= 1
        post.save()

    serializer = PostSerializer(post)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def remove_upvote_reply(request, id):
    """
    Remove an upvote from a specific reply.
    """
    try:
        reply = Reply.objects.get(id=id)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=404)

    if reply.upvotes > 0:
        reply.upvotes -= 1
        reply.save()

    serializer = ReplySerializer(reply)
    return Response(serializer.data, status=200)


@api_view(['DELETE'])
def delete_post(request, id):
    """
    Delete a specific post.
    """
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    post.delete()

    return Response({'message': 'Post deleted successfully'}, status=204)


@api_view(['DELETE'])
def delete_reply(request, id):
    """
    Delete a specific reply.
    """
    try:
        reply = Reply.objects.get(id=id)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found'}, status=404)

    reply.delete()

    return Response({'message': 'Reply deleted successfully'}, status=204)
