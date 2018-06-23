import base64
import hashlib
import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.errors import ErrorEnum, errorCheckMessage
from app.models import InviteCode, UserPreferences
from app.utils import timeCodeToString
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
            data = {**data, **errorCheckMessage(True, None, getUserSettings)}
        else:
            data = errorCheckMessage(False, ErrorEnum.DB_ERROR, getUserSettings)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, getUserSettings)
    return JsonResponse(data)


# Is called when the user changes their avatar,
#        updates user's profile picture
@login_required(redirect_field_name='login.html', login_url='app:login')
def changeAvatar(request):
    if request.method == 'POST':
        response = json.loads(request)
        user = request.user
        if str(response['AVATAR'].split(",")[0]) == "image/png":
            extension = "png"
        else:
            extension = "jpg"

        username_hash = hashlib.md5(user.encode("utf-8")).hexdigest()
        avatar_path = "static/img/avatars/" + username_hash + extension

        # if only one user with that username is found
        if UserPreferences.objects.filter(user=user).count() == 1:
            userPref = UserPreferences.objects.get(user=user)
            userPref.avatar = avatar_path
            userPref.save()
            with open(avatar_path, 'wb') as destination:
                img_b64 = str(response['AVATAR'].split(",")[1])
                destination.write(base64.b64decode(img_b64))
            data = errorCheckMessage(True, None, changeAvatar)
        else:
            data = errorCheckMessage(False, ErrorEnum.DB_ERROR, changeAvatar)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, changeAvatar)
    return JsonResponse(data)


def createUserInviteCode(user):
    """ Creates an invite code for a user
    """
    inviteCode = InviteCode()
    inviteCode.user = user
    inviteCode.code = hashlib.md5(
        str(user.id).encode("ascii", "ignore") +
        str(user.username).encode("ascii", "ignore") +
        str(user.date_joined).encode("ascii", "ignore")).hexdigest().upper()
    inviteCode.save()
