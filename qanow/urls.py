from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.get_all_posts, name='all_posts'),
    path('posts/<str:id>/', views.get_post, name='get_post'),
    path('login/', views.login, name='login_api'),
    path('create_user/', views.create_user, name='create_user'),
    path('get_classes/', views.get_classes, name='get_classes'),
]
