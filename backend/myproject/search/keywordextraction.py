import os
from django.conf import settings

# import libraries
import nltk
from nltk import word_tokenize
import string
from nltk.stem import WordNetLemmatizer
import numpy as np
import math


# Cleaning Text Data
def clean(text):
    text = text.lower()
    printable = set(string.printable)
    text = filter(lambda x: x in printable, text)
    text = "".join(list(text))
    return text


def keywordsSummary(textpara):
    Cleaned_text = clean(textpara)
    print(Cleaned_text)
    text = word_tokenize(Cleaned_text)
    print("Tokenized Text: \n")
    print(text)

    # POS Tagging For Lemmatization
    POS_tag = nltk.pos_tag(text)

    print("Tokenized Text with POS tags: \n")
    print(POS_tag)

    # Lemmatization
    wordnet_lemmatizer = WordNetLemmatizer()

    adjective_tags = ['JJ', 'JJR', 'JJS']

    lemmatized_text = []

    for word in POS_tag:
        if word[1] in adjective_tags:
            lemmatized_text.append(str(wordnet_lemmatizer.lemmatize(word[0], pos="a")))
        else:
            lemmatized_text.append(str(wordnet_lemmatizer.lemmatize(word[0])))  # default POS = noun

    print("Text tokens after lemmatization of adjectives and nouns: \n")
    print(lemmatized_text)

    # POS tagging for Filtering
    POS_tag = nltk.pos_tag(lemmatized_text)

    print("Lemmatized text with POS tags: \n")
    print(POS_tag)

    # POS Based Filtering
    stopwords = []

    wanted_POS = ['NN', 'NNS', 'NNP', 'NNPS', 'JJ', 'JJR', 'JJS', 'VBG', 'FW']

    for word in POS_tag:
        if word[1] not in wanted_POS:
            stopwords.append(word[0])

    punctuations = list(str(string.punctuation))

    stopwords = stopwords + punctuations

    path = os.path.join(settings.MODELS_ROOT, 'long_stopwords.txt')

    stopword_file = open(path)

    lots_of_stopwords = []

    for line in stopword_file.readlines():
        lots_of_stopwords.append(str(line.strip()))

    stopwords_plus = []
    stopwords_plus = stopwords + lots_of_stopwords
    stopwords_plus = set(stopwords_plus)

    # Removing Stopwords
    processed_text = []
    for word in lemmatized_text:
        if word not in stopwords_plus:
            processed_text.append(word)
    print(processed_text)

    # Vocabulary Creation
    vocabulary = list(set(processed_text))
    print(vocabulary)

    # Building Graph
    vocab_len = len(vocabulary)

    weighted_edge = np.zeros((vocab_len, vocab_len), dtype=np.float32)

    score = np.zeros((vocab_len), dtype=np.float32)
    window_size = 3
    covered_coocurrences = []

    for i in range(0, vocab_len):
        score[i] = 1
        for j in range(0, vocab_len):
            if j == i:
                weighted_edge[i][j] = 0
            else:
                for window_start in range(0, (len(processed_text) - window_size)):

                    window_end = window_start + window_size

                    window = processed_text[window_start:window_end]

                    if (vocabulary[i] in window) and (vocabulary[j] in window):

                        index_of_i = window_start + window.index(vocabulary[i])
                        index_of_j = window_start + window.index(vocabulary[j])

                        if [index_of_i, index_of_j] not in covered_coocurrences:
                            weighted_edge[i][j] += 1 / math.fabs(index_of_i - index_of_j)
                            covered_coocurrences.append([index_of_i, index_of_j])

    # Calculating weighted summation of connections of a vertex
    inout = np.zeros((vocab_len), dtype=np.float32)

    for i in range(0, vocab_len):
        for j in range(0, vocab_len):
            inout[i] += weighted_edge[i][j]

    # Scoring Vertices
    MAX_ITERATIONS = 50
    d = 0.85
    threshold = 0.0001  # convergence threshold

    for iter in range(0, MAX_ITERATIONS):
        prev_score = np.copy(score)

        for i in range(0, vocab_len):

            summation = 0
            for j in range(0, vocab_len):
                if weighted_edge[i][j] != 0:
                    summation += (weighted_edge[i][j] / inout[j]) * score[j]

            score[i] = (1 - d) + d * (summation)

        if np.sum(np.fabs(prev_score - score)) <= threshold:  # convergence condition
            print("Converging at iteration " + str(iter) + "....")
            break

    for i in range(0, vocab_len):
        print("Score of " + vocabulary[i] + ": " + str(score[i]))

    # Phrase Partiotioning
    phrases = []

    phrase = " "
    for word in lemmatized_text:

        if word in stopwords_plus:
            if phrase != " ":
                phrases.append(str(phrase).strip().split())
            phrase = " "
        elif word not in stopwords_plus:
            phrase += str(word)
            phrase += " "

    print("Partitioned Phrases (Candidate Keyphrases): \n")
    print(phrases)

    # Create a list of unique phrases.
    unique_phrases = []

    for phrase in phrases:
        if phrase not in unique_phrases:
            unique_phrases.append(phrase)

    print("Unique Phrases (Candidate Keyphrases): \n")
    print(unique_phrases)

    # Thinning the list of candidate-keyphrases.
    for word in vocabulary:
        # print word
        for phrase in unique_phrases:
            if (word in phrase) and ([word] in unique_phrases) and (len(phrase) > 1):
                unique_phrases.remove([word])

    print("Thinned Unique Phrases (Candidate Keyphrases): \n")
    print(unique_phrases)

    # Scoring Keyphrases
    phrase_scores = []
    keywords = []
    for phrase in unique_phrases:
        phrase_score = 0
        keyword = ''
        for word in phrase:
            keyword += str(word)
            keyword += " "
            phrase_score += score[vocabulary.index(word)]
        phrase_scores.append(phrase_score)
        keywords.append(keyword.strip())

    i = 0
    for keyword in keywords:
        print("Keyword: '" + str(keyword) + "', Score: " + str(phrase_scores[i]))
        i += 1

    # Ranking Keyphrases
    sorted_index = np.flip(np.argsort(phrase_scores), 0)

    keywords_num = 100

    print("Keywords:\n")

    return keywords


"""if __name__ == "__main__":
    main()"""
