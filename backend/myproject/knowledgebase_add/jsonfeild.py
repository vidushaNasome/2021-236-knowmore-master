from .mlmodel import model_function
import json


def func(val, data):
    out = model_function(data)

    print('output:')
    print(out)

    if val == 1:

        level_1 = out[0]['level1']
        level_1_1=json.dumps(level_1)

        print(level_1_1)
        print('yyy')
        return level_1_1

    if val == 2:
        level_2 = out[1]['level2']
        level_2_1 = json.dumps(level_2)
        print(level_2_1)
        print('yyy')
        return level_2_1

    if val == 3:

        relation = out[2]['level3']
        relation_1=json.dumps(relation)
        print(relation)
        print('yyy')
        return relation_1
