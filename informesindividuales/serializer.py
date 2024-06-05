from rest_framework import serializers
from .models import InformesIndividuales

class InformesIndividualesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformesIndividuales
        fields = "__all__"
        