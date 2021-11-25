from django.contrib import admin

# Register your models here.
from .models import KnowledgeMain, Knowledgebase_add

admin.site.register(KnowledgeMain)
admin.site.register(Knowledgebase_add)
