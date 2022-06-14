from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import User, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
from djoser.conf import settings
from django.db import IntegrityError, transaction

# Serializers
class MoviesUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = {'id', 'email', 'username', 'password'}

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ObtainTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        userName = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=userName)
        except User.DoesNotExist:
            try: 
                user = User.objects.get(name=userName)
                if user.check_password(password):
                    attrs['email'] = user.email
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed(
                    'No such user with provided credentials'.title()) 

        try:
            Profile.objects.filter(user=user)
        except Profile.DoesNotExist:
            Profile.objects.create(name=user.name, user=user)

        data = super().validate(attrs)
        return data