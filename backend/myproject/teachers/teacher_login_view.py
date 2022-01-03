from django.http import JsonResponse
import jwt
from rest_framework.decorators import api_view
from .models import Teachers 
import json
from django.core.serializers.json import DjangoJSONEncoder
import random

@api_view(['GET'])
def jwt_token_login_teacher(request, name=None, pw=None):
   
    name = request.GET.get('name')
    password = request.GET.get('pw')
    queryset = Teachers.objects.filter(name=name, password=password)

    for x in queryset:
        print(x.image)
        print('secret...................')
        #genratating jwt token and send
        encoded = jwt.encode({'teacherId': x.id, 'image':json.dumps(str(x.image)), 'Username':x.name, 'secret':x.secret}, 'MySecretKey2', algorithm='HS256')
        print(encoded)
        return JsonResponse({'token': encoded})

    return JsonResponse({'token': 'Incorrect Username or Password'})


@api_view(['GET'])
def jwt_token_validation_teacher(request, id=None):
    tid = request.GET.get('id')
    #secret = request.GET.get('sct')

    print('secret...................')
    print(request.META['HTTP_AUTHORIZATION'])

    SC=request.META['HTTP_AUTHORIZATION']

    queryset = Teachers.objects.filter(id=tid,secret=SC)

    for x in queryset:
        return JsonResponse({'validation': 'true'})

    return JsonResponse({'validation': 'false'})


@api_view(['GET'])
def jwt_get_token_teacher(request, id=None):
   
    id = request.GET.get('id')
    queryset = Teachers.objects.filter(id=id)

    for x in queryset:
        print(x.image)
        print('secret...................')
        #genratating jwt token and send
        encoded = jwt.encode({'teacherId': x.id, 'image':json.dumps(str(x.image)), 'Username':x.name, 'secret':x.secret}, 'MySecretKey2', algorithm='HS256')

       # encoded = jwt.encode({'studentId': 1, 'image':'hello', 'Username':'example', 'secret':'111'}, 'MySecretKey1', algorithm='HS256')
        print(encoded)
        return JsonResponse({'token': encoded})

    return JsonResponse({'token': 'Error'})
