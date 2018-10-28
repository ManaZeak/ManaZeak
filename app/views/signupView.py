from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from app.security.inviteCodeManager import getInviteCodeByCode, generateInviteCode
from app.security.permissionHandler import checkPermission
from app.security.permissions import PermissionsEnum
from app.utils.applicationConfigurationManager import getApplicationConfiguration
from app.utils.frontRequestAnalyser import checkRequest
from app.utils.requestType import RequestMethodEnum

## @package app.views.signupView
# This package manage the action be done when a user create an account


## This function creates a new user and log the user.
#   @param request the request send by the front. Contains a form with the information needed to create an account.
#   @return the page for the navigator
from app.utils.userSettingsManager import createUserSettings


def signup(request):
    # Checking that the response is correct
    requestAnalyserResult = checkRequest(RequestMethodEnum.POST, request, signup)
    if not requestAnalyserResult['DONE']:
        # Refreshing the page with the good information
        return render(request, 'signup.html', {'form': UserCreationForm()})

    # Getting the form information and checking it
    form = UserCreationForm(request.POST)
    if not form.is_valid():
        return render(request, 'signup.html', {'form': form})

    # Getting the invite code from teh database
    inviteCode = _checkInviteCode(form)
    if inviteCode is None:
        return render(request, 'signup.html', {'form': form})

    # Saving the form
    form.save()
    user = _authenticatingAndAlteringUser(form)


    # Creating the user settings for the new user
    createUserSettings(user, inviteCode)

    # Creating the user invite code and updating the godfather invite code
    generateInviteCode(user, inviteCode)

    # Log the user in
    login(request, user)
    return HttpResponseRedirect(reverse('app:index'))


## This function check if the invite code is enabled on the server and if the invite code is correct.
#   @param form the sanitized form from the signup page.
#   @return if the user can be created
def _checkInviteCode(form):
    # If the invite code isn't enabled the verifications are over
    if not getApplicationConfiguration().inviteCodeEnabled:
        return True

    inviteCode = form.data.get('godFather')

    # Getting the invite code
    inviteCode = getInviteCodeByCode(inviteCode)
    if inviteCode is None:
        return False

    # Checking if the user with the code has the right to sponsor people
    if checkPermission(PermissionsEnum.PLACE_HOLDER, inviteCode.user):
        return inviteCode
    return None


## Authenticate and transform the user as a superuser if it's the first one.
#   @param form the form given by the front.
def _authenticatingAndAlteringUser(form):
    username = form.cleaned_data.get('username')
    raw_password = form.cleaned_data.get('password1')
    user = authenticate(username=username, password=raw_password)
    user.is_superuser = _checkIfFirstUser()
    user.save()
    return user


## Checking if the user is the first to create an account
#   @return True if the user is the first one. False otherwise.
def _checkIfFirstUser():
    return User.objects.all().count() == 1

# FIXME: voir quand l'invite code est utilisé et l'invalider pour en regéner un autre
