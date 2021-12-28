from django.urls import include, path
from rest_framework import routers

from .models import ModelOutput
from .students_view import mostactivestudent
from .views import CategoriesViewSet, StudentAsUserViewSet, MyClassMatesViewSet, ModelOutputViewSet, AddCommentsViewSet, \
    AdditionalLinkViewSet, ReactionViewSet, AllreactionsViewSet, newsfeed_badgeViewSet, Fullvideo_ViewSet
from .views_getsessiondata import filter_session_reaction_heart_count, filter_session_reaction_angry_count, \
    filter_session_reaction_cry_count, filter_session_reaction_like_count, filter_session_reaction_for_each_user, \
    filter_session_additionallinks_for_each_user, filter_session_comments_for_each_user, \
    filter_session_videoview_for_each_user,user_specified_clusters

from .login_view import jwt_token_login, jwt_token_validation, jwt_get_token

router = routers.DefaultRouter()
router.register('Categories', CategoriesViewSet, 'Categories')
router.register('StudentsAsUser', StudentAsUserViewSet, 'StudentsAsUser')
router.register('Myclassmates', MyClassMatesViewSet, 'Myclassmates')
router.register('ModelOutput', ModelOutputViewSet, 'ModelOutput')
router.register('AddComments', AddCommentsViewSet, 'AddComments')
router.register('AdditionalLink', AdditionalLinkViewSet, 'AdditionalLink')
router.register('Reaction', ReactionViewSet, 'Reaction')
router.register('Allreactions', AllreactionsViewSet, 'Allreactions')
router.register('badgenewfeed', newsfeed_badgeViewSet, 'newsfeed_badge')
router.register('Fullvideo', Fullvideo_ViewSet, 'Fullvideo')

urlpatterns = [
    path('', include(router.urls)),
    path('mostactive', mostactivestudent, name='mostactive'),
    path('f_s_heart_count', filter_session_reaction_heart_count, name='f_s_heart_count'),
    path('f_s_angry_count', filter_session_reaction_angry_count, name='f_s_angry_count'),
    path('f_s_cry_count', filter_session_reaction_cry_count, name='f_s_cry_count'),
    path('f_s_like_count', filter_session_reaction_like_count, name='f_s_like_count'),
    path('user_reaction', filter_session_reaction_for_each_user, name='user_reaction'),
    path('user_additionallinks', filter_session_additionallinks_for_each_user, name='user_additionallinks'),
    path('user_comments', filter_session_comments_for_each_user, name='user_comments'),
    # path('user_knowledgebase',filter_session_knowledgebase_for_each_user, name='user_knowledgebase'),
    path('user_videoview', filter_session_videoview_for_each_user, name='user_videoview'),
    path('token', jwt_token_login, name='token'),
    path('validation', jwt_token_validation, name='validation'),
    path('token_retrieve', jwt_get_token, name='token_retrieve'),
    path('retrieve_clusters', user_specified_clusters, name='retrieve_clusters'),


]
