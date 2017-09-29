from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView


# Used for rendering the new library view
class NewLibrary (TemplateView):
    template_name = 'components/newlibrary.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(NewLibrary, self).dispatch(*args, **kwargs)
