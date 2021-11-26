from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions

from .models import  VideoCluster, TeacherVideo
from .serializer import  VideoSerializer, TeacherVideoSerializer


"""class ClusterViewSet(viewsets.ModelViewSet):
    queryset = Cluster.objects.all()
    serializer_class = ClusterSerializer"""

class VideoViewSet(viewsets.ModelViewSet):
    #queryset = VideoCluster.objects.all()
    #serializer_class = VideoSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = VideoCluster.objects.all()
        sid = self.request.query_params.get('sid', None)
        stuid = self.request.query_params.get('stuid', None)

        if sid is not None:
            queryset = queryset.filter(sessionid=sid,studentid=stuid)
        return queryset

class TeacherVideoViewSet(viewsets.ModelViewSet):
    # queryset = VideoCluster.objects.all()
    # serializer_class = VideoSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class =  TeacherVideoSerializer

    def get_queryset(self):
        queryset = TeacherVideo.objects.all()
        sid = self.request.query_params.get('sid', None)

        if sid is not None:
            queryset = queryset.filter(sessionid=sid)
        return queryset


