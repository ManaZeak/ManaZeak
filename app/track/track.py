import hashlib
import json
import zipfile

import os
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
        'PLAY_COUNTER': track.playCounter,
        'FILENAME': os.path.basename(track.location)
    }
    return data


# Get all the information about a track
@login_required(redirect_field_name='login.html', login_url='app:login')
def getTracksDetailedInfo(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackIds = response['TRACK_ID']
            trackInfo = []
            for trackId in trackIds:
                if Track.objects.filter(id=trackId).count() == 1:
                    trackInfo.append(exportTrackInfo(Track.objects.get(id=trackId)))
                else:
                    data = errorCheckMessage(False, "dbError")
                    return JsonResponse(data)
            data = {**dict({'RESULT': trackInfo}), ** errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Download the given song
@login_required(redirect_field_name='login.html', login_url='app:login')
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


# Download a zip of different song
@login_required(redirect_field_name='login.html', login_url='app:login')
def multiTrackDownload(request):
    if request.method == "POST":
        response = json.loads(request.body)
        if 'IDS' in response:
            trackIds = response['IDS']
            # TODO : create admin option max number of sound to download
            if len(trackIds) > 50:
                return JsonResponse(errorCheckMessage(False, ""))
            locations = []

            # Getting tracks requested by the user
            for trackId in trackIds:
                if Track.objects.filter(id=trackId).count() == 1:
                    track = Track.objects.get(id=trackId)
                    locations.append(track.location)
            archiveName = hashlib.md5("".join(tmp) for tmp in locations)

            # Checking if the output folder for the zip exists
            if not os.path.isdir("/static/zip"):
                try:
                    os.makedirs("/static/zip")
                except OSError:
                    return JsonResponse(errorCheckMessage(False, "dirCreationError"))

            # Creating archive
            archiveName = os.path.join("/static/zip", archiveName)
            archive = zipfile.ZipFile(archiveName)
            for location in locations:
                archive.write(location, os.path.basename(location), compress_type=zipfile.ZIP_DEFLATED)

            data = {**{'PATH': archive, }, **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
