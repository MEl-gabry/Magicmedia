from django.urls import path
from .views import LoginView

urlpatterns = [
    path('login-token/', LoginView.as_view(), name='login-token')
]