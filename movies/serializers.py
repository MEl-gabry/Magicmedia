from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import User, Profile
from .helpers import validateEmail
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
from djoser.conf import settings
from django.db import IntegrityError, transaction

# Serializers
class MoviesUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = {'id', 'email', 'username', 'password'}

class ObtainTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        userName = attrs.get("email")
        password = attrs.get("password")

        if not validateEmail(userName):
            try:
                user = User.objects.get(name=userName)
                if user.check_password(password):
                    attrs['email'] = user.email
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed(
                    'No such user with provided credentials'.title()) 
        
        data = super().validate(attrs)
        return data