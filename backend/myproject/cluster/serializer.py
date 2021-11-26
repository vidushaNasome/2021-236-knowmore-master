# categories serializer
from rest_framework import serializers
from .models import  VideoCluster, TeacherVideo
# from .KeyFrameExtraction import frameExtracted

from rest_framework.decorators import api_view


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCluster
        fields = '__all__'


class TeacherVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherVideo
        fields = '__all__'
