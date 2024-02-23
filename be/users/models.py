from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True)
    email = models.EmailField(_("email address"), unique=True, max_length=100)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    # dob = models.DateField(required=True)
    # gender = models.CharField(required=True, max_length=1)
    # # location # TODO ?
    # description = models.CharField(null=True, max_length=500)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
