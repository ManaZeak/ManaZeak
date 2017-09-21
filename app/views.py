# import eyed3
import os

from mutagen.mp3 import MP3
from mutagen.id3 import ID3
from django.views.generic.list import ListView
from django.http import JsonResponse

from app.dao import addTracksInDB, removeTracksInDB
from app.models import Playlist, Track, Artist


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist


def initialScan(request):
    absolutePath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    library = os.path.join(absolutePath, 'static/audio')
    tracks = []

    for root, dirs, files in os.walk(library):
        for file in files:
            if file.lower().endswith('.mp3'):
                track = Track()
                # --- FILE INFORMATION --- #
                audioFile = MP3(root + "/" + file)
                track.location = root + "/" + file
                track.bitRate = audioFile.info.bitrate
                track.duration = audioFile.info.length
                track.sampleRate = audioFile.info.sample_rate
                track.bitRateMode = audioFile.info.bitrate_mode

                # --- FILE TAG --- #
                audioTag = ID3(root + "/" + file)
                track.title = audioTag['TIT2'].text[0]

                # Check if album exists
                num_results = Artist.objects.filter(name=audioTag['TPE1']).count()
                if num_results == 0:
                    artist = Artist()
                    artist.name = audioTag['TPE1']
                    artist.save()
                    artist = Artist.objects.filter(name=audioTag['TPE1'])
                    track.artist = artist
                else:
                    artist = Artist.objects.filter(name=audioTag['TPE1'])
                    track.artist = artist
                tracks.append(track)

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
                # track.year =
                # track.bitRate =
                # track.composer = audioFile.frame.
                # track.performer =
                # track.number =
                # track.bpm =
                # track.lyrics =
                # track.comment =
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
    addTracksInDB(tracks)
    data = {
        'OK': "OK",
    }
    return JsonResponse(data)
