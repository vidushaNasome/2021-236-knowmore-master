from django.urls import include, path
from rest_framework import routers

from .views import TeachersViewSet
from .teacher_login_view import jwt_token_login_teacher, jwt_token_validation_teacher, jwt_get_token_teacher

router = routers.DefaultRouter()
router.register('teachers', TeachersViewSet, 'teachers')

urlpatterns = [
    path('', include(router.urls)),
    path('token', jwt_token_login_teacher, name='token'),
    path('validation', jwt_token_validation_teacher, name='validation'),
    path('token_retrieve', jwt_get_token_teacher, name='token_retrieve'),

]