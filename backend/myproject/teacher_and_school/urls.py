from django.urls import include, path
from rest_framework import routers


from .views import SchoolViewSet

router = routers.DefaultRouter()
router.register('School', SchoolViewSet, 'School')

urlpatterns = [
    path('', include(router.urls)),

]