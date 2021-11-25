from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions

from .models import School
from .serializer import SchoolSerializer


class SchoolViewSet(viewsets.ModelViewSet):
    #queryset = School.objects.all()
    #serializer_class = SchoolSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = SchoolSerializer

    def get_queryset(self):
        queryset = School.objects.all()
        name = self.request.query_params.get('name', None)
        password = self.request.query_params.get('pw', None)
        if name is not None:
            queryset = queryset.filter(name=name, password=password)
        return queryset
