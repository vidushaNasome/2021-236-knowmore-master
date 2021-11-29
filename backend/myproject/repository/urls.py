from django.urls import include, path
from rest_framework import routers


from .views import  CreatedClusterViewSet, CreatedtopicViewSet, CreatedSessionViewSet

router = routers.DefaultRouter()
#router.register('repository', RepositaryViewSet, 'repository')
router.register('clustercreated', CreatedClusterViewSet, 'clustercreated')
router.register('createdtopic', CreatedtopicViewSet, 'createdtopic')
router.register('createdsession', CreatedSessionViewSet, 'createdsession')

urlpatterns = [
    path('', include(router.urls)),

]