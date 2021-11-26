from django.urls import include, path
from rest_framework import routers


from .views import  VideoViewSet, TeacherVideoViewSet
from .views_cluster import callvideoextraction, callvideoe_text_extraction, deleteimages_frames


router = routers.DefaultRouter()
router.register('Video', VideoViewSet, 'Video')
router.register('teachervideo', TeacherVideoViewSet, 'teachervideo')

urlpatterns = [
    path('', include(router.urls)),
    path('videoextract',callvideoextraction, name='callvideoextraction'),
    path('callvideoe_text_extraction',callvideoe_text_extraction, name='callvideoe_text_extraction'),
    path('deleteframes',deleteimages_frames, name='deleteframes'),

]