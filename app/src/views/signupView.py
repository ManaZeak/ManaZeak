import logging

from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from app.src.security.inviteCodeManager import getInviteCodeByCode, generateInviteCode
from app.src.utils.applicationConfigurationManager import getApplicationConfiguration
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.userSettingsManager import createUserSettings

## @package app.views.signupView
# This package manage the action be done when a user create an account


## This function creates a new user and log the user.
#   @param request the request send by the front. Contains a form with the information needed to create an account.
#   @return the page for the navigator

logger = logging.getLogger('django')


def signup(request):
    # Checking that the response is correct
    requestAnalyserResult = FrontRequestChecker.checkRequest('POST', request, signup)
    print(requestAnalyserResult)
    if not requestAnalyserResult['DONE']:
        print("lel")
        # Refreshing the page with the good information
        return render(request, 'signup.html', {'form': UserCreationForm()})

    # Getting the form information and checking it
    form = UserCreationForm(request.POST)
    if not form.is_valid():
        print("zob")
        return render(request, 'signup.html', {'form': form})

    # Getting the invite code from teh database
    inviteCode = None
    # If the invite code isn't enabled the verifications are over
    if getApplicationConfiguration().inviteCodeEnabled:
        print("toilet token")
        inviteCode = form.data.get('godFather')

        # Getting the invite code
        inviteCode = getInviteCodeByCode(inviteCode)
        # FIXME : faire les permissions vérif que user peut inviter
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


## Authenticate and transform the user as a superuser if it's the first one.
#   @param form the form given by the front.
def _authenticatingAndAlteringUser(form):
    username = form.cleaned_data.get('username')
    rawPassword = form.cleaned_data.get('password1')
    user = authenticate(username=username, password=rawPassword)
    user.is_superuser = _checkIfFirstUser()
    user.save()
    return user


## Checking if the user is the first to create an account
#   @return True if the user is the first one. False otherwise.
def _checkIfFirstUser():
    return User.objects.all().count() == 1
