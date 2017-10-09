import json
import os

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic.base import View
from django.views.generic.list import ListView

from app.controller import scanLibrary, badFormatError
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album, Library, Genre
from app.utils import exportPlaylistToJson, populateDB, exportPlaylistToSimpleJson


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        populateDB()
        return super(mainView, self).dispatch(*args, **kwargs)


def initialScan(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        library = None
        convert = False
        try:
            library = Library.objects.get(id=response['ID'])
            convert = response['CONVERT']
        except AttributeError:
            badFormatError()

        if not os.path.isdir(library.path):
            data = {
                'DONE': 'FAIL',
                'ERROR': 'No such directory',
            }
            return JsonResponse(data)

        playlist = Playlist()
        playlist.name = library.name
        playlist.user = request.user
        playlist.isLibrary = True
        playlist.save()
        data = scanLibrary(library, playlist, convert)
    else:
        data = {
            'DONE': 'FAIL',
            'ERROR': 'Bad request',
        }
    return JsonResponse(data)


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


def getUserPlaylists(request):
    playlists = Playlist.objects.filter(user=request.user)
    playlistNames = []
    playlistIds = []
    if not playlists:
        data = {
            'RESULT': 0,
        }
        return JsonResponse(data)
    for playlist in playlists:
        playlistNames.append(playlist.name)
        playlistIds.append(playlist.id)
    data = {
        'RESULT': len(playlistNames),
        'NAMES': playlistNames,
        'ID': playlistIds,
    }
    return JsonResponse(data)


def logoutView(request):
    logout(request)
    return render(request, 'user/login.html')


def loadSimplifiedLibrary(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'ID' not in response:
            badFormatError()
        if Playlist.objects.filter(id=response['ID']).count() == 1:
            playlist = Playlist.objects.get(id=response['ID'])
            tracks = exportPlaylistToSimpleJson(playlist)
            with open("Output.txt", "w") as text_file:
                text_file.write("%s" % tracks)
            return HttpResponse(tracks)
        else:
            data = {
                'RESULT': 'FAIL',
                'ERROR': 'DB error',
            }
            return JsonResponse(data)


def loadAllLibrary(request):
    tracks = Track.objects.all()
    playlist = Playlist()
    playlist.name = "default"
    playlist.user = request.user
    playlist.save()
    playlist.tracks = tracks
    data = {
        'LOADED': 'OK',
    }
    return JsonResponse(data)


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
            badFormatError()


# Create a new library
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newLibrary(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            tmp = ""
            if 'URL' in response:
                tmp = response['URL']
            if not os.path.isdir(tmp):
                data = {
                    'DONE': 'FAIL',
                    'ERROR': 'No such directory',
                }
                return JsonResponse(data)
            library = Library()
            library.path = response['URL']
            library.name = response['NAME']
            library.user = request.user
            library.save()
        except AttributeError:
            data = {
                'DONE': 'FAIL',
                'ERROR': 'Bad request',
            }
            return JsonResponse(data)
        data = {
            'DONE': 'OK',
            'ID': library.id,
        }
        return JsonResponse(data)


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
            badFormatError()


def getTrackPathByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'ID' in response:
            trackId = strip_tags(response['ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                data = {
                    'PATH': track.location,
                    'COVER': track.coverLocation
                }
            else:
                data = {
                    'DONE': 'FAIL',
                    'ERROR': 'DB error',
                }

        else:
            badFormatError()
        return JsonResponse(data)