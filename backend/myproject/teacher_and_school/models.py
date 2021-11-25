from django.db import models

# Create your models here.
class School(models.Model):
    name = models.CharField(max_length=250, blank=False, null=False,unique=True)
    location=models.CharField(max_length=250, blank=False, null=False)
    password = models.CharField(max_length=250, blank=False, null=False, default="")
    image = models.ImageField(upload_to='Userimages/schoolimages', default="")
    clusterIds = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.name