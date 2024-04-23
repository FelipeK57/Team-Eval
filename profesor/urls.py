from django.contrib import admin
from django.urls import path, re_path,include
from . import views
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'profesor', views.profesorViewSet, 'profesor.views')   

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title="Profesor API"))
]