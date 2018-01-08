import json
import os

import requests
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.models import Track, Artist, Album, Playlist, Library, Genre, Shuffle, UserHistory, Stats, History, \
    AdminOptions
from app.utils import errorCheckMessage


def getAdminOptions():
    # If a abnormal number of admin options
    if AdminOptions.objects.all().count() > 1:
        AdminOptions.objects.all().delete()

    # If no admin options exists
    if AdminOptions.objects.all().count() == 0:
        adminOptions = AdminOptions()
        adminOptions.save()

    # If a normal number of admin options exists
    else:
        adminOptions = AdminOptions.objects.all().first()
    return adminOptions


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getAdminView(request):
    if request.method == 'GET':
        admin = request.user
        if admin.is_superuser:
            adminOptions = getAdminOptions()
            users = User.objects.all()
            userInfo = []
            for user in users:
                userInfo.append({
                    'NAME': user.username,
                    'ADMIN': user.is_superuser,
                    'ID': user.id,
                })
            data = dict({'USER': userInfo})
            libraryInfo = []
            for library in Library.objects.all():
                libraryInfo.append({
                    'NAME': library.name,
                    'ID': library.id,
                })
            data = {**data, **dict({'LIBRARIES': libraryInfo})}
            data = {**data, **{'SYNC_KEY': adminOptions.syncthingKey}}
            data = {**data, **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def removeAllMoods(request):
    if request.method == 'GET':
        admin = request.user
        if admin.is_superuser:
            moodbars = "/ManaZeak/static/mood/"
            for mood in os.listdir(moodbars):
                os.remove(os.path.join(moodbars, mood))
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def removeUserById(request):
    if request.method == 'POST':
        admin = request.user
        if admin.is_superuser:
            response = json.loads(request.body)
            if 'USER_ID' in response:
                userId = strip_tags(response['USER_ID'])
                if User.objects.filter(id=userId).count() == 1:
                    User.objects.get(id=userId).delete()
                    data = errorCheckMessage(True, None)
                else:
                    data = errorCheckMessage(False, "dbError")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def syncthingRescan(request):
    if request.method == 'GET':
        admin = request.user
        if admin.is_superuser:
            headers = {'X-API-Key': AdminOptions.objects.all().first().syncthingKey}
            req = requests.post('http://st:8384/rest/db/scan', headers=headers)
            if req.status_code == 200:
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "syncthingError")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def changeAdminOptions(request):
    if request.method == 'POST':
        admin = request.user
        if admin.is_superuser:
            response = json.loads(request)
            if 'SYNC_KEY' in response:
                adminOptions = getAdminOptions()
                syncKey = strip_tags(response['SYNC_KEY'])
                if syncKey != adminOptions.syncthingKey:
                    adminOptions.syncthingKey = syncKey
                    adminOptions.save()
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "badFormat")
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
