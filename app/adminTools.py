import json
import os

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
        data = {
            'IS_ADMIN': request.user.is_superuser
        }
        data = {**data, **errorCheckMessage(True, None)}
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


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def checkNamingConventionArtistsOnPlaylist(request):
    data = {}
    if request.method == 'POST':
        user = request.user
        if user.is_superuser:
            response = json.loads(request.body)
            if 'PLAYLIST_ID' in response:
                playlistId = response['PLAYLIST_ID']
                data = set()
                if Playlist.objects.filter(id=playlistId).count() == 1:
                    tracks = Playlist.objects.get(id=playlistId).track.all()
                    for track in tracks:
                        path, fileName = os.path.split(track.location)
                        splicedName = fileName.split(" - ")
                        # Extracting artists
                        artists = splicedName[0]
                        splicedArtists = artists.split(",")
                        # Checking if the artists are in a good order
                        for i in range(len(splicedArtists) - 1):
                            artist1 = splicedArtists[i].rstrip().lstrip()
                            artist2 = splicedArtists[i + 1].rstrip().lstrip()
                            if artist1[0] > artist2[0]:
                                data.add(track)
                                break

                        # Checking if the title contains caps at the beginning of each word
                        fileName = splicedName[1]
                        words = fileName.split(" ")
                        for word in words:
                            if not word[0].isupper():
                                data.add(track)
                                break

                        # The tracks contains a featuring
                        if "(feat." in fileName:
                            feats = fileName.split("feat.")
                            for i in range(len(feats) - 1):
                                artist1 = feats[i].rstrip().lstrip()
                                artist2 = feats[i + 1].rstrip().lstrip()
                                if artist1[0] > artist2[0]:
                                    data.add(track)
                                    break
                    data = dict({'RESULT': data})
                    data = {**data, **errorCheckMessage(True, None)}
                else:
                    data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
