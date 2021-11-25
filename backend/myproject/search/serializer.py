# categories serializer
from rest_framework import serializers

from .keywordextraction import keywordsSummary
from .models import Searchdb, ShareKnowledge
from .rankout import NewRank
from .variblesretrieve import retrieve_sentences_count, retrieve_SentencePerParagraph_count, retrieve_noun_count, \
    retrieve_verb_count, retrieve_adverb_count, retrieve_adjectives_count, retrieve_stopwords_count, \
    retrieve_paragraph_count, badgecount1


class ShareKnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShareKnowledge
        fields = '__all__'


class SearchdbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Searchdb
        fields = (
            'id', 'name', 'keywordS', 'knid', 'userid', 'sessionid', 'clusterid', 'topicid', 'badgeCite_count',
            'membersince', 'rank_label', 'all_citations')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Searchdb.objects.create(**validated_data)

    def update(self, instance, validated_data):
        print('model calling')

        # keywords extraction model calling
        instance.keywordS = keywordsSummary(instance.name)
        print(instance.keywordS)

        # Ranking model calling
        paragraph_v = retrieve_paragraph_count(instance.name)
        sentence_count_v = retrieve_sentences_count(instance.name)
        sentensePerpara_v = retrieve_SentencePerParagraph_count(instance.name)
        nouns_v = retrieve_noun_count(instance.name)
        verbs_v = retrieve_verb_count(instance.name)
        adverbs_v = retrieve_adverb_count(instance.name)
        adjectives_v = retrieve_adjectives_count(instance.name)
        stopwords_v = retrieve_stopwords_count(instance.name)
        member_v = instance.membersince
        badge_v = badgecount1(instance.userid)

        print('paragraph count:')
        print(paragraph_v)
        print('sentence count:')
        print(sentence_count_v)
        print('sentence per paragraph count:')
        print(sentensePerpara_v)
        print('nouns count:')
        print(nouns_v)
        print('verbs count:')
        print(verbs_v)
        print('adverbs count:')
        print(adverbs_v)
        print('adjectives count:')
        print(adjectives_v)
        print('stopwords count:')
        print(stopwords_v)
        print('badge:')
        print(badge_v)
        print('citations:')
        print('member since:')
        print(member_v)

        instance.rank_label = NewRank(1, sentence_count_v, sentensePerpara_v, nouns_v, verbs_v, adverbs_v, adjectives_v,
                                      stopwords_v, badge_v, member_v, 0)
        print('---Results of Knowledgebase Ranking Model----')
        print(instance.rank_label)

        instance.save()

        return instance
