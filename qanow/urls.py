from django.urls import path

from . import views

urlpatterns = [
    path('questions/', views.get_all_questions, name='all_questions'),
    path('questions/<str:id>/', views.get_question, name='get_question'),
]