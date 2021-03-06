from django.db import models


# model for search
class Searchdb(models.Model):
    name = models.CharField(max_length=5000, blank=True, null=True)
    keywordS = models.CharField(max_length=5000, default='', blank=False, null=False)
    knid = models.IntegerField(blank=False, null=False, default=0)
    userid = models.IntegerField(blank=True, null=True, default=0)
    sessionid = models.IntegerField(blank=True, null=True, default=0)
    clusterid = models.IntegerField(blank=True, null=True, default=0)
    topicid = models.IntegerField(blank=True, null=True, default=0)
    badgeCite_count = models.IntegerField(blank=False, null=False, default=0)
    membersince = models.IntegerField(blank=True, null=True, default=0)
    rank_label = models.CharField(max_length=5000, default='', blank=False, null=False)
    all_citations = models.IntegerField(blank=True, default=0, null=True)

    def __str__(self):
        return self.name


# model for share knowledgeabases
class ShareKnowledge(models.Model):
    share_content = models.CharField(max_length=5000, blank=True, null=True)
    userid = models.IntegerField(blank=True, null=True, default=0)
    sessionid = models.IntegerField(blank=True, null=True, default=0)
    color = models.CharField(max_length=200, blank=True, null=True)


    def __str__(self):
        return self.share_content

