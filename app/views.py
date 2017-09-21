# import eyed3
import os

from django.http import JsonResponse
from django.views.generic.list import ListView

from app.controller import addTrackMP3
from app.models import Playlist, Track, Artist


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist


def initialScan(request):
    absolutePath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    library = os.path.join(absolutePath, 'static/audio')

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
                print("FAIL!")

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
        'OK': "OK",
    }
    return JsonResponse(data)


def dropAllDB(request):
    tracks = Track.objects.all()
    artists = Artist.objects.all()
    for track in tracks:
        track.delete()
    for artist in artists:
        artist.delete()
    data = {
        'DROPPED': "OK",
        }
    return JsonResponse(data)

