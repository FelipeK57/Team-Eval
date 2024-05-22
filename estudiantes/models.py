from django.db import models
from django.contrib.auth.models import User

class Estudiante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=20)
    estado = models.BooleanField(default=True, null=False)
    
    def courses_student(self):
        courses = self.cursos_set.all()
        courses_s = []
        
        for course in courses:
            courses_s.append(course)
        return courses_s
    
    def __str__(self):
        return self.user.username
    
    @classmethod
    def deshabilitados(cls):
        return cls.objects.filter(estado=False)
    
    @classmethod
    def estudiantes(cls):
        return cls.objects.filter(estado=True)