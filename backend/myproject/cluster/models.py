from django.db import models

## This folder is used to add video and add unique key frames and text file based on the video.

def get_upload_to(instance, filename):
    return '%s/%s/%s' % ('videos', 'session_' + str(instance.sessionid),filename)


#Adding the video
class TeacherVideo(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True)
    video = models.FileField(upload_to=get_upload_to, blank=True, null=True)
    vname=models.CharField(max_length=250, blank=True, null=True)
    clusterid = models.IntegerField(blank=True, default=0, null=True)
    sessionid = models.IntegerField(blank=True, default=0, null=True)
    topicid = models.IntegerField(blank=True, default=0, null=True)

    def __str__(self):
        return self.name

#Creating student specified key frames and text file based on teachers added video.
class VideoCluster(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True)
    videoid=models.IntegerField(blank=True, default=0, null=True)
    studentid=models.IntegerField(blank=True, default=0, null=True)
    vname=models.CharField(max_length=250, blank=True, null=True)
    clusterid = models.IntegerField(blank=True, default=0, null=True)
    sessionid = models.IntegerField(blank=True, default=0, null=True)
    topicid = models.IntegerField(blank=True, default=0, null=True)
    imageslist=models.CharField(blank=True,max_length=2500,default='', null=True)
    keyframestext=models.CharField(blank=True,max_length=4000,default='', null=True)
    text_have=models.CharField(blank=True,max_length=50,default='', null=True)

    def __str__(self):
        return self.name
