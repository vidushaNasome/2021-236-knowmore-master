import os

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle

from django.conf import settings


def NewRank(paragraph_count, sentence_count, sentensePerpara, nouns, verbs, adverbs, adjectives, stopwords,
            badgeCite_count, memberSince, pastReviews):
    print('hello world')
    path = os.path.join(settings.MODELS_ROOT, 'RFI_saerch.pkl')

    with open('RFI_saerch.pkl', 'wb') as f:
        pickle.dump(path, f)

    # in your prediction file
    with open(path, 'rb') as f:
        model1 = pickle.load(f)

    preds1 = model1.predict([[paragraph_count, sentence_count, sentensePerpara, nouns, verbs, adverbs, adjectives,
                              stopwords, badgeCite_count, memberSince, pastReviews]])

    print('Here Display Output')

    x = round(preds1[0], 2)

    if x == 1:
        return 'High'
    else:
        return 'Low'

