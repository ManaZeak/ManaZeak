from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView


class newLibrary (TemplateView):
    template_name = 'components/newlibrary.html'

    @method_decorator(login_required(redirect_field_name='login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(newLibrary, self).dispatch(*args, **kwargs)
