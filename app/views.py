import json
import os

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic.base import View
from django.views.generic.list import ListView

from app.controller import addTrackMP3, scanLibrary
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album, Library
from app.utils import badFormatError


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(mainView, self).dispatch(*args, **kwargs)


def initialScan(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        print(response)
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
    print("hi")
    if request.method == 'POST':
        print("zob")
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
def loadTrackFromPlaylist(request):
    finalData = {}
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            print(response['ID'])
            playlist = Playlist.objects.get(id=response['ID'])
            tracks = playlist.track.all()
            # finalData = serialize('json', tracks)
            finalData = "["
            for track in tracks:
                finalData += "{ \"ID\":"
                finalData += str(track.id)
                finalData += ", \"TITLE\":\""
                if track.title is not None:
                    finalData += track.title
                else:
                    finalData += " "
                finalData += "\", \"YEAR\":"
                if track.year is not None:
                    finalData += str(track.year)
                else:
                    finalData += "0"
                finalData += ", \"COMPOSER\":\""
                if track.composer is not None:
                    finalData += track.composer
                else:
                    finalData += " "
                finalData += "\", \"PERFORMER\":\""
                if track.performer is not None:
                    finalData += track.performer
                else:
                    finalData += " "
                finalData += "\", \"TRACK_NUMBER\":"
                if track.number is not None:
                    finalData += str(track.number)
                else:
                    finalData += "0"
                finalData += ", \"BPM\":"
                if track.bpm is not None:
                    finalData += str(track.bpm)
                else:
                    finalData += "0"
                finalData += ", \"LYRICS\":\""
                if track.lyrics is not None:
                    finalData += track.lyrics
                else:
                    finalData += " "
                finalData += "\", \"COMMENT\":\""
                if track.comment is not None:
                    finalData += track.comment
                else:
                    finalData += " "
                finalData += "\", \"BITRATE\":"
                finalData += str(track.bitRate)
                finalData += ", \"SAMPLERATE\":"
                finalData += str(track.sampleRate)
                finalData += ", \"DURATION\":"
                finalData += str(track.duration)
                finalData += ", \"DISC_NUMBER\":"
                if track.discNumber is not None:
                    finalData += str(track.discNumber)
                else:
                    finalData += "0"
                finalData += ", \"SIZE\":"
                if track.size is not None:
                    finalData += str(track.size)
                else:
                    finalData += "0"
                finalData += ", \"LAST_MODIFIED\":\""
                finalData += str(track.lastModified)
                finalData += "\", \"ARTISTS\":["
                for artist in track.artist.all():
                    finalData += "{\"ID\":"
                    finalData += str(artist.id)
                    finalData += ", \"NAME\":\""
                    finalData += artist.name
                    finalData += "\"},"
                finalData = finalData[:-1]
                finalData += "], \"ALBUM\": { \"ID\":"
                finalData += str(track.album.id)
                finalData += ", \"TITLE\":\""
                if track.album.title is not None:
                    finalData += track.album.title
                else:
                    finalData += " "
                finalData += "\", \"NUMBER_OF_DISC\":"
                if track.album.numberOfDisc is not None:
                    finalData += str(track.album.numberOfDisc)
                else:
                    finalData += "0"
                finalData += ", \"NUMBER_TOTAL_TRACK\":"
                if track.album.numberTotalTrack is not None:
                    finalData += str(track.album.numberTotalTrack)
                else:
                    finalData += "0"
                finalData += ", \"ARTIST\":["
                for artist in track.album.artist.all():
                    finalData += "{\"ID\":"
                    finalData += str(artist.id)
                    finalData += ", \"NAME\":\""
                    finalData += artist.name
                    finalData += "\"},"
                finalData = finalData[:-1]
                finalData += "]}},"
            finalData = finalData[:-1]
            finalData += "]"
            print(finalData)

        except AttributeError:
            badFormatError()
    return HttpResponse(finalData)


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
