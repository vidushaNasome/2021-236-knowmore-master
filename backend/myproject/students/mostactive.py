import os

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle

from django.conf import settings


# This file is used to create random forest. Not calling from any functions.
# Note -----------------------------------------------------------------------------------------------------------------------------------------
# Note -----------------------------------------------------------------------------------------------------------------------------------------


def myfunctionMostActive(a, b, c, d, e, t):
    print(a)
    print(b)
    print(c)
    print(d)
    print(e)
    print(t)

    path1 = os.path.join(settings.MODELS_ROOT, 'MyData.csv')
    df = pd.read_csv(path1)
    # print(df.head())
    X = df.drop(labels=['Most active'], axis=1)
    df = df.dropna()
    Y = df['Most active'].values

    from sklearn.model_selection import train_test_split
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.5, random_state=20)

    from sklearn.ensemble import RandomForestRegressor
    model = RandomForestRegressor(n_estimators=2000, random_state=20)

    model.fit(X_train, Y_train)
    y_predict_rfr = model.predict((X_test))

    from sklearn import metrics
    r_square = metrics.r2_score(Y_test, y_predict_rfr)
    # print('R-Square Error associated with Random Forest Regression is:', r_square)
    # prediction_test = model.predict(X_test)

    path = os.path.join(settings.MODELS_ROOT, 'RFI.pkl')
    # with open(path, 'rb') as f:
    # model = pickle.load(f)

    with open('RFI.pkl', 'wb') as f:
        pickle.dump(path, f)

    # in your prediction file
    with open(path, 'rb') as f:
        model1 = pickle.load(f)

    # preds = model.predict([[22, 0.8, 45, 80, 7, 12]])
    # posts,reactions,replies,marks,additionalklinks,knowledgebase
    print("Predict Active Student Interaction Status")
    # print(preds)
    preds1 = model1.predict([[a, b, c, d, e, t]])
    print(preds1)

    return 2
