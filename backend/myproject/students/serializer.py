# categories serializer
from rest_framework import serializers

from .models import Categories, StudentsAsUser, MyClassMates, ModelOutput, AddComments, AdditionalLink, Reaction, \
    Allreactions, newsfeed_badge, Fullvideo
from .mostactive import myfunctionMostActive
from .output import MostActive


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class StudentsasUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentsAsUser
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return StudentsAsUser.objects.create(**validated_data)

        

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


class MyClassMatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyClassMates
        fields = ('id', 'mid', 'allids', 'cid')

    def create(self, validated_data):
        return MyClassMates.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.allids = str(instance.allids) + ',' + str(validated_data.get('cid', instance.cid))

        instance.save()

        return instance


class ModelOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOutput
        # fields = '__all__'
        # NoOfPosts --> watchedfullvideo.
        # marks -->student satisfaction.

        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return ModelOutput.objects.create(**validated_data)

    def update(self, instance, validated_data):
        print('model calling')

        instance.Reactions = validated_data.get('Reactions', instance.Reactions)
        instance.Additionallinks = validated_data.get('Additionallinks', instance.Additionallinks)
        instance.Comments = validated_data.get('Comments', instance.Comments)
        instance.Sharing = validated_data.get('Sharing', instance.Sharing)
        instance.VideoView = validated_data.get('VideoView', instance.VideoView)

        #Reactions, Additionallinks, Comments, Sharing, VideoView
        instance.MostActive = MostActive(instance.Reactions, instance.Additionallinks, instance.Comments, instance.Sharing,
                                         instance.VideoView)

        print(type(instance.MostActive))
        instance.save()

        return instance


class AddCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddComments
        fields = '__all__'


class AdditionalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalLink
        fields = '__all__'


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = '__all__'


class AllreactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allreactions
        fields = '__all__'

class newsfeed_badgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = newsfeed_badge
        fields = '__all__'

class Fullvideo_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Fullvideo
        fields = '__all__'
