from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class EventUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

    def update(self, instance, validated_data):
        # Exclude 'id' and 'user' fields from update
        validated_data.pop("id", None)
        validated_data.pop("user", None)
        return super().update(instance, validated_data)
