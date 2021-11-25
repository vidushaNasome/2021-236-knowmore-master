from django.urls import include, path
from rest_framework import routers


from .views import ClusterViewSet, VideoViewSet, TeacherVideoViewSet
from .views_cluster import callvideoextraction, callvideoe_text_extraction, deleteimages_frames

# Added URLs for text extracting

router = routers.DefaultRouter()
router.register('cluster', ClusterViewSet, 'cluster')
router.register('Video', VideoViewSet, 'Video')
router.register('teachervideo', TeacherVideoViewSet, 'teachervideo')

urlpatterns = [
    path('', include(router.urls)),
    path('videoextract',callvideoextraction, name='callvideoextraction'),
    path('callvideoe_text_extraction',callvideoe_text_extraction, name='callvideoe_text_extraction'),
    path('deleteframes',deleteimages_frames, name='deleteframes'),

]