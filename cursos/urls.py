from django.urls import path, include
from rest_framework import routers
from cursos import views

router = routers.DefaultRouter()
router.register('cursos', views.CursosView, 'cursos.views')

urlpatterns = [
    path('all/', include(router.urls))
]