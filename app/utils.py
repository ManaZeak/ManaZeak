import os

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from mutagen.mp3 import MP3

from app.controller import addTrackMP3, CRC32_from_file
from app.models import FileType, Track


# Render class for serving modal to client
class ScanModal (TemplateView):
    template_name = 'utils/modal.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(ScanModal, self).dispatch(*args, **kwargs)


def exportPlaylistToJson(playlist):
    tracks = playlist.track.all()
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
            finalData += "-1"
        finalData += ", \"COMPOSER\":\""
        if track.composer is not None:
            finalData += track.composer
        else:
            finalData += "-1"
        finalData += "\", \"PERFORMER\":\""
        if track.performer is not None:
            finalData += track.performer
        else:
            finalData += "-1"
        finalData += "\", \"TRACK_NUMBER\":"
        if track.number is not None:
            finalData += str(track.number)
        else:
            finalData += "-1"
        finalData += ", \"BPM\":"
        if track.bpm is not None:
            finalData += str(track.bpm)
        else:
            finalData += "-1"
        finalData += ", \"LYRICS\":\""
        if track.lyrics is not None:
            finalData += track.lyrics
        else:
            finalData += "-1"
        finalData += "\", \"COMMENT\":\""
        if track.comment is not None:
            finalData += track.comment
        else:
            finalData += "-1"
        finalData += "\", \"BITRATE\":"
        finalData += str(track.bitRate)
        finalData += ", \"SAMPLERATE\":"
        finalData += str(track.sampleRate)
        finalData += ", \"DURATION\":"
        finalData += str(track.duration)
        finalData += ", \"GENRE\":\""
        if track.genre.name is not None:
            finalData += track.genre.name
        else:
            finalData += "-1"
        finalData += "\", \"FILE_TYPE\":\""
        finalData += track.fileType.name
        finalData += "\", \"DISC_NUMBER\":"
        if track.discNumber is not None:
            finalData += str(track.discNumber)
        else:
            finalData += "-1"
        finalData += ", \"SIZE\":"
        if track.size is not None:
            finalData += str(track.size)
        else:
            finalData += "-1"
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
            finalData += "-1"
        finalData += "\", \"TOTAL_DISC\":"
        if track.album.totalDisc is not None:
            finalData += str(track.album.totalDisc)
        else:
            finalData += "-1"
        finalData += ", \"TOTAL_TRACK\":"
        if track.album.totalTrack is not None:
            finalData += str(track.album.totalTrack)
        else:
            finalData += "-1"
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
    return finalData


def populateDB():
    if FileType.objects.all().count() == 0:
        fileType = FileType(name="mp3")
        fileType.save()
        fileType = FileType(name="ogg")
        fileType.save()
        fileType = FileType(name="flac")
        fileType.save()
        fileType = FileType(name="wav")
        fileType.save()


# Compare the file by hash (faster than reading the tag)
def compareTrackAndFile(track, root, file, playlist, convert, fileTypeId, replacedTitles):
    fileCRC = CRC32_from_file(root + "/" + file)
    if fileCRC != track.CRC:
        replacedTitles.append(track.title)
        track.delete()
        addTrackMP3(root, file, playlist, convert, fileTypeId)
    else:
        track.scanned = True


# TODO: remove the file in DB that have been removed
def rescanLibrary(library):
    playlist = library.playlist
    convert = False
    mp3ID = FileType.objects.get(name="mp3")
    replacedTitles = []
    for root, dirs, files in os.walk(library.path):
        for file in files:
            if file.lower().endswith('.mp3'):
                track = Track.objects.get(location=root + file)
                if track is None:
                    addTrackMP3(root, file, playlist, convert, mp3ID)
                else:
                    compareTrackAndFile(track, root, file, playlist, convert, mp3ID, replacedTitles)
    # Removed the tracks that haven't been scanned
    removedTracks = playlist.track.filter(scanned=False).delete()
    return [replacedTitles, removedTracks]

