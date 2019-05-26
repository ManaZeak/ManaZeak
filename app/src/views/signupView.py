import logging

from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from app.src.services.user.userSignupService import UserSignupService
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


logger = logging.getLogger('users')

# This class manage the action be done when a user create an account
class SignupView(object):

    @staticmethod
    ## This function creates a new user and log the user.
    #   @param request the request send by the front. Contains a form with the information needed to create an account.
    #   @return the page for the navigator
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
        except UserException:
            logger.info('Bad signup information send')
        return render(request, 'signup.html', {'form': form})






