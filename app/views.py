import json
import os
from builtins import print
from random import randint

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic.base import View
from django.views.generic.list import ListView

from app.controller import scanLibrary, shuffleSoundSelector
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album, Library, Genre, Shuffle, Stats
from app.utils import exportPlaylistToJson, populateDB, exportPlaylistToSimpleJson, errorCheckMessage


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        populateDB()
        return super(mainView, self).dispatch(*args, **kwargs)


# Perform the initial scan for a library
def initialScan(request):
    print("Asked for initial scan")
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'LIBRARY_ID' in response:
            library = Library.objects.get(id=response['LIBRARY_ID'])
            if os.path.isdir(library.path):
                playlist = Playlist()
                playlist.name = library.name
                playlist.user = request.user
                playlist.isLibrary = True
                playlist.save()
                data = scanLibrary(library, playlist, library.convertID3)
                print("Ended initial scan")
                playlist.isScanned = True
            else:
                data = errorCheckMessage(False, "dirNotFound")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Drop all database, used for debug
def dropAllDB(request):
    if request.user.is_authenticated():
        Track.objects.all().delete()
        Artist.objects.all().delete()
        Album.objects.all().delete()
        Playlist.objects.all().delete()
        Library.objects.all().delete()
        Genre.objects.all().delete()
        data = {
            'DROPPED': "OK",
        }
        return JsonResponse(data)
    else:
        data = {
            'DROPPED': 'KO'
        }
        return JsonResponse(data)


# Create a new user in database
def createUser(request):
    print("hi")
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            user.save()
            login(request, user)
            return render(request, 'index.html')  # TODO : fix URL
    else:
        form = UserCreationForm()
    return render(request, 'user/signup.html', {'form': form})


# Render the user form login views
class UserFormLogin(View):
    form_class = UserForm
    template_name = 'user/login.html'

    # Display the blank form
    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    # Receive the filled out form
    def post(self, request):
        form = self.form_class(request.POST)
        username = form.data['username']
        password = form.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('app:index')

        return render(request, self.template_name, {'form': form})


# Log out the user
def logoutView(request):
    logout(request)
    return render(request, 'user/login.html')


# Return all the id of the user playlists
def getUserPlaylists(request):
    playlists = Playlist.objects.filter(user=request.user)
    playlistNames = []
    playlistIds = []
    isLibrary = []
    if not playlists:
        return JsonResponse(errorCheckMessage(False, None))
    for playlist in playlists:
        playlistNames.append(playlist.name)
        playlistIds.append(playlist.id)
        isLibrary.append(playlist.isLibrary)
    data = {
        'NUMBER': len(playlistNames),
        'PLAYLIST_NAMES': playlistNames,
        'PLAYLIST_IDS': playlistIds,
        'PLAYLIST_IS_LIBRARY': isLibrary,
    }
    data = {**data, **errorCheckMessage(True, None)}
    return JsonResponse(data)


# Load a library by returning simplified json
def loadSimplifiedLibrary(request):
    if request.method == 'POST':
        print("Getting json export of the library")
        response = json.loads(request.body)
        if 'PLAYLIST_ID' not in response:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
        if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
            playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
            tracks = exportPlaylistToSimpleJson(playlist)
            return HttpResponse(tracks)
        else:
            return JsonResponse(errorCheckMessage(False, "dbError"))


# Get all track information from a playlist and format it as json
def loadTracksFromPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            playlist = Playlist.objects.get(id=response['ID'])
            tmp = exportPlaylistToJson(playlist)
            # playlist.jsonInfo = tmp
            # playlist.save()
            return HttpResponse(tmp)

        except AttributeError:
            return JsonResponse(errorCheckMessage(False, "badFormat"))


# Create a new library can only be done while being a superuser.
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newLibrary(request):
    if request.method == 'POST':
        if request.user.is_superuser:
            response = json.loads(request.body)

            try:
                if 'URL' in response and 'NAME' in response and 'CONVERT' in response:
                    dirPath = response['URL']
                else:
                    return JsonResponse(errorCheckMessage(False, "badFormat"))
                if not os.path.isdir(dirPath):
                    return JsonResponse(errorCheckMessage(False, "dirNotFound"))
                # Removing / at the end of the dir path if present
                if dirPath.endswith("/"):
                    dirPath = dirPath[:-1]
                library = Library()
                library.path = dirPath
                library.name = strip_tags(response['NAME'])
                library.convertID3 = response['CONVERT']
                library.user = request.user
                library.save()
            except AttributeError:
                return JsonResponse(errorCheckMessage(False, "badFormat"))
            data = {
                'LIBRARY_ID': library.id,
                'NAME': library.name,
            }
            data = {**data, **errorCheckMessage(True, None)}
            return JsonResponse(data)
        return JsonResponse(errorCheckMessage(False, "permissionError"))
    return JsonResponse(errorCheckMessage(False, "badRequest"))


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            if 'NAME' in response:
                playlist = Playlist()
                playlist.name = strip_tags(response['NAME'])
                playlist.user = request.user
                playlist.save()
                data = {
                    'ID': playlist.id,
                    'NAME': playlist.name,
                }
                return JsonResponse(data)
        except AttributeError:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))


# Change the meta of a file inside it and in database
# TODO : change JSON keys for matching convention
def changeMetaData(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        # TODO: test with a table and see if "for in" works, if doesn't work create while loop
        if 'ID' in response:
            trackId = strip_tags(response['ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                if 'TITLE' in response:
                    track.title = response['TITLE']
            else:
                data = {
                    'DONE': 'FAIL',
                    'ERROR': 'DB error',
                }
                return JsonResponse(data)
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))


# Return the link to a track with a track id
# TODO: understand what happen when spammed (duped listening counters) lock?
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getTrackPathByID(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                # Save the general play count
                track = Track.objects.get(id=trackId)
                track.playCounter += 1
                track.save()
                # Save the counter for the user
                if Stats.objects.filter(user=user, track=track).count() == 0:
                    stat = Stats(user=user, track=track, playCounter=1)
                else:
                    stat = Stats.objects.get(user=user, track=track)
                    stat.playCounter += 1
                stat.save()
                print("PATH : " + track.location)
                data = {
                    'PATH': track.location,
                    'COVER': track.coverLocation
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")

        else:
            data = errorCheckMessage(False, "badFormat")
        return JsonResponse(data)


# Return if a library has finished to be scanned
def checkLibraryScanStatus(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
                playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
                print("Playlist status : " + str(playlist.isScanned))
                data = errorCheckMessage(playlist.isScanned, None)
            else:
                data = errorCheckMessage(False, "dbError")
            return JsonResponse(data)
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    return JsonResponse(errorCheckMessage(False, "badRequest"))


def shuffleNextTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            if Shuffle.objects.filter(playlist=response['PLAYLIST_ID'], user=request.user).count() == 1:
                shuffle = Shuffle.objects.get(playlist=response['PLAYLIST_ID'], user=request.user)
            else:
                shuffle = Shuffle(playlist=response['PLAYLIST_ID'], user=request.user)
            track = shuffleSoundSelector(shuffle)
            shuffle.tracksPlayed.add(track)
            shuffle.save()
            if Track.objects.filter(track=track).count() == 1:
                data = {
                    'PATH': track.location,
                    'COVER': track.coverLocation
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
            return JsonResponse(data)
        return JsonResponse(errorCheckMessage(False, "badFormat"))
    return JsonResponse(errorCheckMessage(False, "badRequest"))


def getMoodbarByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackID = response['TRACK_ID']
            if Track.objects.filter(id=trackID).count() == 1:
                track = Track.objects.get(id=trackID)
                print(track.moodbar)
                data = {
                    'MOOD': track.moodbar,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserStats(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user


def randomNextTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            playlistID = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistID).count() == 1:
                playlist = Playlist.objects.get(id=playlistID)
                rangeRand = playlist.track.count()
                selectedTrack = randint(0, rangeRand)
                count = 0
                for track in playlist.track.all():
                    if count == selectedTrack:
                        data = {
                            'TRACK_ID': track.id,
                            'PATH': track.location,
                            'COVER': track.coverLocation
                        }
                        data = {**data, **errorCheckMessage(True, None)}
                        return JsonResponse(data)
                    else:
                        count += 1
            return JsonResponse(errorCheckMessage(False, "dbError"))
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))
