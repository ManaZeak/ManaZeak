import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.models import Track
from app.utils import errorCheckMessage


# Scan all the attributes of an MP3 track, and add it to base.
def exportTrackInfo(track):
    if track.genre is not None:
        genre = track.genre.name
    else:
        genre = None

    artists = []
    for artist in track.artist.all():
        artists.append({
            'ID': artist.id,
            'NAME': artist.name,
        })

    album = {}
    if track.album is not None:
        albumArtists = []
        for artist in track.album.artist.all():
            albumArtists.append({
                'ID': artist.id,
                'NAME': artist.name,
            })
        album = {
            'ID': track.album.id,
            'TITLE': track.album.title,
            'TOTAL_DISC': track.album.totalDisc,
            'TOTAL_TRACK': track.album.totalTrack,
            'ARTISTS': albumArtists,
        }

    data = {
        'ID': track.id,
        'TITLE': track.title,
        'YEAR': track.year,
        'COMPOSER': track.composer,
        'PERFORMER': track.performer,
        'TRACK_NUMBER': track.number,
        'BPM': track.bpm,
        'LYRICS': track.lyrics,
        'COMMENT': track.comment,
        'BITRATE': track.bitRate,
        'SAMPLERATE': track.sampleRate,
        'DURATION': track.duration,
        'GENRE': genre,
        'FILE_TYPE': track.fileType.name,
        'DISC_NUMBER': track.discNumber,
        'SIZE': track.size,
        'LAST_MODIFIED': track.lastModified,
        'COVER': track.coverLocation,
        'ARTISTS': artists,
        'ALBUM': album,
    }
    return data


# Get all the information about a track
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getTrackDetailedInfo(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                data = {**dict({'RESULT': exportTrackInfo(track)}), **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Download the given song
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getDownloadLocation(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                track.downloadCounter += 1
                track.save()
                data = {
                    'PATH': track.location,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
