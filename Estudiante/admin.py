from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profesor

class ProfileInline(admin.StackedInline):
    model = Profesor
    can_delete = False
    verbose_name_plural = 'Profesor'


admin.site.site_header = 'Administración de Profesores'  # Cambia el nombre del header del admin
admin.site.site_title = 'Panel de Profesores'  # Cambia el título de la página del admin
admin.site.register(Profesor)