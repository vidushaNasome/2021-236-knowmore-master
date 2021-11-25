import datetime

from django.core.files.storage import FileSystemStorage
from django.db import models

from django.utils.timezone import now


# Create your models here.


class Changefilepath(models.Model):
    path = models.TextField()


class Meta:
    managed = False
    db_table = 'changeFilePath'


# media file configs
"""def current_file_path(prefix=''):
    path = Changefilepath.objects.all()[0].path
    path = '{0}/{1}'.format(path, prefix)
    print("path in model :", path)
    # file_name = os.path.join(path, filename)
    # print("complete path : ", file_name)
    # return 'dataset/user_{0}/{1}'.format(instance.user.id, filename)

    return path..


media_storage = FileSystemStorage(location=current_file_path())"""


class Categories(models.Model):
    name = models.CharField(max_length=250, blank=False, default="", null=False)

    def __str__(self):
        return self.name


class StudentsAsUser(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True, unique=True)
    password = models.CharField(max_length=250, blank=False, null=False, default="")
    image = models.ImageField(upload_to='Userimages', blank=True, null=True)
    clusterIds = models.CharField(max_length=250, blank=True, null=True)
    membersince = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class MyClassMates(models.Model):
    mid = models.ForeignKey(StudentsAsUser, models.DO_NOTHING, blank=True, null=True)
    cid = models.IntegerField(blank=True, null=True)
    allids = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.mid


class ModelOutput(models.Model):
    userid = models.IntegerField(blank=True, default=0, null=True)
    clusterid = models.IntegerField(blank=True, default=0, null=True)
    sessionid = models.IntegerField(blank=True, default=0, null=True)
    topicid = models.IntegerField(blank=True, default=0, null=True)
    Reactions = models.IntegerField(blank=True, default=0, null=True)
    Additionallinks = models.IntegerField(blank=True, default=0, null=True)
    Comments = models.IntegerField(blank=True, default=0, null=True)
    Sharing = models.IntegerField(blank=True, default=0, null=True)
    VideoView = models.IntegerField(blank=True, default=0, null=True)
    citations = models.IntegerField(blank=True, default=0, null=True)
    MostActive = models.FloatField(blank=True, default=0.0, null=True)

    # NoOfPosts = models.IntegerField(blank=True, default=0, null=True)
    # Reactions = models.FloatField(blank=True, default=0, null=True)  #
    # Replies = models.IntegerField(blank=True, default=0, null=True)
    # Marks = models.IntegerField(blank=True, default=0, null=True)  # vidusha's knowledgebase marks count
    # AdditionalLinks = models.IntegerField(blank=True, default=0, null=True)  # my part
    # Knowledgebase = models.IntegerField(blank=True, default=0, null=True)  # vidusha

    def __str__(self):
        return self.userid


# checking 2
# checking 3
# checking 4
class AddComments(models.Model):
    clusterid = models.IntegerField(blank=False, null=False)
    sessionid = models.IntegerField(blank=False, null=False)
    topicid = models.IntegerField(blank=False, null=False)
    userid = models.IntegerField(blank=False, null=False)
    comments = models.CharField(max_length=1000, blank=False, null=False)
    userimage = models.CharField(max_length=250, blank=False, null=False)

    def __str__(self):
        return self.clusterid


class AdditionalLink(models.Model):
    clusterid = models.IntegerField(blank=False, null=False)
    sessionid = models.IntegerField(blank=True, null=True)
    topicid = models.IntegerField(blank=True, null=True)
    userid = models.IntegerField(blank=True, null=True)
    additionalLink = models.CharField(max_length=1000, blank=True, null=True)
    userimage = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.clusterid


class Reaction(models.Model):
    clusterid = models.IntegerField(blank=True, null=True)
    sessionid = models.IntegerField(blank=True, null=True)
    topicid = models.IntegerField(blank=True, null=True)
    userid = models.IntegerField(blank=True, null=True)
    reactions = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.clusterid


class Allreactions(models.Model):
    sessionid = models.IntegerField(blank=True, null=True)
    heart = models.IntegerField(blank=True, null=True)
    like = models.IntegerField(blank=True, null=True)
    angry = models.IntegerField(blank=True, null=True)
    cry = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.sessionid


# Add Date Compulsary
class newsfeed_badge(models.Model):
    sessionid = models.IntegerField(blank=True, null=True)
    studentid = models.IntegerField(blank=True, null=True)
    color = models.CharField(max_length=200, blank=True, null=True)
    mark = models.FloatField(blank=True, default=0.0, null=True)
    date = models.DateTimeField(default=datetime.datetime.today(), editable=False)

    def __str__(self):
        return self.sessionid


#Add full completed video
class Fullvideo(models.Model):
    clusterid = models.IntegerField(blank=True, null=True)
    sessionid = models.IntegerField(blank=True, null=True)
    topicid = models.IntegerField(blank=True, null=True)
    userid = models.IntegerField(blank=True, null=True)
    fullvideo = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.clusterid
