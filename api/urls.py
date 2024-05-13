"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from . import views  # Asegúrate de importar tus vistas

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('estudiantes.urls')),
    path('criterio_evaluacion/', include('criterio_evaluacion.urls')),
    path('grupo/', include ('grupo.urls')),
    path('cursos/', include('cursos.urls')),
    path('user/', include('estudiantes.urls')),
    path('evaluacion/', include('evaluacion.urls')),
    path('user/', include('profesor.urls')),
    path('rubrica/', include('rubrica.urls')),
    re_path(r'^loginProfesor/$', views.loginProfesor),
    re_path(r'^registerProfesor/$', views.registerProfesor),
    re_path(r'^login/$', views.login),
    re_path(r'^register/$', views.register),
    re_path(r'^profile/$', views.profile),
    re_path(r'^change/$', views.change_password),
    re_path(r'^changeE/$', views.change_passwordE),
    re_path(r'^logout/$', views.logout),
    re_path(r'^ProfileProfesor/$', views.profesorProfile),
    re_path(r'^profile/$', views.profile_student),
    re_path(r'^permisos/$', views.permissions),
    re_path(r'^change_email/$', views.change_email),
     re_path(r'^change_emailP/$', views.change_emaiP),
    re_path(r'^student_courses/$', views.student_courses),
    re_path('login', views.login),
    re_path('register', views.register),
        

]


