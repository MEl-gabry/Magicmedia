from django.urls import path
from . import views

urlpatterns = [
    path('login-token/', views.LoginView.as_view()),
    path('profile', views.ListProfileView.as_view()),
    path('profiles', views.ProfileListView.as_view()),
    path('create-profile', views.ProfileCreateView.as_view()),
    path('update-profile', views.ProfileUpdateView.as_view())
]