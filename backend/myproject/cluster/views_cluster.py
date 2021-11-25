from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
# from .KeyFrameExtraction import frameExtracted
from rest_framework.response import Response

from .KeyFrameExtraction import extractframesfromvideo, reduncdancyRemover
from .keywords import text_extract
from .models import VideoCluster
from .serializer import VideoSerializer


# APIs for get methods for text extraction from video images

@api_view(['GET'])
def callvideoextraction(request, ssid=None, videoname=None, stuid=None):
    sessionid = request.GET.get('ssid')
    videoname = request.GET.get('videoname')
    stuid = request.GET.get('stuid')
    print(sessionid)

    extractframesfromvideo(sessionid, videoname, stuid)
    ww = reduncdancyRemover(sessionid, videoname, stuid)

    return JsonResponse({'msg': ww})


@api_view(['GET'])
def callvideoe_text_extraction(request, ssid=None, videoname=None, userid=None):
    sessionid = request.GET.get('ssid')
    videoname = request.GET.get('videoname')
    uid = request.GET.get('userid')

    data = text_extract(sessionid, videoname, uid)

    return JsonResponse({'msg': data})


@api_view(['GET'])
def deleteimages_frames(request, userid=None, sesid=None, deleteframe=None):
    global det
    sessionid = request.GET.get('sesid')
    uid = request.GET.get('userid')
    deleteframe = request.GET.get('deleteframe')

    try:
        results = VideoCluster.objects.filter(sessionid=sessionid, studentid=uid)

        for i in results:
            det = i
            print(det.sessionid)

    except VideoCluster.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    allkeyframes = det.imageslist

    # finding and removing the string
    remove_keyframe = str(',"') + deleteframe + str('"')
    print(remove_keyframe)
    x = allkeyframes.find(remove_keyframe)
    print(x)

    if x == -1:
        remove_keyframe = str('"') + deleteframe + str('",')
        print(remove_keyframe)

    final_frames = allkeyframes.replace(remove_keyframe, "", 1)
    print(final_frames)

    #delete from list

    det.imageslist = final_frames
    serializer = VideoSerializer(det, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
