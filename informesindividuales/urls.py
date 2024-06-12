import django
django.setup()
from django.urls import path, include
from rest_framework import routers
from informesindividuales import views

router = routers.DefaultRouter()
router.register('informes_individuales', views.InformesIndividualesView, 'informesindividuales.views')

urlpatterns = [
    path('api/v1/', include(router.urls))
]