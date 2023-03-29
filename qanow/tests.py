from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from .models import Class, Member, Post, Reply


class EndpointTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            'test@example.com', 'test@example.com', 'password')
        self.member = Member.objects.create(
            user=self.user, member_type='STUDENT')
        self.class_ = Class.objects.create(class_section='Test Class')
        self.post = Post.objects.create(
            member_id=self.member, prompt='Test Prompt')
        self.reply = Reply.objects.create(
            member_id=self.member, prompt='Test Prompt')

    def test_get_all_classes(self):
        url = reverse('get_all_classes')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_class(self):
        url = reverse('get_class', args=[self.class_.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_class(self):
        url = reverse('create_class')
        data = {'class_section': 'New Class',
                'csrfmiddlewaretoken': get_token(self.client.cookies)}
        csrf_token = get_token(self.client.cookies)
        response = self.client.post(url, data, HTTP_X_CSRFTOKEN=csrf_token)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_members(self):
        url = reverse('get_all_members')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_member_info(self):
        url = reverse('get_member_info', args=[self.member.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_member(self):
        url = reverse('create_member')
        data = {'email': 'new@example.com', 'password': 'password'}
        csrf_token = get_token(self.client.cookies)
        response = self.client.post(url, data, HTTP_X_CSRFTOKEN=csrf_token)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        url = reverse('login')
        data = {'email': 'test@example.com', 'password': 'password'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_posts(self):
        url = reverse('get_all_posts')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_post(self):
        url = reverse('get_post', args=[self.post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        url = reverse('create_post')
        data = {'member_id': self.member.id, 'prompt': 'New Post'}
        csrf_token = get_token(self.client.cookies)
        response = self.client.post(url, data, HTTP_X_CSRFTOKEN=csrf_token)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
