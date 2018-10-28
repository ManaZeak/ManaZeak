from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.views.generic.base import View

from app.security.permissionHandler import checkPermission
from app.views.forms import UserLoginForm


## @package app.views.loginView
# This package is used for managing the user login and teh action associated with it


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
        password = form.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if checkPermission(["LOGI"], user):
                if user.is_active:
                    login(request, user)
                    return redirect('app:index')

        return render(request, self.template_name, {'form': form})



