# bookmarked knowledgebase
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core import serializers
from search.models import ShareKnowledge


@api_view(['GET'])
def shared_my(request, userid=None):
    stid = request.GET.get('userid')

    queryset = ShareKnowledge.objects.filter(userid=stid)

    print('Inside Bookmark')

    if queryset is not None:
        data = serializers.serialize('json', queryset)

        return JsonResponse({'share': data})
