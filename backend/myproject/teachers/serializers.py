from rest_framework import serializers

from .models import Teachers


class TeachersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Teachers.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        # print(validated_data.get('clusterIds', instance.clusterIds))
        # print(instance.clusterIds)

        if instance.clusterIds is not None:
            cl = instance.clusterIds + ',' + validated_data.get('clusterIds', instance.clusterIds)

        else:
            cl = validated_data.get('clusterIds', instance.clusterIds)
        instance.clusterIds = cl

        print(cl)
        instance.save()

        return instance
