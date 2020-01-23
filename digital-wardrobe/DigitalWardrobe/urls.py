"""DigitalWardrobe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ClosetMap import views
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^my/', views.my_wardrobes),
    url(r'^add_item/', views.add_item.as_view()),
    url(r'^add_outfit/', views.add_outfit.as_view()),
    url(r'^item_outfits/', views.item_outfits),
    url(r'^get_items/', views.get_items),
    url(r'^outfits/', views.outfits),
    url(r'^open_outfit/', views.open_outfit),
    url(r'^del_outfit/', views.del_outfit),
    url(r'^all_items/', views.all_items),
    url(r'^del_item/', views.del_item),
    url(r'^mod_item/', views.mod_item),
    url(r'^del_wd/', views.del_wd),
    url(r'^mod_wd/', views.mod_wd),
    url(r'^del_cat/', views.del_cat),
    url(r'^mod_cat/', views.mod_cat),
    url(r'^add_wd/', views.add_wd.as_view()),
    url(r'^add_cat/', views.add_cat.as_view()),
    url(r'^my_cats/', views.my_cats),
    url(r'^all_cats/', views.all_cats),
    url(r'^current_user/', views.current_user),
    url(r'^users/', views.UserList.as_view()),
    url(r'^token-auth/', obtain_jwt_token),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,})
]
