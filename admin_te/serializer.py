from rest_framework import serializers
from .models import Admin_Te

class AdminTeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin_Te
        fields = '__all__'