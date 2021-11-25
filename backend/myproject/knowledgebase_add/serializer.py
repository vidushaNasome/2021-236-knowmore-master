import json

from nltk import tokenize
from rest_framework import serializers
# from nltk import tokenize
from .evaluation import EvaluatewithTeacher
from .jsonfeild import func
from .mlmodel import model_function
from .models import Knowledgebase_add, KnowledgeMain, TopicMapKeywords
from .summarizetopicmap import summarizefortopic
from ast import literal_eval

"""data_sen = {'sentence': ['A computer comprises a monitor, a keyboard,mouse, a CPU, and a UPS as essential parts.',
                         'A computer is known for its abundant storage space.',
                         'and the use of computer can be found in every field,',
                         'and the use of computer can be found in every field,',
                         'from students fortheir academic purposes to office workers for their work.'],
            'value': [1, 1, 1, 1, 1],
            'sno': [1, 2, 3, 4, 5]}"""


class Knowledge_addSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeMain
        fields = '__all__'


class Knowledgebase_addSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledgebase_add
        fields = (
            'id', 'name', 'knowledgeid', 'output', 'output1', 'relation', 'concepts', 'studentscore', 'teacherscore',
            'student_id')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Knowledgebase_add.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        # print('displaying details')
        para = KnowledgeMain.objects.get(pk=instance.knowledgeid.id)
        print(para.details)
        """para = "A paragraph is a series of related sentences developing a" \
               " central idea, called the topic. Try to think about paragraphs in terms of" \
               " thematic unity: a paragraph is a sentence or a group of sentences that supports" \
               " one central, unified idea. Paragraphs add one idea at a time to your broader argument."""
        # print(para)

        para_new = summarizefortopic(para.details)

        # print('summarize')
        # print(para_new)
        # calling with summerizing
        sen_x = tokenize.sent_tokenize(para_new)

        # calling without summarizing
        # sen_x = tokenize.sent_tokenize(para.details)

        data_sen = {
            'sentence': sen_x
        }

        out = model_function(data_sen)

        print('output:')
        print(out)

        level_1 = out[0]['level1']
        level_1_1 = json.dumps(level_1)

        print(level_1_1)
        print('yyy')

        level_2 = out[1]['level2']
        level_2_1 = json.dumps(level_2)
        print(level_2_1)
        print('yyy')

        relation = out[2]['level3']
        relation_1 = json.dumps(relation)
        print(relation_1)
        print('yyy')

        relation_concepts = out[3]['concepts']
        concepts = json.dumps(relation_concepts)
        print(concepts)
        print('yyy')

        instance.name = validated_data.get('title', instance.name)
        instance.output = level_1_1
        instance.output1 = level_2_1
        instance.relation = relation_1
        instance.concepts = concepts
        # print(relation_concepts)

        student_array = json.loads(concepts)
        print('student_array')
        print(student_array)

        tcher_id = para.session_id
        print('tcher_id')
        print(tcher_id)

        try:
            teachers_list = TopicMapKeywords.objects.get(session_id=tcher_id)

            if (teachers_list != None):
                print('teacher list')
                print(teachers_list.keywords)
                teacher_array = teachers_list.keywords.split(',')

                print('printing arrays:')
                print(student_array)
                print(teacher_array)

                x = EvaluatewithTeacher(student_array, teacher_array)

                print('output score:')
                print(x)

                instance.studentscore = x[0]
                instance.teacherscore = x[1]

                instance.save()

        except:
            instance.save()

        return instance


class TopicMapKeywordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicMapKeywords
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return TopicMapKeywords.objects.create(**validated_data)
