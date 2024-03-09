from django.db import models

from project import settings


class Event(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=150, null=True, blank=True)
    date = models.DateTimeField()
    image = models.ImageField(null=True, blank=True, upload_to="events")
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
