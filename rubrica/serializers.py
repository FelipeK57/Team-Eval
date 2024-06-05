from rest_framework import serializers
from .models import rubrica_Evaluacion
from criterio_evaluacion.serializers import criterio_EvaluacionSerializer

class rubrica_EvaluacionSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    criterios = criterio_EvaluacionSerializer(many=True)    
=======
    criterios = criterio_EvaluacionSerializer(many=True)
>>>>>>> origin/Cositas-ADMIN
    class Meta:
        model = rubrica_Evaluacion
        fields = '__all__'