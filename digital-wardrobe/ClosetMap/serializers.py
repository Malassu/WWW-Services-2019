from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Wardrobe, Item, Category, ItemCategory, Outfit
from django.contrib.auth.models import User

class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = ('pk', 'name', 'user', 'image')

class WardrobeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wardrobe
        fields = ('pk','name', 'user', 'image')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('pk', 'name', 'user', 'wardrobe', 'image',)

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)

class ItemCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItemCategory
        fields = ('category_id', 'item_id', 'user',)
        

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('category', 'user', 'image')

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password',)
