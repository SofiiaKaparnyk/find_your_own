from django.contrib.auth import authenticate, login, logout
from django.utils.text import slugify
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserLoginSerializer, UserRegistrationSerializer, UserSerializer


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = User.objects.create_user(
                username=self._create_username(serializer.validated_data),
                first_name=serializer.validated_data["first_name"],
                last_name=serializer.validated_data["last_name"],
                email=serializer.validated_data["email"],
                password=serializer.validated_data["password"],
            )
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def _create_username(self, data):
        # Generate a unique username based on the user's first name and last name
        base_username = slugify(f"{data['first_name']}-{data['last_name']}")
        username = base_username
        suffix = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}-{suffix}"
            suffix += 1
        return username


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = authenticate(
                email=serializer.validated_data["email"], password=serializer.validated_data["password"]
            )
            if not user:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_403_FORBIDDEN)
            login(request, user)
            return Response(status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)
