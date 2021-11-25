import os

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle

from django.conf import settings


def MostActive(Reactions,  Additionallinks,  Comments,  Sharing,  VideoView):
    print('hello world')
    path = os.path.join(settings.MODELS_ROOT, 'RFI.pkl')
    # with open(path, 'rb') as f:
    # model = pickle.load(f)

    with open('RFI.pkl', 'wb') as f:
        pickle.dump(path, f)

    # in your prediction file
    with open(path, 'rb') as f:
        model = pickle.load(f)

    # preds = model.predict([[22, 0.8, 45, 80, 7, 12]])
    # posts,reactions,replies,marks,additionalklinks,knowledgebase
    # print("Predict Active Student Interaction Status")
    # print(preds)
    preds = model.predict([[Reactions,  Additionallinks,  Comments,  Sharing,  VideoView]])

    print('Here Display Output')

    x = round(preds[0], 2)
    print(x)

    return x
