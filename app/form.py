from django.contrib.auth.models import User
from django import forms

## The class for creating the login and signup page form
class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']