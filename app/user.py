from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.models import Playlist, UserPreferences, UserHistory
from app.utils import errorCheckMessage


@login_required(redirect_field_name='login.html', login_url='app:login')
def deleteUser(request):
    if request.method == 'GET':
        user = request.user
        deleteLinkedEntities(user)
        data = errorCheckMessage(True, None)
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def deleteLinkedEntities(user):
    Playlist.objects.filter(user=user).delete()
    UserPreferences.objects.filter(user=user).delete()
    UserHistory.objects.filter(user=user).delete()
