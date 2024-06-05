from django.contrib.auth.models import User
from django.db import models

class Profesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.PositiveIntegerField(null=True)
    identificacion = models.PositiveBigIntegerField(null=True)
    estado = models.BooleanField(default=True, null=False)
    autor = models.CharField(max_length=50,null=True)

    def courses_teacher(self):
        courses = self.cursos_set.all()
        courses_t = []
        
        for course in courses:
            courses_t.append(course)
        return courses_t
    
    @classmethod
    def deshabilitados(cls):
        return cls.objects.filter(estado=False)
            
    def __str__(self):
        return self.user.username 

