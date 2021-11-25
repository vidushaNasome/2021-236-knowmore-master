import nltk
from django.http import JsonResponse
from nltk.tokenize import sent_tokenize
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from students.models import StudentsAsUser, newsfeed_badge
from students.views import newsfeed_badgeViewSet


def retrieve_paragraph_count(paragraph_text):
    count = 1

    return count


# Sentences
def retrieve_sentences_count(text):
    sent_tokenize(text)
    a = len(sent_tokenize(text))

    return a


# Sentences per Paragraph
def retrieve_SentencePerParagraph_count(paragraph):
    sent_tokenize(paragraph)
    r = len(sent_tokenize(paragraph))

    return r


# Nouns
def retrieve_noun_count(test_string):
    # using sum() + strip() + split() function
    res = sum([i.strip(string.punctuation).isalpha() for i in
               test_string.split()])

    # function to test if something is a noun
    is_noun = lambda pos: pos[:2] == 'NN'
    tokenized1 = nltk.word_tokenize(test_string)
    nouns = [word for (word, pos) in nltk.pos_tag(tokenized1) if is_noun(pos)]

    # SUM OF NOUNS
    res2 = len(nouns)

    # percentage calculation
    quotient_n = res2 / int(str(res))
    percentage_n = quotient_n * 100

    return percentage_n / 1000


# Verbs
def retrieve_verb_count(test_string2):
    # using sum() + strip() + split() function
    res3 = sum([i.strip(string.punctuation).isalpha() for i in
                test_string2.split()])

    # function to test if something is a verb
    is_verb = lambda pos: pos[:2] == 'VB'
    tokenized2 = nltk.word_tokenize(test_string2)
    verb = [word for (word, pos) in nltk.pos_tag(tokenized2) if is_verb(pos)]

    res4 = len(verb)

    # percentage calculation
    quotient_v = res4 / int(str(res3))
    percentage_v = quotient_v * 100

    return percentage_v / 1000


# Adverbs
def retrieve_adverb_count(test_string3):
    res5 = sum([i.strip(string.punctuation).isalpha() for i in
                test_string3.split()])

    # function to test if something is a adverb
    is_adverb = lambda pos: pos[:2] == 'RB'
    tokenized3 = nltk.word_tokenize(test_string3)
    adverbs = [word for (word, pos) in nltk.pos_tag(tokenized3) if is_adverb(pos)]

    # SUM OF ADVERBS
    res6 = len(adverbs)

    # percentage calculation
    quotient_adv = res6 / int(str(res5))
    percentage_adv = quotient_adv * 100

    return percentage_adv / 1000


# Adjectives
def retrieve_adjectives_count(test_string8):
    # using sum() + strip() + split() function
    res9 = sum([i.strip(string.punctuation).isalpha() for i in
                test_string8.split()])

    # function to test if something is a adjective
    is_adjective = lambda pos: pos[:2] == 'JJ'
    tokenized9 = nltk.word_tokenize(test_string8)
    adjectives = [word for (word, pos) in nltk.pos_tag(tokenized9) if is_adjective(pos)]

    # SUM OF ADJECTIVES
    res10 = len(adjectives)

    # percentage calculation
    quotient_adj = res10 / int(str(res9))
    percentage_adj = quotient_adj * 100

    return percentage_adj / 1000


# StopWords
def retrieve_stopwords_count(example_sent):
    stop_words = set(stopwords.words('english'))

    word_tokens = word_tokenize(example_sent)
    filtered_sentence = [w for w in word_tokens if not w in stop_words]

    for w in word_tokens:
        if w not in stop_words:
            filtered_sentence.append(w)

            res31 = len(filtered_sentence)

            return res31


# badge count
# def badgecount1(request, badge=None):
#     badgeCite_count = request.GET.get('badge')
#     results2 = newsfeed_badgeViewSet.objects.filter(badgeCite_count=badgeCite_count)
#
#     return results2


# def badgecount(request, userid=None):
#     userid = request.GET.get('userid')
#     results90 = newsfeed_badge.objects.filter(studentid=userid).count()
#
#     return results90

def badgecount(request, userid=None):
    userid = request.GET.get('userid')
    results90 = newsfeed_badge.objects.filter(studentid=userid).count()

    return JsonResponse({'badge': results90})

def badgecount1(userid):
    results90 = newsfeed_badge.objects.filter(studentid=userid).count()

    return results90


# global member
# # memberSince
# def retrieve_memberSince(request):
#      member = request.GET.get('membersince')
#      results5 = StudentsAsUser.objects.filter(membersince=member)
#
#      return results5

# citations count
