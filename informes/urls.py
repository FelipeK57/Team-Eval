import django
django.setup()
from django.urls import path, include
from rest_framework import routers
from grupo import views

router = routers.DefaultRouter()
router.register('informes', views.informesView, 'informes.views')

urlpatterns = [
    path('api/v1/', include(router.urls))
]