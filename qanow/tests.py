from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Class


class ClassAPITestCase(APITestCase):
    def setUp(self):
        # Create some sample data for testing
        Class.objects.create(name='Math', code='MATH101')
        Class.objects.create(name='Science', code='SCI201')

    def test_get_classes(self):
        # Make a GET request to the get_classes endpoint
        client = APIClient()
        url = reverse('get_classes')
        response = client.get(url, format='json')

        # Check that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response data matches the expected output
        expected_data = [
            {'id': 1, 'name': 'Math', 'code': 'MATH101'},
            {'id': 2, 'name': 'Science', 'code': 'SCI201'}
        ]
        self.assertEqual(response.data, expected_data)
