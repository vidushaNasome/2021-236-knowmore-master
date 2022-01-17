##Need to add returning a jwt token
from django.http import JsonResponse

from rest_framework.decorators import api_view
from .models import StudentsAsUser 
import json
from django.core.serializers.json import DjangoJSONEncoder
import random
import jwt

@api_view(['GET'])
def jwt_token_login(request, name=None, pw=None):
   
    name = request.GET.get('name')
    password = request.GET.get('pw')
    queryset = StudentsAsUser.objects.filter(name=name, password=password)

    for x in queryset:
        print(x.image)
        #secret needs to be handled
        #n_secret = random.randint(1000,100000)
        #print(n_secret)
        print('secret...................')
       # print(request.META['HTTP_AUTHORIZATION'])

        #genratating jwt token and send
        encoded = jwt.encode({'studentId': x.id, 'image':json.dumps(str(x.image)), 'Username':x.name, 'secret':x.secret}, 'MySecretKey1', algorithm='HS256')

       # encoded = jwt.encode({'studentId': 1, 'image':'hello', 'Username':'example', 'secret':'111'}, 'MySecretKey1', algorithm='HS256')
        print(encoded)

        #updating in student user table
        #StudentsAsUser.objects.filter(id = x.id).update(secret = n_secret)
        #print(x.id)

        return JsonResponse({'token': encoded})

    return JsonResponse({'token': 'Incorrect Username or Password'})


@api_view(['GET'])
def jwt_token_validation(request, id=None):
    sid = request.GET.get('id')
    #secret = request.GET.get('sct')

    print('secret...................')
    print(request.META['HTTP_AUTHORIZATION'])

    SC=request.META['HTTP_AUTHORIZATION']

    queryset = StudentsAsUser.objects.filter(id=sid,secret=SC)

    for x in queryset:
        return JsonResponse({'validation': 'true'})

    return JsonResponse({'validation': 'false'})


@api_view(['GET'])
def jwt_get_token(request, id=None):
   
    id = request.GET.get('id')
    queryset = StudentsAsUser.objects.filter(id=id)

    for x in queryset:
        print(x.image)
        #secret needs to be handled
        #n_secret = random.randint(1000,100000)
        #print(n_secret)
        print('secret...................')
       # print(request.META['HTTP_AUTHORIZATION'])

        #genratating jwt token and send
        encoded = jwt.encode({'studentId': x.id, 'image':json.dumps(str(x.image)), 'Username':x.name, 'secret':x.secret}, 'MySecretKey1', algorithm='HS256')

       # encoded = jwt.encode({'studentId': 1, 'image':'hello', 'Username':'example', 'secret':'111'}, 'MySecretKey1', algorithm='HS256')
        print(encoded)

        #updating in student user table
        #StudentsAsUser.objects.filter(id = x.id).update(secret = n_secret)
        #print(x.id)

        return JsonResponse({'token': encoded})

    return JsonResponse({'token': 'Error'})


    