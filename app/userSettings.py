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


@login_required(redirect_field_name='login.html', login_url='app:login')
def changeAvatar(request):
    if request.method == 'POST':
<<<<<<< Updated upstream
        user = request.user
        avatar_path = "static/img/avatars/" + user + ".png"
        if UserPreferences.objects.filter(user=user).count() == 1:
            userPref = UserPreferences.objects.get(user=user)
            userPref.picture = avatar_path

            md5Name = hashlib.md5()
            if str(response['COVER'].split(",")[0]) == "image/png":
                extension = "png"
            else:
                extension = "jpg"
            md5Name.update(base64.b64decode(str(response['COVER'].split(",")[1])))
            filePath = "/ManaZeak/static/img/covers/" + md5Name.hexdigest() + extension
            if not os.path.isfile(filePath):
                with open(filePath, 'wb+') as destination:
                    # Split the header with MIME type
                    tags.cover = base64.b64decode(str(response['COVER'].split(",")[1]))
                    destination.write(tags.cover)
                    track.coverLocation = md5Name.hexdigest() + extension

        else:
            data = errorCheckMessage(False, "dbError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
=======
        pass
>>>>>>> Stashed changes


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
