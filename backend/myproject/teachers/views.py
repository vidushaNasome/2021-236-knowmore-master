from django.views.generic import DetailView
from rest_framework import viewsets, permissions


from .models import Teachers
from .serializers import TeachersSerializer


class TeachersViewSet(viewsets.ModelViewSet):
    #queryset = Teachers.objects.all()
    #serializer_class = TeachersSerializer

    pagination_classes = [permissions.AllowAny]
    serializer_class = TeachersSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        name = self.request.query_params.get('name', None)
        password = self.request.query_params.get('pw', None)
        if name is not None:
            queryset = queryset.filter(name=name, password=password)
        return queryset

