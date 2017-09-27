import json
import os

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.core.serializers import serialize
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic.base import TemplateView, View
from django.views.generic.list import ListView

from app.controller import addTrackMP3
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album, Library


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    @method_decorator(login_required(redirect_field_name='login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(mainView, self).dispatch(*args, **kwargs)


def initialScan(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        print(response)
        try:
            library = Library.objects.get(id=response['ID'])
            convert = response['CONVERT']
        except AttributeError:
            data = {
                'DONE': 'FAIL',
                'ERROR': 'Bad format',
            }
            return JsonResponse(data)

        # Old way to get the library
        # absolutePath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # library = os.path.join(absolutePath, 'static/audio')
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
        failedItems = []
        for root, dirs, files in os.walk(library.path):
            for file in files:
                if file.lower().endswith('.mp3'):
                    addTrackMP3(root, file, playlist, convert)

                elif file.lower().endswith('.ogg'):
                    track = Track()
                    track.location = root + "/" + file

                elif file.lower().endswith('.flac'):
                    track = Track()
                    track.location = root + "/" + file

                elif file.lower().endswith('.wav'):
                    track = Track()
                    track.location = root + "/" + file

                else:
                    failedItems.append(file)

                    # track.title =
                    # track.bitRate =
                    # track.composer = audioFile.frame.
                    # track.performer =
                    # track.number =
                    # track.bpm =
                    # track.lyrics =
                    # track.comment =
                    # track.sampleRate =
                    # track.discNumber =
                    # track.size =
                    # track.numberTotalTrack
                    # track.artist =
                    # track.album =
                    # track.genre =
                    # track.fileType =
        # addTracksInDB(tracks)
        library.playlist = playlist
        library.save()
        data = {
            'DONE': 'OK',
            'ID': playlist.id,
            'FAILS': failedItems,
        }
    else:
        data = {
            'DONE': 'FAIL',
            'ERROR': 'Bad request',
        }
    return JsonResponse(data)


def dropAllDB(request):
    if request.user.is_authenticated():
        tracks = Track.objects.all()
        artists = Artist.objects.all()
        albums = Album.objects.all()
        playlists = Playlist.objects.all()
        libraries = Library.objects.all()
        for track in tracks:
            track.delete()
        for artist in artists:
            artist.delete()
        for album in albums:
            album.delete()
        for playlist in playlists:
            playlist.delete()
        for library in libraries:
            library.delete()
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
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return render(request, 'index.html')  # TODO : fix URL
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})


class UserFormLogin(View):
    form_class = UserForm
    template_name = 'login.html'

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
    return render(request, 'login.html')


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


def loadTrackFromPlaylist(request):
    finalData = {}
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            print(response['ID'])
            playlist = Playlist.objects.get(id=response['ID'])
            tracks = playlist.track.all()
            finalData = serialize('json', tracks)
        except AttributeError:
            data = {
                'RESULT': 'FAIL',
                'ERROR': 'Bad format'
            }
            return JsonResponse(data)
    return HttpResponse(finalData)


@login_required(redirect_field_name='login.html', login_url='app:login')
def setLibraryPath(request):
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


def getTracksArtists(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            artistIds = response['ARTISTS']
            artists = Artist.objects.filter(id__in=artistIds)
            data = serialize('json', artists)
        except AttributeError:
            data = {
                'DONE': 'FAIL',
                'Error': 'Bad request',
            }
            return JsonResponse(data)
        return HttpResponse(data)
