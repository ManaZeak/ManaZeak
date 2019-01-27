import logging

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.views.generic.base import View

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.exceptions.userException import UserException
from app.src.views.forms import UserLoginForm


## @package app.views.loginView
# This package is used for managing the user login and teh action associated with it


logger = logging.getLogger('users')


## Render the user form login views
#   @param view object (given by django)
#   @return the form for logging in
class Login(View):
    form_class = UserLoginForm
    template_name = 'login.html'

    ## Display the blank form
    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    # Receive the filled out form
    def post(self, request):
        form = self.form_class(request.POST)
        username = form.data['username']
        try:
            password = form.data['password']
            user = authenticate(username=username, password=password)
            if user is not None and user.is_active:
                PermissionHandler.checkPermission(PermissionEnum.LOGIN, user)
                logger.info('User : ' + user.username + ' logged in successfully')
                login(request, user)
                return redirect('app:index')
            else:
                logger.info('User : ' + username + ' failed to log in')
        except UserException:
            logger.info('The user : ' + username + ' did not have permission to log in.')
        return render(request, self.template_name, {'form': form})
