from django.urls import include, path
from rest_framework import routers

from .knowladgebase_score import filter_session_knowledgebase_for_each_user
from .views import Knowledgebase_addViewSet, KnowledgeViewSet, TopicMapKeywordsViewSet

router = routers.DefaultRouter()
router.register('knowledgebase', Knowledgebase_addViewSet, 'knowledgebase')
router.register('knowledge', KnowledgeViewSet, 'knowledge')
router.register('knowledgetopicmapkeywords', TopicMapKeywordsViewSet, 'knowledgetopicmapkeywords')

urlpatterns = [
    path('', include(router.urls)),
    path('know_score',filter_session_knowledgebase_for_each_user, name='know_score'),
    #path('now/<int:pk>/', ff, name='session'),


]