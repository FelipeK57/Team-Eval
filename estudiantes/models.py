from django.db import models
from django.contrib.auth.models import User

class Estudiante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=20)
    
    def cursos_inscritos(self):
        grupos = self.grupo_set.all()
        cursos = []
        
        for grupo in grupos:
            cursos_grupo = grupo.cursos_set.all()
            cursos.extend(cursos_grupo)
        return cursos
    
    def __str__(self):
        return self.user.username