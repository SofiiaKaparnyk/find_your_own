from django.urls import path

from events import views

urlpatterns = [
    path("", views.EventsListView.as_view(), name="events"),
    path("event/", views.EventDetailView.as_view(), name="event-detail"),
    path("event/<int:pk>", views.EventDetailView.as_view(), name="event-detail"),
]
