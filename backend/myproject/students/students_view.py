from django.http import JsonResponse
# from rest_framework import status, serializers
from rest_framework.decorators import api_view
# from .KeyFrameExtraction import frameExtracted
from rest_framework.response import Response
from django.core import serializers

from .models import ModelOutput


@api_view(['GET'])
def mostactivestudent(request, sessionid=None):
    sessionid = request.GET.get('sessionid')
    print('Hello i am in most active')
    print('most activeddddd' + str(sessionid))

    queryset = ModelOutput.objects.filter(sessionid=sessionid)

    mostactive_arra = []
    i = 0

    ll = len(queryset) - 1
    print('print array length:')
    print(ll)

    print('Looping Started')

    mostactive = queryset[i].MostActive

    while i < ll:

        print(i)
        print(mostactive)
        print(queryset[i+1].MostActive)

        if mostactive == queryset[i + 1].MostActive:
            print('value ==')
            print(mostactive)
        elif mostactive > queryset[i + 1].MostActive:
            print('value i is Bigger')
            print(mostactive)
        else:
            mostactive = queryset[i + 1].MostActive
            print('value i is smaller')
            print(mostactive)

        print('new turn')

        i = i + 1

    print('End Looping')
    if len(queryset) == 1:
        # print(queryset)
        mostactive = queryset[0].MostActive

    print('final')
    print(mostactive)
    print(sessionid)
    queryset1 = ModelOutput.objects.filter(MostActive=mostactive, sessionid=sessionid)

    data = serializers.serialize('json', queryset1)
    # return HttpResponse(data, content_type="application/json")

    return JsonResponse({'mostactive': data})
