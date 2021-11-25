from django.db import models

# from .jsonfeild import func
# from .mlmodel import model_function
# import json

# level1=out[0].values()

"""pickle.dump(level_1,open('model.pkl','wb'))
model = pickle.load(open('model.pkl','rb'))
print(model)
A computer comprises a monitor, a keyboard, 
 mouse, a CPU, and a UPS as essential parts.
  A computer is known for its abundant storage space.
   Human is now mostly dependent on the 
   technology, and the use of computer 
   can be found in every field, from students for
    their academic purposes to office workers for their work.


"""

"""data_sen = {'sentence': ['A computer is  an electronic device or machine that makes our work easier.',
                             'Also, they help us in many ways.',
                             'Human is now mostly dependent on the technology,',
                             'Example Example is father of Computer.', 'Added a working Sentence'],
                'value': [1, 1, 1, 1, 1],
                'sno': [1, 2, 3, 4, 5]}"""

data_sen = {'sentence': ['A computer comprises a monitor, a keyboard,mouse, a CPU, and a UPS as essential parts.',
                         'A computer is known for its abundant storage space.',
                         'and the use of computer can be found in every field,',
                         'and the use of computer can be found in every field,',
                         'from students fortheir academic purposes to office workers for their work.'],
            'value': [1, 1, 1, 1, 1],
            'sno': [1, 2, 3, 4, 5]}


##must set unique for a student
class KnowledgeMain(models.Model):
    details = models.CharField(max_length=5000, blank=False, null=False)
    session_id = models.IntegerField(blank=False, null=False, default=0)
    cluster_id = models.IntegerField(blank=False, null=False, default=0)
    topic_id = models.IntegerField(blank=False, null=False, default=0)
    student_id=models.IntegerField(blank=False, null=False, default=0)

    def __str__(self):
        return self.details


class Knowledgebase_add(models.Model):
    # objects = KnowledgeMain()
    name = models.CharField(max_length=5000, blank=False, null=False)
    knowledgeid = models.ForeignKey(KnowledgeMain, related_name='knm', blank=True, null=True, on_delete=models.SET_NULL)
    output = models.CharField(max_length=5000, blank=False, null=False, default='')
    output1 = models.CharField(max_length=5000, blank=False, null=False, default='')
    relation = models.CharField(max_length=5000, blank=False, null=False, default='')
    concepts = models.CharField(max_length=1000, blank=False, null=False, default='')
    studentscore = models.IntegerField(blank=False, null=False, default=0)
    teacherscore = models.IntegerField(blank=False, null=False, default=0)
    student_id = models.IntegerField(blank=False, null=False, default=0)

    def __str__(self):
        return self.name


##overall batch
class TopicMapKeywords(models.Model):
    session_id = models.IntegerField(blank=False, null=False, default=0)
    teacher_id = models.IntegerField(blank=False, null=False, default=0)
    keywords = models.CharField(max_length=1000, blank=False, null=False)  # teacher,student
    teacherscore = models.IntegerField(blank=False, null=False, default=0)
    showstudents=models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.session_id
