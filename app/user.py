from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.models import Playlist, UserPreferences, UserHistory, InviteCode
from app.utils import errorCheckMessage, populateDB


@login_required(redirect_field_name='login.html', login_url='app:login')
def deleteUser(request):
    if request.method == 'GET':
        user = request.user
        deleteLinkedEntities(user)
        user.delete()
        data = errorCheckMessage(True, None)
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='login.html', login_url='app:login')
def getUserInformation(request):
    if request.method == 'GET':
        populateDB()
        user = request.user
        userPref = UserPreferences.objects.get(user=user)
        inviteCode = InviteCode.objects.get(user=user).code
        data = {
            'USER_ID': user.username,
            'IS_ADMIN': user.is_superuser,
            'GROUP_NAME': userPref.group.name,
            'GROUP_ID': userPref.group.id,
            'INVITE_CODE': inviteCode,
            'GODFATHER_CODE': userPref.inviteCodename,
        }
        data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def deleteLinkedEntities(user):
    Playlist.objects.filter(user=user).delete()
    UserPreferences.objects.filter(user=user).delete()
    UserHistory.objects.filter(user=user).delete()
