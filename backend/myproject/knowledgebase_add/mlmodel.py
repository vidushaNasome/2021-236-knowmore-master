import numpy as np, pandas as pd

from openie import StanfordOpenIE


def search(values, searchFor):
    k = -1

    for i_t in values:

        k = k + 1

        if i_t['name'] != None:

            if searchFor == i_t["name"]:
                # print('print output: '+searchFor)
                return i_t


def model_function(dx):
    # y = ff(1)
    # print(y)

    data = []
    print('\n')
    print('----------------Concepts Extraction and Graphical Representation of Topic Map----------------')
    print('\n')
    print('Input paragraph for SVO:')
    print(dx)
    print('\n')

    data_sen = dx
    df = pd.DataFrame(data_sen)

    print('Output of dataframes:')
    print(df)
    print('\n')

    one_arr = []
    relation_check = []

    for text in df['sentence']:
        with StanfordOpenIE() as client:

            i = -1

            for triple in client.annotate(text):
                i = i + 1
                # print(triple)
                # print('\n')

                one_arr.append(triple)

            # Selecting the best list outof Best.
            count = len(one_arr)

            # print(count)

            i = 0

            final = -2

            while i < count:
                # print('display:')
                # print(one_arr[i]['subject'])
                if len(one_arr[i]['relation']) < len(one_arr[i - 1]['relation']):
                    final = i
                elif len(one_arr[i]['relation']) == len(one_arr[i - 1]['relation']):
                    if len(one_arr[i]['object']) <= len(one_arr[i - 1]['object']):
                        final = i

                i += 1

            # Choose the best option

            # data.append(triple)
            # print('here goes the output')
            # print(final)
            # print('\n')

            if final < 0:
                print('nothing selected')
            else:
                # print(one_arr[final])
                data.append(one_arr[final])

            one_arr.clear()

    print('\n')
    print('Output of Extracting SVO from Standford Openie:')
    print(data)
    print('\n')

    dataarray = np.asarray(data, dtype=object)

    print('Data Conversion to Numpy Array:')
    print(dataarray)
    dataarray.shape
    print('\n')

    # dataarray[1]

    f_array = np.zeros(shape=(dataarray.size, 5), dtype=object)
    # print(f_array)
    i = -1

    # print('Managing 3 arrays Subject, Object, Relation')

    for tree in dataarray:
        i = i + 1
        f_array[i, 0] = tree['subject']
        f_array[i, 1] = tree['relation']
        f_array[i, 2] = tree['object']

        # f_array[i,3]=i

    print('Output of numpy array for a Paragraph:')
    print(f_array)

    f_array.shape

    """for node in f_array:
        print('Printing Each Node in Extracted Array:')
        print(node)
        print('\n')"""

    # size = 20
    level1 = []
    level2 = []
    relation = []
    concepts = []

    size = 20

    # level1 = np.zeros(shape=(size, 1), dtype=object)
    # level2 = np.zeros(shape=(size, 1), dtype=object)
    # relation = np.zeros(shape=(size, 1), dtype=object)

    # level1 = np.zeros(shape=(size, 1), dtype=object)
    # level2 = np.zeros(shape=(size, 1), dtype=object)
    # relation = np.zeros(shape=(size, 1), dtype=object)

    i = -1;

    for node in f_array:
        i = i + 1

        overlapping = []

        overlapping2 = []

        overlapping3 = []

        print('Printing Each Node in Extracted Array:')
        print(node)
        print('\n')

        overlapping = search(level1, node[0])

        print('searching overlapping --1')
        # print(level1)
        # print(node[0])
        print(overlapping)

        overlapping2 = search(level2, node[2])
        print('searching overlapping --2')
        # print(level2)
        # print(node[1])
        print(overlapping2)

        overlapping3 = search(level2, node[0])

        print('searching Overlapping --3')
        print(overlapping3)

        # print(level1)
        # print('node')
        # print(node[0])

        print('Based on Overlapping status arrays will be managed')
        print('\n')
        if overlapping != None:

            # print(overlapping)

            if overlapping2 != None:

                x_axis = overlapping['x']
                y_axis = overlapping['y']

                x2_axis = overlapping2['x']
                y2_axis = overlapping2['y']

                dict_relation = {
                    'relation': node[1],
                    'EDGE1': i,
                    'val1_x': x_axis,
                    'val1_y': y_axis,
                    'EDGE2': i + size,
                    'val2_x': x2_axis,
                    'val2_y': y2_axis,
                }

                # print('x')
                print('overlapping 1 and 2')
            else:
                x_axis = overlapping['x']
                y_axis = overlapping['y']

                dict2 = {
                    'name': node[2],
                    'val': i + size,
                    'x': 0.1 + (0.05 * i),
                    'y': 0.2 + (0.05 * i)
                }

                level2.append(dict2)
                concepts.append(node[2])
                print(dict2)
                print(node[2])

                dict_relation = {
                    'relation': node[1],
                    'EDGE1': i,
                    'val1_x': x_axis,
                    'val1_y': y_axis,
                    'EDGE2': i + size,
                    'val2_x': 0.1 + (0.05 * i),
                    'val2_y': 0.2 + (0.05 * i),
                }
                print('overlapping 1')

            relation.append(dict_relation)






        else:

            if overlapping2 != None:

                dict1 = {
                    'name': node[0],
                    'val': i,
                    'x': 0.1 + (0.05 * i),
                    'y': (0.05 * i)
                }

                level1.append(dict1)
                concepts.append(node[0])

                # print('x')

                x2_axis = overlapping2['x']
                y2_axis = overlapping2['y']

                dict_relation = {
                    'relation': node[1],
                    'EDGE1': i,
                    'val1_x': 0.1 + (0.05 * i),
                    'val1_y': (0.05 * i),
                    'EDGE2': i + size,
                    'val2_x': x2_axis,
                    'val2_y': y2_axis,
                }
                # relation.append(dict_relation)
                print('overlapping 2')


            else:

                if overlapping3 != None:

                    dict2 = {
                        'name': node[2],
                        'val': i,
                        'x': 0.1 + (0.05 * i),
                        'y': 0.1 + (0.05 * i)
                    }

                    level2.append(dict2)
                    concepts.append(node[0])

                    # print('x')

                    x3_axis = overlapping3['x']
                    y3_axis = overlapping3['y']

                    dict_relation = {
                        'relation': node[1],
                        'EDGE1': i,
                        'val1_x': x3_axis,
                        'val1_y': y3_axis,
                        'EDGE2': i + size,
                        'val2_x': 0.1 + (0.05 * i),
                        'val2_y': 0.1 + (0.05 * i),
                    }

                    # relation.append(dict_relation)

                    print('overlapping 3.')




                else:
                    dict1 = {
                        'name': node[0],
                        'val': i,
                        'x': 0.1 + (0.05 * i),
                        'y': 0.1 + (0.05 * i)
                    }

                    level1.append(dict1)
                    concepts.append(node[0])

                    dict2 = {
                        'name': node[2],
                        'val': i + size,
                        'x': 0.1 + (0.05 * i),
                        'y': 0.2 + (0.05 * i)
                    }

                    level2.append(dict2)
                    concepts.append(node[2])

                    dict_relation = {
                        'relation': node[1],
                        'EDGE1': i,
                        'val1_x': 0.1 + (0.05 * i),
                        'val1_y': 0.1 + (0.05 * i),
                        'EDGE2': i + size,
                        'val2_x': 0.1 + (0.05 * i),
                        'val2_y': 0.2 + (0.05 * i),
                    }
                    # relation.append(dict_relation)
                    print('Nothing overlapping.')

            """dict2 = {
                'name':node[2],
                'val':i+size,
                'x':0.1+(0.25*i),
                'y':0.2+(0.25*i)
            }


            level2.append(dict2)"""

            relation.append(dict_relation)

    print('Graphical Representation of all 3 array, objects:')

    print('\n')
    print('Subject Array:')
    print(level1)

    print('\n')
    print('Object Array:')
    print(level2)

    print('\n')
    print('Relation Array:')
    print(relation)

    print('\n')
    print('-----------------------------------------------------')

    dict1 = {
        'level1': level1
    }

    dict2 = {
        'level2': level2
    }

    dict3 = {
        'level3': relation
    }

    concept_dict = {
        'concepts': concepts
    }

    return dict1, dict2, dict3, concept_dict
