from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse

from app.models import Track, Artist, Album, Playlist, Library, Genre, Shuffle, UserHistory, Stats, History
from app.utils import errorCheckMessage


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getAdminView(request):
    if request.method == 'GET':
        admin = request.user
        if admin.is_superuser:
            users = User.objects.all()
            userInfo = []
            for user in users:
                userInfo.append({
                    'NAME': user.username,
                })
            data = dict({'RESULT': userInfo})
            data = {**data, **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def isAdmin(request):
    if request.method == 'GET':
        data = {'IS_ADMIN':request.user.is_superuser}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Drop all database, used for debug
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def dropAllDB(request):
    if request.method == 'GET':
        if request.user.is_authenticated():
            if request.user.is_superuser:
                Track.objects.all().delete()
                Artist.objects.all().delete()
                Album.objects.all().delete()
                Playlist.objects.all().delete()
                Library.objects.all().delete()
                Genre.objects.all().delete()
                Shuffle.objects.all().delete()
                UserHistory.objects.all().delete()
                Stats.objects.all().delete()
                History.objects.all().delete()

                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "permissionError")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
