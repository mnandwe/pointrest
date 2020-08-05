from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_gis import serializers as geoserializers

from .models import MarkedPoint


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],'null@mail.com',validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username',  'password')

class MarkedPointSerializer(geoserializers.GeoModelSerializer):
    class Meta:
        model = MarkedPoint
        geo_field = 'location'
        fields = ('id','location','name',)