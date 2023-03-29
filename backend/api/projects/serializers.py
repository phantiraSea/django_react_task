from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','name', 'end_date', 'description', 'complete', 'owner']

    def create(self, validated_data):
        # if Project.objects.filter(name=validated_data['name']):
        #     raise Exception("This task is already have")
        instance = self.Meta.model(**validated_data)
        instance.owner = self.context.get('user')
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for key,value in validated_data.items():
            setattr(instance,key,value)
        instance.save()
        return instance
    