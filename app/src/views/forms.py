from django import forms
from django.contrib.auth.models import User

## @package app.views.forms
# This package contains all the forms of the application


## The class representing the form for creating the login and signup
class UserLoginForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
