from rest_framework import serializers
from .models import criterio_Evaluacion

class criterio_EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = criterio_Evaluacion
<<<<<<< HEAD
        fields = "__all__"
=======
        fields = '__all__'
>>>>>>> origin/front_back_sebas
