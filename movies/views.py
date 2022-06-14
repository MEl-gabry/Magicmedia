from operator import ge
from django.http import JsonResponse
from rest_framework.parsers import FormParser, MultiPartParser
from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ObtainTokenSerializer, ProfileSerializer
from rest_framework import status

# Create your views here.

class LoginView(TokenObtainPairView):
    serializer_class = ObtainTokenSerializer

class ProfileListView(generics.ListAPIView):
    queryset = []
    serializer_class = ProfileSerializer

    def get_queryset(self):
        request = self.request
        email = request.query_params.get('email')
        try:
            user = User.objects.get(email=email)
        except:
            return self.queryset
        queryset = Profile.objects.filter(user=user)
        return queryset

    def get(self, validated_data):
        queryset = self.get_queryset()
        if queryset:
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        
        return JsonResponse({"error": "No (or an incorrect) email was provided"}, status=400)

class ListProfileView(generics.ListAPIView):
    queryset = []
    serializer_class = ProfileSerializer

    def get_queryset(self):
        request = self.request
        email = request.query_params.get('email')
        try:
            user = User.objects.get(email=email)
            id = request.query_params.get('id')
        except:
            return self.queryset
        queryset = Profile.objects.get(user=user, id=id)
        return queryset

    def get(self, validated_data):
        queryset = self.get_queryset()
        if queryset:
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
        
        return JsonResponse({"error": "No (or an incorrect) email was provided"}, status=400)

    
class ProfileCreateView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [FormParser, MultiPartParser]

    def post(self, request):
        data = request.data.dict()
        user = User.objects.get(pk=data.get('user'))
        if not data.get('image'):
            data.pop('image')
        try:
            Profile.objects.get(user=user, name=data.get('name'))
        except Profile.DoesNotExist:
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"success": "Profile was created!"}, status=201)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse({"fail": "Profile with the given name already exists."}, status=400)

class ProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [FormParser, MultiPartParser]

    def put(self, request):
        data = request.data.dict()
        image = data.get('image')
        user = User.objects.get(pk=data.get('user'))
        profile = Profile.objects.get(user=user, id=data.get('id'))
        if not image:
            data.pop('image')
        data.pop('id')
        serializer = self.serializer_class(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"success": "Profile was updated!"}, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
