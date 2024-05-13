from rest_framework import serializers
from .models import informes

class informesSerializer(serializers.ModelSerializer):
    class Meta:
        model = informes
        fields = "__all__"
        