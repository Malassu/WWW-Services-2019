from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template.loader import get_template
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.generic import View
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from django.conf import settings
from .forms import UserForm
from .serializers import *
from .models import Wardrobe, Outfit, OutfitItem

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser

import json
import os

# Create your views here.


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_wardrobes(request):
    request.session.set_expiry(600)
    username = request.user.username
    wardrobes_list = Wardrobe.objects.filter(user=username)
    serializer = WardrobeSerializer(wardrobes_list, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def my_cats(request):
    request.session.set_expiry(600)
    username = request.user.username
    curr_wd = request.data['curr_wd']
    items = Item.objects.filter(user=username, wardrobe=curr_wd)
    if (curr_wd == "Main Wardrobe"):
        items = Item.objects.filter(user=username)
    item_cats = ItemCategory.objects.filter(item_id__in=items.values('name'),
                                            user=username)
    categories_list = Category.objects.filter(
        category__in=item_cats.values('category_id'), user=username)
    serializer = CategorySerializer(categories_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def all_cats(request):
    request.session.set_expiry(600)
    username = request.user.username
    categories_list = Category.objects.filter(user=username)
    serializer = CategorySerializer(categories_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def current_user(request):
    request.session.set_expiry(600)
    serializer = UserSerializer(request.user)
    if (serializer['username'].value is not ''):
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class add_wd(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        request.session.set_expiry(600)
        username = request.user.username
        wd_name = request.data['wardrobe']
        WD = Wardrobe(name=wd_name, user=username, image=request.data['image'])
        serializer = WardrobeSerializer(WD)
        WD.save()
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED)


class add_cat(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):
        request.session.set_expiry(600)
        username = request.user.username
        cat_name = request.data['category']
        if (not Category.objects.filter(category=cat_name).exists()):
            category = Category(category=cat_name, user=username, image=request.data['image'])
            category.save()
        categories_list = Category.objects.filter(user=username)
        serializer = CategorySerializer(categories_list, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class add_item(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        request.session.set_expiry(600)
        item_serializer = ItemSerializer(data=request.data)
        if (item_serializer.is_valid()):
            item_serializer.save()
            if (request.data['category']):
                it_category = ItemCategory(
                    category_id=request.data['category'],
                    item_id=request.data['name'],
                    user=request.user.username)
                it_category.save()
            return Response(item_serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(item_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class add_outfit(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        request.session.set_expiry(600)
        outfit = Outfit(name=request.data['name'], user=request.user.username, image=request.data['image'])
        for item in (request.data['items'].split(",")):
            out_item = OutfitItem(name=item, outfit=outfit.name, user=request.user.username)
            out_item.save()
        serializer = OutfitSerializer(outfit)
        outfit.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def get_items(request):
    request.session.set_expiry(600)
    wd = request.data['wardrobe']
    cat = request.data['category']
    items_list = []
    item_cats = ItemCategory.objects.filter(user=request.user.username)
    if wd == "Main Wardrobe":
        items_list = Item.objects.filter(user=request.user.username)
    else:
        items_list = Item.objects.filter(wardrobe=wd,
                                         user=request.user.username)
    if (cat == ''):
        items_list = items_list.exclude(name__in=item_cats.values('item_id'))
    else:
        item_cats = item_cats.filter(category_id=cat)
        items_list = items_list.filter(name__in=item_cats.values('item_id'))
    serializer = ItemSerializer(items_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def open_outfit(request):
    request.session.set_expiry(600)
    usern = request.user.username
    outfit_its = OutfitItem.objects.filter(outfit=request.data['outfit'], user=usern)
    items = Item.objects.filter(user=usern)
    items = items.filter(name__in=outfit_its.values('name'))
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def item_outfits(request):
    print(request.data['item'])
    request.session.set_expiry(600)
    usern = request.user.username
    outfit_its = OutfitItem.objects.filter(name=request.data['item'], user=usern)
    outfits = Outfit.objects.filter(user=usern)
    outfits = outfits.filter(name__in=outfit_its.values('outfit'))
    serializer = ItemSerializer(outfits, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def outfits(request):
    request.session.set_expiry(600)
    usern = request.user.username
    outfits = Outfit.objects.filter(user=usern)
    serializer = OutfitSerializer(outfits, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def all_items(request):
    request.session.set_expiry(600)
    items_list = Item.objects.filter(user=request.user.username)
    serializer = ItemSerializer(items_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def del_item(request):
    request.session.set_expiry(600)
    item = request.data['name']
    item_obj = Item.objects.filter(user=request.user.username, name=item)
    serializer = ItemSerializer(item_obj)
    item_obj.delete()
    item_cat = ItemCategory.objects.filter(user=request.user.username, item_id=item)
    item_cat.delete()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def del_outfit(request):
    request.session.set_expiry(600)
    outfit = request.data['name']
    outfit_obj = Outfit.objects.filter(user=request.user.username, name=outfit)
    serializer = OutfitSerializer(outfit_obj)
    outfit_obj.delete()
    outfit_item = OutfitItem.objects.filter(user=request.user.username, outfit=outfit)
    outfit_item.delete()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mod_item(request):
    request.session.set_expiry(600)
    item = request.data['name']
    item_obj = Item.objects.filter(user=request.user.username, name=item)
    item_cat = ItemCategory.objects.filter(user=request.user.username, item_id=item)
    if(request.data['new_name']):
        item_obj.update(name=request.data['new_name'])
        item_obj = Item.objects.filter(user=request.user.username, name=request.data['new_name'])
    if(request.data['wardrobe'] != ''):
        item_obj.update(wardrobe=request.data['wardrobe'])
    if(request.data['image']):
        file = request.data['image']
        media = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'images'))
        path = media.save(file.name, ContentFile(file.read()))
        item_obj.update(image=os.path.join('images', path))
    if(request.data['category']):
        if(request.data['new_name']):
            item = request.data['new_name']
        if(item_cat.exists()):
            item_cat.update(category_id=request.data['category'], item_id=item)
        else:
            cat_cr = ItemCategory(category_id=request.data['category'], item_id=item, user=request.user.username)
            cat_cr.save()
    return Response(UserSerializer(request.user).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mod_wd(request):
    current_wd = request.data['current_wd']
    user = request.user.username
    if(request.data['new_name']):
        wd = Wardrobe.objects.filter(name=current_wd, user=user)
        items = Item.objects.filter(wardrobe=current_wd, user=user)
        wd.update(name=request.data['new_name'])
        items.update(wardrobe=request.data['new_name'])
        return Response(UserSerializer(request.user).data, status=status.HTTP_201_CREATED)
    return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def del_wd(request):
    current_wd = request.data['current_wd']
    user = request.user.username
    wd = Wardrobe.objects.filter(name=current_wd, user=user)
    items = Item.objects.filter(wardrobe=current_wd, user=user)
    wd.delete()
    items.update(wardrobe='')
    return Response(UserSerializer(request.user).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mod_cat(request):
    old_ct_ = request.data['category_old']
    user = request.user.username
    old_ct = Category.objects.filter(category=old_ct_, user=user)
    serializer = CategorySerializer(old_ct)
    if(old_ct.exists() and request.data['category_new']):
        items_ct = ItemCategory.objects.filter(category_id=old_ct_, user=user)
        old_ct.update(category=request.data['category_new'])
        items_ct.update(category_id=request.data['category_new'])
        return Response(UserSerializer(request.user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def del_cat(request):
    old_ct_ = request.data['category_old']
    user = request.user.username
    old_ct = Category.objects.filter(category=old_ct_, user=user)
    serializer = CategorySerializer(old_ct)
    if(old_ct.exists()):
        items_ct = ItemCategory.objects.filter(user=user, category_id=old_ct_)
        old_ct.delete()
        items_ct.delete()
        return Response(UserSerializer(request.user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class UserList(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        request.session.set_expiry(600)
        serializer = UserSerializerWithToken(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            Main_WD = Wardrobe(name="Main Wardrobe",
                               user=serializer['username'].value)
            Main_WD.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
