from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import ListView

from app.models import ApplicationConfiguration

## @package app.views
#   This package handle the main view of the application


## Main container
#   @param ListView view object (given by django)
#   @return the main view page
class MainView(ListView):
    template_name = 'index.html'
    queryset = ApplicationConfiguration

    @method_decorator(login_required(redirect_field_name='', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(MainView, self).dispatch(*args, **kwargs)
