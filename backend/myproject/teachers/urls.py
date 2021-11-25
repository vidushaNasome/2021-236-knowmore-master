from django.urls import include, path
from rest_framework import routers

from .views import TeachersViewSet

router = routers.DefaultRouter()
router.register('teachers', TeachersViewSet, 'teachers')

urlpatterns = [
    path('', include(router.urls)),

]