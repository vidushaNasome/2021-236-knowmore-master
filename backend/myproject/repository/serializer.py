# categories serializer
from rest_framework import serializers

from .models import CreatedCluster, Createdtopic, CreatedSession


"""class RepositarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repositary
        fields = '__all__'"""

class CreatedClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatedCluster
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return CreatedCluster.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        # print(validated_data.get('clusterIds', instance.clusterIds))
        # print(instance.clusterIds)

        if instance.allids is not None:
            cl = instance.allids + ',' + validated_data.get('allids', instance.allids)

        else:
            cl = validated_data.get('allids', instance.allids)
        instance.allids = cl

        print(cl)
        instance.save()

        return instance

class CreatedTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Createdtopic
        fields = '__all__'

class CreatedSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatedSession
        fields = '__all__'