import os

import pandas as pd
import pickle

from django.conf import settings


def paragraphRanking(paragraph_count, sentence_count, sentensePerpara, nouns, verbs, adverbs, adjectives, stopwords,
                     badgeCite_count, memberSince, pastReviews):
    print(paragraph_count)
    print(sentence_count)
    print(sentensePerpara)
    print(nouns)
    print(verbs)
    print(adverbs)
    print(adjectives)
    print(stopwords)
    print(badgeCite_count)
    print(memberSince)
    print(pastReviews)

    path1 = os.path.join(settings.MODELS_ROOT, 'IMDB_dataset.csv')
    df = pd.read_csv(path1)

    df = df.drop(labels=['ID'], axis=1)
    df = df.drop(labels=['ReviewRating'], axis=1)
    df = df.drop(labels=['ProfilePhoto'], axis=1)
    df = df.drop(labels=['Tokens'], axis=1)
    df = df.drop(labels=['Characters'], axis=1)
    df = df.drop(labels=['Tokens per Sentence'], axis=1)
    df = df.drop(labels=['Characters per Token'], axis=1)
    df = df.drop(labels=['Passive Sentences'], axis=1)
    df = df.drop(labels=['Review Polarity'], axis=1)
    df = df.drop(labels=['Title Depth'], axis=1)
    df = df.drop(labels=['Title Polarity'], axis=1)
    df = df.drop(labels=['SimilarWords'], axis=1)
    df = df.drop(labels=['HardToSpellWords'], axis=1)
    df = df.drop(labels=['NetLingo'], axis=1)
    df = df.drop(labels=['Smileys'], axis=1)
    df = df.drop(labels=['Hash'], axis=1)
    df = df.drop(labels=['SpellMistakes%'], axis=1)
    df = df.drop(labels=['SMOG'], axis=1)
    df = df.drop(labels=['FLESCH_READING'], axis=1)
    df = df.drop(labels=['FLESCH_KINCAID'], axis=1)
    df = df.drop(labels=['ARI'], axis=1)
    df = df.drop(labels=['COLEMAN_LIAU'], axis=1)
    df = df.drop(labels=['GUNNING_FOG'], axis=1)
    df = df.drop(labels=['SMOG_INDEX'], axis=1)
    df = df.drop(labels=['COMPLEXWORDS'], axis=1)
    df = df.drop(labels=['SYLLABLES'], axis=1)
    df = df.drop(labels=['AboutDisclosure'], axis=1)
    df = df.drop(labels=['PastRatings'], axis=1)
    df = df.drop(labels=['AveragPastRatings'], axis=1)
    df = df.drop(labels=['TotalVotes'], axis=1)
    df = df.drop(labels=['HelpfulVotes'], axis=1)

    # Define Dependent variable
    Y = df['Label'].values
    print(Y)

    # Define Independent variables
    X = df.drop(labels=['Label'], axis=1)
    df = df.dropna()
    print(X)

    from sklearn.model_selection import train_test_split
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.5, random_state=20)

    # define a model
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier(n_estimators=200, random_state=20)

    model.fit(X_train, Y_train)
    prediction_test = model.predict(X_test)

    path = os.path.join(settings.MODELS_ROOT, 'RFI_saerch.pkl')

    with open('RFI_saerch.pkl', 'wb') as f:
        pickle.dump(path, f)

    # in your prediction file
    with open(path, 'rb') as f:
        model1 = pickle.load(f)

    print("Check123")
    preds1 = model1.predict([[paragraph_count, sentence_count, sentensePerpara, nouns, verbs, adverbs, adjectives,
                              stopwords, badgeCite_count, memberSince, pastReviews]])
    print(preds1)

    return 5

