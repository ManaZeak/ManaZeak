# import eyed3
import os

from django.views.generic.list import ListView
from django.http import JsonResponse
from os import listdir
from os.path import isfile, join

from app.dao import addTracksInDB, removeTracksInDB
from app.models import Playlist, Track


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist


def initialScan(request):
    absolutePath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    library = os.path.join(absolutePath, 'static/audio')
    tracks = [Track()]

    for root, dirs, files in os.walk(library):
        for file in files:
            track = Track()

            if file.lower().endswith(('.mp3', '.ogg', '.flac', '.wav')):
                track.location = root + "\\" + file
                track.title = file  # REPLACE BY TAG
                # track.year =
                # track.composer =
                # track.performer =
                # track.number =
                # track.bpm =
                # track.lyrics =
                # track.comment =
                # track.bitRate =
                # track.sampleRate =
                # track.duration =
                # track.discNumber =
                # track.size =
                # track.numberTotalTrack
                # track.lastModified =
                # track.artist =
                # track.album =
                # track.genre =
                # track.fileType =
                # read metadata here
                # print(root+"\\"+file)
                tracks.append(track)

    addTracksInDB(tracks)
    # track_path = os.path.join(library, onlyFiles[1])
    # audio_file = eyed3.load(track_path)
    # audio_file.tag.artist = u"Zobar2k"
    # audio_file.tag.save()
    data = {
        'OK': "OK",
    }
    return JsonResponse(data)
