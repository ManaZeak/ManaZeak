import hashlib

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.models import InviteCode, UserPreferences
from app.utils import errorCheckMessage, timeCodeToString
from app.wallet import calculateCurrentAvailableCash


# Return the user's information
@login_required(redirect_field_name='login.html', login_url='app:login')
def getUserSettings(request):
    if request.method == 'GET':
        user = request.user
        if UserPreferences.objects.filter(user=user).count() == 1:
            userPref = UserPreferences.objects.get(user=user)
            inviteCode = InviteCode.objects.get(user=user)
            data = {
                'USERNAME': user.username,
                'DATE_JOINED': timeCodeToString(user.date_joined),
                'LAST_LOGIN': timeCodeToString(user.last_login),
                'INVITE_CODE': inviteCode.code,
                'IS_ADMIN': user.is_superuser,
                'MANACOIN': calculateCurrentAvailableCash(userPref.wallet),
            }
            if userPref.inviteCode is not None:
                data = {**data, **{
                    'GODFATHER_CODE': userPref.inviteCode.code,
                    'GODFATHER_NAME': userPref.inviteCode.user.username,
                }}
            else:
                data = {**data, **{
                    'GODFATHER_CODE': "Christ",
                    'GODFATHER_NAME': "Jesus",
                }}
            data = {**data, **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "dbError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Create an invite code for a user
def createUserInviteCode(user):
    inviteCode = InviteCode()
    inviteCode.user = user
    inviteCode.code = hashlib.md5(
        str(user.id).encode("ascii", "ignore") +
        str(user.username).encode("ascii", "ignore") +
        str(user.date_joined).encode("ascii", "ignore")).hexdigest().upper()
    inviteCode.save()
