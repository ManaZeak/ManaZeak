import logging

from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from app.src.services.user.userSignupService import UserSignupService
from app.src.utils.exceptions import userException
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

## @package app.views.signupView
# This package manage the action be done when a user create an account


## This function creates a new user and log the user.
#   @param request the request send by the front. Contains a form with the information needed to create an account.
#   @return the page for the navigator

logger = logging.getLogger('users')


def signup(request):
    # Checking that the response is correct
    try:
        FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request)
    except UserException:
        return render(request, 'signup.html', {'form': UserCreationForm()})

    signupService = UserSignupService()
    form = UserCreationForm(request.POST)
    try:
        user = signupService.createUser(form)
        if user is not None:
            logger.info('New user created : ' + user.username)
            # Log the new user into the app
            login(request, user)
            return HttpResponseRedirect(reverse('app:index'))
    except userException:
        logger.info("Bad signup information send")
    return render(request, 'signup.html', {'form': form})






