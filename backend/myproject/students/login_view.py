##Need to add returning a jwt token
from django.http import JsonResponse
import jwt
from rest_framework.decorators import api_view
from .models import StudentsAsUser 
import json
from django.core.serializers.json import DjangoJSONEncoder

@api_view(['GET'])
def jwt_token_login(request, name=None, pw=None):
   
    name = request.GET.get('name')
    password = request.GET.get('pw')
    queryset = StudentsAsUser.objects.filter(name=name, password=password)
    # print(queryset)
    for x in queryset:
        print(x.image)
        encoded = jwt.encode({'studentId': x.id, 'image':json.dumps(str(x.image)), 'Username':x.name}, 'MySecretKey', algorithm='HS256')
        print(encoded)
        return JsonResponse({'token': encoded})

    return JsonResponse({'token': 'Error'})
    