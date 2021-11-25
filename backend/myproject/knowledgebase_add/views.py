
# Create your views here.
from pymongo.response import Response
from rest_framework import viewsets, permissions

from .models import Knowledgebase_add, KnowledgeMain, TopicMapKeywords
from .serializer import Knowledgebase_addSerializer, Knowledge_addSerializer, TopicMapKeywordsSerializer


class KnowledgeViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = Knowledge_addSerializer

    def get_queryset(self):
        queryset = KnowledgeMain.objects.all()
        #cid = self.request.query_params.get('cid', None)
        #tid = self.request.query_params.get('tid', None)
        sid = self.request.query_params.get('sid', None)
        student_id = self.request.query_params.get('stid', None)

        # id = self.request.query_params.get('id', None)

        if sid is not None:
            queryset = queryset.filter(session_id=sid,student_id=student_id)
        return queryset


class Knowledgebase_addViewSet(viewsets.ModelViewSet):

    pagination_classes = [permissions.AllowAny]
    serializer_class = Knowledgebase_addSerializer

    def get_queryset(self):
        queryset = Knowledgebase_add.objects.all()
        # cid = self.request.query_params.get('cid', None)
        # tid = self.request.query_params.get('tid', None)
        kid = self.request.query_params.get('kid', None)
        student_id = self.request.query_params.get('stid', None)

        # id = self.request.query_params.get('id', None)

        if kid is not None:
            #queryset = queryset.filter(knowledgeid=kid)
            queryset = queryset.filter(knowledgeid=kid, student_id=student_id)
        return queryset


def ff(pk):
    return 5
    #d = KnowledgeMain.objects.filter(id=pk)
    #s = Knowledge_addSerializer(d, many=True)
    #return Response(s.data)

class TopicMapKeywordsViewSet(viewsets.ModelViewSet):
    #queryset = TopicMapKeywords.objects.all()
    #serializer_class =TopicMapKeywordsSerializer
    pagination_classes = [permissions.AllowAny]
    serializer_class = TopicMapKeywordsSerializer

    def get_queryset(self):
        queryset = TopicMapKeywords.objects.all()
        sid = self.request.query_params.get('sid', None)
        if sid is not None:
            queryset = queryset.filter(session_id=sid)
        return queryset







