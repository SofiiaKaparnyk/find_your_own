from django.urls import path

from users import views

from rest_framework_simplejwt import views as jwt_views

urlpatterns = [

    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(),  name='token_refresh'),

    path("register/", views.UserRegisterView.as_view(), name="register"),
    path("logout/", views.UserLogout.as_view(), name="logout"),

    path("profile/<user_id>/", views.UserProfileView.as_view(), name="users"),
]
