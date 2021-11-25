from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions

from .models import Categories, StudentsAsUser, MyClassMates, ModelOutput, AddComments, AdditionalLink, Reaction, \
    Allreactions, newsfeed_badge, Fullvideo
from .serializer import CategoriesSerializer, StudentsasUserSerializer, MyClassMatesSerializer, ModelOutputSerializer, \
    AddCommentsSerializer, AdditionalLinkSerializer, ReactionSerializer, AllreactionsSerializer, \
    newsfeed_badgeSerializer, Fullvideo_Serializer


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class StudentAsUserViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = StudentsasUserSerializer

    def get_queryset(self):
        queryset = StudentsAsUser.objects.all()
        name = self.request.query_params.get('name', None)
        password = self.request.query_params.get('pw', None)
        if name is not None:
            queryset = queryset.filter(name=name, password=password)
        return queryset


class MyClassMatesViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = MyClassMatesSerializer

    def get_queryset(self):
        queryset = MyClassMates.objects.all()
        mid = self.request.query_params.get('mid', None)

        if mid is not None:
            queryset = queryset.filter(mid=mid)
        return queryset


class ModelOutputViewSet(viewsets.ModelViewSet):
    # queryset = ModelOutput.objects.all()
    # serializer_class = ModelOutputSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = ModelOutputSerializer

    def get_queryset(self):
        queryset = ModelOutput.objects.all()
        stid = self.request.query_params.get('stid', None)
        sid = self.request.query_params.get('ssid', None)
        if sid is not None:
            queryset = queryset.filter(userid=stid, sessionid=sid)
        return queryset


class AddCommentsViewSet(viewsets.ModelViewSet):
    # queryset = AddComments.objects.all()
    # serializer_class = AddCommentsSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = AddCommentsSerializer

    def get_queryset(self):
        queryset = AddComments.objects.all()
        sessid = self.request.query_params.get('sessid', None)

        if sessid is not None:
            queryset = queryset.filter(sessionid=sessid)
        return queryset


class AdditionalLinkViewSet(viewsets.ModelViewSet):
    # queryset = AddComments.objects.all()
    # serializer_class = AddCommentsSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = AdditionalLinkSerializer

    def get_queryset(self):
        queryset = AdditionalLink.objects.all()
        sessid = self.request.query_params.get('sessid', None)

        if sessid is not None:
            queryset = queryset.filter(sessionid=sessid)
        return queryset


class ReactionViewSet(viewsets.ModelViewSet):
    # queryset = AddComments.objects.all()
    # serializer_class = AddCommentsSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = ReactionSerializer

    def get_queryset(self):
        queryset = Reaction.objects.all()
        sessid = self.request.query_params.get('sessid', None)
        userid = self.request.query_params.get('userid', None)

        if sessid is not None and userid is not None:
            queryset = queryset.filter(sessionid=sessid, userid=userid)
        return queryset


class AllreactionsViewSet(viewsets.ModelViewSet):
    # queryset = Allreactions.objects.all()
    # serializer_class = AllreactionsSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = AllreactionsSerializer

    def get_queryset(self):
        queryset = Reaction.objects.all()
        sessid = self.request.query_params.get('sessid', None)
        userid = self.request.query_params.get('userid', None)
        print('hello1')

        if sessid is not None and userid is not None:
            print('hello2')
            queryset = queryset.filter(sessionid=sessid, userid=userid)

        return queryset


class newsfeed_badgeViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = newsfeed_badgeSerializer

    def get_queryset(self):
        queryset = newsfeed_badge.objects.all()

        userid = self.request.query_params.get('userid', None)

        if userid is not None:
            queryset = queryset.filter(studentid=userid)
        return queryset

class Fullvideo_ViewSet(viewsets.ModelViewSet):
    pagination_classes = [permissions.AllowAny]
    serializer_class = Fullvideo_Serializer

    def get_queryset(self):
        queryset = Fullvideo.objects.all()

        userid = self.request.query_params.get('userid', None)

        if userid is not None:
            queryset = queryset.filter(studentid=userid)
        return queryset