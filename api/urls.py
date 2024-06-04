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
    path('estudiantes/', include('estudiantes.urls')),
    path('profesor/', include('profesor.urls')),
    path('rubrica/', include('rubrica.urls')),
    path('estudiantes-deshabilitados/', views.estudiantes_deshabilitados, name='estudiantes_deshabilitados'),
    re_path(r'^loginProfesor/$', views.loginProfesor),
    re_path(r'^registerProfesor/$', views.registerProfesor),
    re_path(r'^login/$', views.login),
    re_path(r'^register/$', views.register),
    re_path(r'^profile/$', views.profile),
    re_path(r'^changeA/$', views.change_passwordA),
    re_path(r'^logout/$', views.logout),
    re_path(r'^ProfileProfesor/$', views.profesorProfile),
    re_path(r'^adminProfile/$', views.adminProfile),
    re_path(r'^profile/$', views.profile_student),
    re_path(r'^permisos/$', views.permissions),
    re_path(r'^change_email/$', views.change_email),
    re_path(r'^change_emailP/$', views.change_emaiP),
    re_path(r'^change_emailA/$', views.change_emailA),
    re_path(r'^student_courses/$', views.student_courses),
    re_path(r'^teacher_courses/$', views.teacher_courses),
    re_path(r'^login_admin/$', views.login_adminte),
    re_path(r'^import_cursos/$', views.import_cursos),
    re_path(r'^nuevo_profe/$', views.nuevo_profesor),
    re_path(r'^nuevo_curso/$', views.nuevo_curso),
    re_path(r'^editar_estado_estudiante/$', views.editar_estado_estudiante),
    re_path('login', views.login),
    re_path('register', views.register),
    re_path(r'^reset_password/$', views.PasswordResetRequestView),
    re_path(r'^reset_passwordConfirm/$', views.password_reset_confirm),
    re_path(r'^edit_profesor/$', views.editar_profesor),
    re_path(r'^profe_deshabilitado/$', views.profesores_deshabilitados),
    re_path(r'^profesores/$', views.profesores),
    re_path(r'^editEstado_profesor/$', views.editar_estado_profesor),
    re_path(r'^estudiantes/$', views.estudiantes),
    re_path(r'^Editar_estudiantes/$', views.editar_Student),
    re_path(r'^Editar_curso/$', views.editar_curso),
    re_path(r'^cursos/$', views.cursos),
    re_path(r'^Estadocursos/$', views.editar_estado_Curso),
    re_path(r'^cursos_deshabilitado/$', views.cursosDes),
    re_path(r'^import_estudiantes/$', views.import_estudiantes),
]


