from django.urls import path

from . import views

urlpatterns = [
    path('classes/', views.get_all_classes, name='get_all_classes'),
    path('classes/create/', views.create_class, name='create_class'),
    path('classes/<str:id>/', views.get_class, name='get_class'),
    path('classes/<str:id>/posts/',
         views.get_class_posts, name='get_classes_posts'),
    path('members/', views.get_all_members, name='get_all_members'),
    path('members/create/', views.create_member, name='create_member'),
    path('members/<str:id>/', views.get_member_info, name='get_member_info'),
    path('members/<str:id>/classes/',
         views.get_member_classes, name='get_member_classes'),
    path('posts/', views.get_all_posts, name='get_all_posts'),
    path('posts/create/', views.create_post, name='create_post'),
    path('posts/create/request/', views.create_post_request,
         name='create_post_request'),
    path('posts/replies/create/',
         views.create_reply, name='create_reply'),
    path('posts/<str:id>/', views.get_post, name='get_post'),
    path('posts/<str:post_id>/replies/',
         views.get_post_replies, name='get_post_replies'),
    path('replies/', views.get_all_replies, name='get_all_replies'),
    path('replies/<str:id>/', views.get_reply, name='get_reply'),
    path('login/', views.login, name='login'),
    path('session/', views.get_session_data),
]
