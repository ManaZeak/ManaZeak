import json
from builtins import print

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic.base import View
from django.views.generic.list import ListView

from app.adminTools import getAdminOptions
from app.form import UserForm
from app.models import Playlist, AdminOptions, InviteCode, UserPreferences
from app.userSettings import createUserInviteCode
from app.utils import populateDB


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        populateDB()
        return super(mainView, self).dispatch(*args, **kwargs)


# Create a new user in database
def createUser(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        isAdmin = False
        if form.is_valid():
            invite = None
            # Checking if user invite is enabled
            if getAdminOptions().inviteCodeEnabled:
                inviteCode = form.data.get('godFather')
                if InviteCode.objects.filter(code=inviteCode).count() == 1:
                    invite = InviteCode.objects.get(code=inviteCode)
                else:
                    return render(request, 'user/signup.html', {'form': form})

            form.save()
            # Special condition for the first user to be administrator
            if User.objects.all().count() == 1:
                isAdmin = True

            # Creating user if tests are ok
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            user.is_superuser = isAdmin
            user.save()

            # Setting the user preferences
            userPref = UserPreferences()
            userPref.user = user
            if invite is not None:
                userPref.inviteCode = invite
            userPref.save()

            createUserInviteCode(user)
            login(request, user)
            return HttpResponseRedirect(reverse('app:index'))
    else:
        form = UserCreationForm()
    return render(request, 'user/signup.html', {'form': form})


# Render the user form login views
class UserFormLogin(View):
    form_class = UserForm
    template_name = 'user/login.html'

    # Display the blank form
    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    # Receive the filled out form
    def post(self, request):
        form = self.form_class(request.POST)
        username = form.data['username']
        password = form.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('app:index')

        return render(request, self.template_name, {'form': form})


# Log out the user
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def logoutView(request):
    logout(request)
    return render(request, 'user/login.html')
