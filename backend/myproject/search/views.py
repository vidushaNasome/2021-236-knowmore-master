from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions

from .models import Searchdb, ShareKnowledge
from .serializer import SearchdbSerializer, ShareKnowledgeSerializer


class SearchdbViewSet(viewsets.ModelViewSet):
    # queryset = Searchdb.objects.all()
    # serializer_class = SearchdbSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = SearchdbSerializer

    def get_queryset(self):
        queryset = Searchdb.objects.all()

        # get query
        stid = self.request.query_params.get('stid', None)
        sid = self.request.query_params.get('sid', None)
        kid = self.request.query_params.get('kid', None)
        ms = self.request.query_params.get('ms', None)

        if kid is not None:
            queryset = queryset.filter(userid=stid, sessionid=sid, knid=kid, membersince=ms)
        return queryset


class ShareKnowledgeViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = ShareKnowledgeSerializer

    def get_queryset(self):
        queryset = ShareKnowledge.objects.all()

        stid = self.request.query_params.get('stid', None)

        if stid is not None:
            queryset = queryset.filter(userid=stid)
        return queryset
