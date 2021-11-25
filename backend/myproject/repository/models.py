from django.db import models

# Create your models here.
class Repositary(models.Model):
    name = models.CharField(max_length=250, blank=False, null=False)

    def __str__(self):
        return self.name

class CreatedCluster(models.Model):
    clustername = models.CharField(max_length=250, blank=True, null=True)
    schoolid = models.IntegerField(blank=True, null=True)
    allids = models.CharField(max_length=250, blank=True, null=True)
    teachersid = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.clustername)

class Createdtopic(models.Model):
    topicname = models.CharField(max_length=250, blank=True, null=True)
    schoolid = models.IntegerField(blank=True, null=True)
    clusterid = models.ForeignKey(CreatedCluster, models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return str(self.topicname)

class CreatedSession(models.Model):
    topicid = models.ForeignKey(Createdtopic, models.DO_NOTHING, blank=True, null=True)
    schoolid = models.IntegerField(blank=True, null=True)
    clusterid = models.ForeignKey(CreatedCluster, models.DO_NOTHING, blank=True, null=True)
    sessionname = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.sessionname)