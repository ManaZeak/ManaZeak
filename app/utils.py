import os

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView

from app.controller import addTrackMP3, CRC32_from_file
from app.models import FileType, Track


# Render class for serving modal to client
class ScanModal(TemplateView):
    template_name = 'utils/modal.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(ScanModal, self).dispatch(*args, **kwargs)


def checkIfNotNone(trackAttribute):
    if trackAttribute is not None:
        return trackAttribute
    else:
        return "null"


def checkIfNotNoneNumber(trackAttribute):
    if trackAttribute is not None:
        return str(trackAttribute)
    else:
        return "\"null\""


def exportPlaylistToJson(playlist):
    tracks = playlist.track.all()
    finalData = "["
    for track in tracks:
        print(track.title)
        finalData += "{ \"ID\":"
        finalData += str(track.id)
        finalData += ", \"TITLE\":\""
        finalData += checkIfNotNone(track.title)
        finalData += "\", \"YEAR\":"
        finalData += checkIfNotNoneNumber(track.year)
        finalData += ", \"COMPOSER\":\""
        finalData += checkIfNotNone(track.composer)
        finalData += "\", \"PERFORMER\":\""
        finalData += checkIfNotNone(track.performer)
        finalData += "\", \"TRACK_NUMBER\":"
        finalData += checkIfNotNoneNumber(track.number)
        finalData += ", \"BPM\":"
        finalData += checkIfNotNoneNumber(track.bpm)
        finalData += ", \"LYRICS\":\""
        finalData += checkIfNotNone(track.lyrics)
        finalData += "\", \"COMMENT\":\""
        finalData += checkIfNotNone(track.comment)
        finalData += "\", \"BITRATE\":"
        finalData += checkIfNotNoneNumber(track.bitRate)
        finalData += ", \"SAMPLERATE\":"
        finalData += checkIfNotNoneNumber(track.sampleRate)
        finalData += ", \"DURATION\":"
        finalData += checkIfNotNoneNumber(track.duration)
        finalData += ", \"GENRE\":\""
        if track.genre is not None:
            finalData += checkIfNotNone(track.genre.name)
        else:
            finalData += "null"
        finalData += "\", \"FILE_TYPE\":\""
        finalData += checkIfNotNone(track.fileType.name)
        finalData += "\", \"DISC_NUMBER\":"
        finalData += checkIfNotNoneNumber(track.discNumber)
        finalData += ", \"SIZE\":"
        finalData += checkIfNotNoneNumber(track.size)
        finalData += ", \"LAST_MODIFIED\":\""
        finalData += checkIfNotNoneNumber(track.lastModified)
        finalData += "\", \"ARTISTS\":["
        for artist in track.artist.all():
            finalData += "{\"ID\":"
            finalData += str(artist.id)
            finalData += ", \"NAME\":\""
            finalData += checkIfNotNone(artist.name)
            finalData += "\"},"
        finalData = finalData[:-1]
        finalData += "], \"ALBUM\": { \"ID\":"
        finalData += checkIfNotNoneNumber(track.album.id)
        finalData += ", \"TITLE\":\""
        finalData += checkIfNotNone(track.album.title)
        finalData += "\", \"TOTAL_DISC\":"
        finalData += checkIfNotNoneNumber(track.album.totalDisc)
        finalData += ", \"TOTAL_TRACK\":"
        finalData += checkIfNotNoneNumber(track.album.totalTrack)
        finalData += ", \"ARTIST\":["
        for artist in track.album.artist.all():
            finalData += "{\"ID\":"
            finalData += checkIfNotNoneNumber(artist.id)
            finalData += ", \"NAME\":\""
            finalData += checkIfNotNone(artist.name)
            finalData += "\"},"
        finalData = finalData[:-1]
        finalData += "]}},"
    finalData = finalData[:-1]
    finalData += "]"
    print(finalData)
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
