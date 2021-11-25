from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import KnowledgeMain, Knowledgebase_add


@api_view(['GET'])
def filter_session_knowledgebase_for_each_user(request, ssid=None, userid=None):
    sessionid = request.GET.get('ssid')
    userid = request.GET.get('userid')
    try:
        results_kid = KnowledgeMain.objects.filter(session_id=sessionid, student_id=userid)
        print(results_kid)

        for i in results_kid:
            det = i
            print('printing id:')
            print(det.id)

            results = Knowledgebase_add.objects.filter(knowledgeid=det.id, student_id=userid)
            print(results)

            for j in results:
                det_f = j
                print('printing score:')
                print(det_f.studentscore)

            return JsonResponse({'knowledgebase': round((det_f.studentscore / det_f.teacherscore)*100)})
    except:
        print('Error')

    return JsonResponse({'knowledgebase': 0})
