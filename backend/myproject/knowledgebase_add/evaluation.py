#out----student
#teachers_list --------- teacher

def EvaluatewithTeacher(out,teachers_list):
    count_teachers = len(teachers_list)
    concepts_count_student = 0

    for i in teachers_list:
        target_string_lower = i.lower()

        is_target_in_list = target_string_lower in (string.lower() for string in out)

        # print(is_target_in_list)
        if is_target_in_list == True:
            concepts_count_student = concepts_count_student + 1

        print(concepts_count_student)
        print(count_teachers)

    # score= (concepts_count_student/count_teachers)*100
    return (concepts_count_student, count_teachers)