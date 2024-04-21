from django.contrib.auth import logout
from django.utils.text import slugify
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from users.models import User
from users.serializers import UserprofilePictureSerializer, UserRegistrationSerializer, UserSerializer, UsersSerializer

from .serializers import CustomTokenObtainSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer


class UserRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = User.objects.create_user(
                username=self._create_username(serializer.validated_data),
                email=serializer.validated_data["email"],
                password=serializer.validated_data["password"],
                first_name=serializer.validated_data["first_name"],
                last_name=serializer.validated_data["last_name"],
                dob=serializer.validated_data.get("dob"),
                gender=serializer.validated_data.get("gender"),
                latitude=serializer.validated_data.get("latitude"),
                longitude=serializer.validated_data.get("longitude"),
                image=serializer.validated_data.get("image"),
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


class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            user.dob = data["dob"]
            user.gender = data["gender"]
            user.latitude = data["latitude"]
            user.longitude = data["longitude"]
            user.description = data["description"]
            user.save()
            serializer_data = UserSerializer(user)
            return Response(serializer_data.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfilePictureView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def patch(self, request):
        user = request.user
        serializer = UserprofilePictureSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            user.image = data["image"]
            user.save()
            serializer_data = UserSerializer(user)
            return Response(serializer_data.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UsersSerializer
    queryset = User.objects.all()


class UserDetailView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UsersSerializer
    queryset = User.objects.all()
