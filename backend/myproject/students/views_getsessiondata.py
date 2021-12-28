from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Reaction, AdditionalLink, AddComments, Fullvideo, StudentsAsUser


# Reactions Counts
@api_view(['GET'])
def filter_session_reaction_heart_count(request, ssid=None):
    sessionid = request.GET.get('ssid')
    results = Reaction.objects.filter(sessionid=sessionid, reactions='Heart').count()

    # print(len(results))
    # http: // 127.0.0.1: 8000 / students / f_s_heart_count?ssid = 1
    print(results)
    return JsonResponse({'msg': results})


@api_view(['GET'])
def filter_session_reaction_angry_count(request, ssid=None):
    sessionid = request.GET.get('ssid')
    results = Reaction.objects.filter(sessionid=sessionid, reactions='Angry').count()
    print(results)
    return JsonResponse({'msg': results})


@api_view(['GET'])
def filter_session_reaction_cry_count(request, ssid=None):
    sessionid = request.GET.get('ssid')
    results = Reaction.objects.filter(sessionid=sessionid, reactions='Cry').count()
    print(results)
    return JsonResponse({'msg': results})


@api_view(['GET'])
def filter_session_reaction_like_count(request, ssid=None):
    sessionid = request.GET.get('ssid')
    results = Reaction.objects.filter(sessionid=sessionid, reactions='Like').count()
    print(results)
    return JsonResponse({'msg': results})


# Model Data Counts for User -- 5 Variables

# Reactions
@api_view(['GET'])
def filter_session_reaction_for_each_user(request, ssid=None, userid=None):
    sessionid = request.GET.get('ssid')
    userid = request.GET.get('userid')
    results = Reaction.objects.filter(sessionid=sessionid, userid=userid).values()

    if len(results) is 0:
        return JsonResponse({'reactions': 0})

    print(results)

    if results[0]['reactions'] == 'Heart':
        return JsonResponse({'reactions': 4})
    elif results[0]['reactions'] == 'Cry':
        return JsonResponse({'reactions': 2})
    elif results[0]['reactions'] == 'Angry':
        return JsonResponse({'reactions': 3})
    elif results[0]['reactions'] == 'Like':
        return JsonResponse({'reactions': 1})



# Aditional Links
def filter_session_additionallinks_for_each_user(request, ssid=None, userid=None):
    sessionid = request.GET.get('ssid')
    userid = request.GET.get('userid')
    results = AdditionalLink.objects.filter(sessionid=sessionid, userid=userid).count()

    return JsonResponse({'additionallinks': results})


# Comments
def filter_session_comments_for_each_user(request, ssid=None, userid=None):
    sessionid = request.GET.get('ssid')
    userid = request.GET.get('userid')
    results = AddComments.objects.filter(sessionid=sessionid, userid=userid).count()

    return JsonResponse({'comments': results})

# Sharing Knowledgebase
##for now added only random value **********added in my knowledgebase
"""def filter_session_knowledgebase_for_each_user(request, ssid=None, userid=None):
    sessionid = request.GET.get('ssid')
    userid = request.GET.get('userid')
    #results = AddComments.objects.filter(sessionid=sessionid, userid=userid).count()

    return JsonResponse({'knowledgebase': 20})"""


# Video View
##for now added only random value
def filter_session_videoview_for_each_user(request, ssid=None, userid=None):
    sessionid = request.GET.get('ssid')
    userid = request.GET.get('userid')
    results = Fullvideo.objects.filter(sessionid=sessionid, userid=userid).values()

    if len(results) == 0:
        print('Not Found')
    else:
        return JsonResponse({'videoview': 1})


#clusters recieved
@api_view(['GET'])
def user_specified_clusters(request, id=None):
    sid = request.GET.get('id')

    SC=request.META['HTTP_AUTHORIZATION'] 

    queryset = StudentsAsUser.objects.filter(id=sid,secret=SC)

    for i in queryset:
        return JsonResponse({'clusters': i.clusterIds})
        #   return i
        #print(results)
    return JsonResponse({'clusters': "0"})


