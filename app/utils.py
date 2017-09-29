from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView


# Render class for serving modal to client
class ScanModal (TemplateView):
    template_name = 'utils/modal.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(ScanModal, self).dispatch(*args, **kwargs)


# Return a bad format error
def badFormatError():
    data = {
        'RESULT': 'FAIL',
        'ERROR': 'Bad format'
    }
    return JsonResponse(data)
