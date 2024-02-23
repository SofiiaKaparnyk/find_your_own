from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from users import views

urlpatterns = [
    path("", views.UsersView.as_view(), name="users"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.UserRegisterView.as_view(), name="register"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
    path("profile/", views.UserProfileView.as_view(), name="user-profile"),
]
