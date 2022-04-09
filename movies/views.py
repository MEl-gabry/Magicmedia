from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ObtainTokenSerializer

# Create your views here.
class LoginView(TokenObtainPairView):
    serializer_class = ObtainTokenSerializer