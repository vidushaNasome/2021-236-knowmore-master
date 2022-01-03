from django.db import models


# Create your models here.
class Teachers(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True,unique=True)
    password = models.CharField(max_length=250, blank=False, null=False, default="")
    image = models.ImageField(upload_to='Userimages', default="")
    school = models.IntegerField(blank=True, null=True, default="")
    schoolname = models.CharField(max_length=250,blank=True, null=True, default="")
    clusterIds = models.CharField(max_length=250, blank=True, null=True)
    secret = models.CharField(blank=True,null=True,max_length=250)

    def __str__(self):
        return self.name
