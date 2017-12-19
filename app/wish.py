import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.models import Wish
from app.utils import errorCheckMessage


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def createWish(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'WISH' in response:
            wish = Wish()
            wish.user = user
            wish.text = strip_tags(str(response['WISH']))
            wish.status = 0  # Not done; 1 Refused; 2 Accepted
            wish.save()
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
