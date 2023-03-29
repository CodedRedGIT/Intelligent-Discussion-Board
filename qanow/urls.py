from django.urls import path

from . import views

urlpatterns = [
    path('classes/', views.get_all_classes),
    path('classes/<str:id>/', views.get_class),
    path('members/', views.get_all_members),
    path('members/<str:id>/', views.get_member_info),
    path('posts/', views.get_all_posts),
    path('posts/<str:id>/', views.get_post),
    path('posts/<str:post_id>/replies/', views.get_post_replies),
    path('replies/', views.get_all_replies),
    path('replies/<str:id>/', views.get_reply),
    path('login/', views.login),
    path('create_user/', views.create_user),
]
