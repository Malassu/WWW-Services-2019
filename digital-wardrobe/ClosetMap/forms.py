from django.contrib.auth.models import User
from django import forms
from django.db import models
from .models import *

class UserForm(forms.ModelForm):
    email = forms.EmailField(max_length=100, help_text='Required. Please enter a valid email address.')
    password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
