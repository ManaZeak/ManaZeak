# import eyed3
import os

import eyed3
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
    tracks = []

    for root, dirs, files in os.walk(library):
        for file in files:
            if file.lower().endswith(('.mp3', '.ogg', '.flac', '.wav')):
                track = Track()
                track.location = root + "/" + file
                audioFile = eyed3.load(root + "/" + file)
                track.title = audioFile.tag.title
                track.year = audioFile.tag.getBestDate().year
                # track.composer = audioFile.frame.
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
    data = {
        'OK': "OK",
    }
    return JsonResponse(data)
