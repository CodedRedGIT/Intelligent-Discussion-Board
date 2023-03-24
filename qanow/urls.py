from django.urls import path

from . import views

urlpatterns = [
    path('questions/', views.get_all_questions, name='all_questions'),
    path('questions/<str:id>/', views.get_question, name='get_question'),
    path('login/', views.login, name='login_api'),
    path('create_user/', views.create_user, name='create_user'),
]