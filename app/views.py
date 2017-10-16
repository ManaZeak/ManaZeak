import json
import os
from builtins import print

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic.base import View
from django.views.generic.list import ListView

from app.controller import scanLibrary
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album, Library, Genre
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
        try:
            library = Library.objects.get(id=response['LIBRARY_ID'])
        except AttributeError:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
        if not os.path.isdir(library.path):
            return JsonResponse(errorCheckMessage(False, "dirNotFound"))

        playlist = Playlist()
        playlist.name = library.name
        playlist.user = request.user
        playlist.isLibrary = True
        playlist.save()
        data = scanLibrary(library, playlist, library.convertID3)
        playlist.isScanned = True
        print("Ended initial scan")
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
        'PLAYLIST_IS_LIBRARY':isLibrary,
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
            with open("Output.txt", "w") as text_file:
                text_file.write("%s" % tracks)
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


# Create a new library
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newLibrary(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            if 'URL' in response and 'NAME' in response and 'CONVERT' in response:
                tmp = response['URL']
            else:
                return JsonResponse(errorCheckMessage(False, "badFormat"))
            if not os.path.isdir(tmp):
                return JsonResponse(errorCheckMessage(False, "dirNotFound"))
            library = Library()
            library.path = response['URL']
            library.name = response['NAME']
            library.convertID3 = response['CONVERT']
            library.user = request.user

            library.save()
        except AttributeError:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
        data = {
            'LIBRARY_ID': library.id,
        }
        data = {**data, **errorCheckMessage(True, None)}
        return JsonResponse(data)


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
def getTrackPathByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        data = {}
        if 'TRACK_ID' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                track.playCounter += 1
                data = {
                    'PATH': track.location,
                    'COVER': track.coverLocation
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                errorCheckMessage(False, "dbError")

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
