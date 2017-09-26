# import eyed3
import os
import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic.base import TemplateView, View
from django.views.generic.list import ListView

import app
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
    absolutePath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    library = os.path.join(absolutePath, 'static/audio')
    if not os.path.isdir(library):
        data = {
            'DONE': 'FAIL',
            'ERROR': 'No such directory',
        }
        return JsonResponse(data)
    failedItems = []

    for root, dirs, files in os.walk(library):
        for file in files:
            if file.lower().endswith('.mp3'):
                addTrackMP3(root, file)

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
    data = {
        'DONE': "OK",
        'FAILS': failedItems,
    }
    return JsonResponse(data)


def dropAllDB(request):
    if request.user.is_authenticated():
        tracks = Track.objects.all()
        artists = Artist.objects.all()
        albums = Album.objects.all()
        playlists = Playlist.objects.all()
        for track in tracks:
            track.delete()
        for artist in artists:
            artist.delete()
        for album in albums:
            album.delete()
        for playlist in playlists:
            playlist.delete()
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
            return render(request, 'index.html')
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

    # Recieve the filled out form
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


class viewDB(TemplateView):
    template_name = 'db.html'


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
        print('Raw Data: "%s"' % request.body)
        playlist = Playlist.objects.get(id=4)  # TODO : GET this from html
        tracks = playlist.track.all()

        data = {'RESULT': len(tracks)}
        for track in tracks:
            artistsQuerySet = track.artist.all()
            artists = []
            for artist in artistsQuerySet:
                artists.append(artist.name)
            tmp = {
                track.id: {
                    'TITLE': track.title,
                    'YEAR': track.year,
                    'COMPOSER': track.composer,
                    'PERFORMER': track.composer,
                    'NUMBER': track.number,
                    'BPM': track.bpm,
                    'LYRICS': track.lyrics,
                    'COMMENT': track.comment,
                    'BITRATE': track.bitRate,
                    'SAMPLERATE': track.sampleRate,
                    'DURATION': track.duration,
                    'DISCNUMBER': track.discNumber,
                    'SIZE': track.size,
                    'LASTMODIFIED': track.lastModified,
                    'ARTIST': artists,
                    # 'ALBUM': track.album.title,
                    # 'FILETYPE': track.fileType.name,
                }
            }
            finalData = {**data, **tmp}
            data = finalData
    return JsonResponse(finalData)


@login_required(redirect_field_name='login.html', login_url='app:login')
def setLibraryPath(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            if not os.path.isdir(response["URL"]):
                data = {
                    'DONE': 'FAIL',
                    'ERROR': 'No such directory',
                }
                return JsonResponse(data)
            library = Library()
            library.path = response["URL"]
            library.name = response["NAME"]
            library.user = request.user
            library.save()
        except AttributeError:
            data = {
                'DONE': 'FAIL',
                'ERROR': 'Bad request',
            }
            return JsonResponse(data)
        data = {
            'DONE': 'OK'
        }
        return JsonResponse(data)