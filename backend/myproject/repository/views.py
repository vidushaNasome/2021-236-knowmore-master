from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions

from .models import Repositary, CreatedCluster, Createdtopic, CreatedSession
from .serializer import RepositarySerializer, CreatedClusterSerializer, CreatedTopicSerializer, CreatedSessionSerializer


class RepositaryViewSet(viewsets.ModelViewSet):
    queryset = Repositary.objects.all()
    serializer_class = RepositarySerializer


class CreatedClusterViewSet(viewsets.ModelViewSet):
    #queryset = CreatedCluster.objects.all()
    #serializer_class = CreatedClusterSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = CreatedClusterSerializer

    def get_queryset(self):
        queryset = CreatedCluster.objects.all()
        sid = self.request.query_params.get('sid', None)

        if sid is not None:
            queryset = queryset.filter(schoolid=sid)
        return queryset


class CreatedtopicViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = CreatedTopicSerializer

    def get_queryset(self):
        queryset = Createdtopic.objects.all()
        id = self.request.query_params.get('id', None)

        if id is not None:
            queryset = queryset.filter(clusterid=id)
        return queryset


class CreatedSessionViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = CreatedSessionSerializer

    def get_queryset(self):
        queryset = CreatedSession.objects.all()
        cid = self.request.query_params.get('cid', None)
        tid = self.request.query_params.get('tid', None)

        #id = self.request.query_params.get('id', None)

        if cid is not None:
            queryset = queryset.filter(clusterid=cid, topicid=tid)
        return queryset
