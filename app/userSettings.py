import hashlib

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.models import InviteCode, UserPreferences
from app.utils import errorCheckMessage


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserSettings(request):
    if request.method == 'GET':
        user = request.user
        if UserPreferences.objects.filter(user=user).count() == 1:
            userPref = UserPreferences.objects.get(user=user)
            inviteCode = InviteCode.objects.get(user=user)
            data = {
                'INVITE_CODE': inviteCode.code,
            }
            if userPref.inviteCode is not None:
                tmp = {
                    'GODFATHER_CODE': userPref.inviteCode.code,
                }
                data = {**data, **tmp}
            data = {**data, **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "dbError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def createUserInviteCode(user):
    inviteCode = InviteCode()
    inviteCode.user = user
    inviteCode.code = hashlib.md5(
        str(user.id).encode("ascii", "ignore") + str(user.username).encode("ascii", "ignore") +
        str(user.date_joined).encode("ascii", "ignore")).hexdigest().upper()
    inviteCode.save()
