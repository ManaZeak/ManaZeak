# import eyed3
import os

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.generic.base import TemplateView, View
from django.views.generic.list import ListView

from app.controller import addTrackMP3
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    def get_context_data(self, **kwargs):
        ctx = super(mainView, self).get_context_data(**kwargs)
        if self.request.user.is_authenticated():
            ctx = Track.objects.all()
        return ctx


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
        for track in tracks:
            track.delete()
        for artist in artists:
            artist.delete()
        for album in albums:
            album.delete()
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


def logoutView(request):
    logout(request)
    return render(request, 'login.html')

class viewDB(TemplateView):
    template_name = 'db.html'
