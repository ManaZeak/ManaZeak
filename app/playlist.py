import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.dao import updateTrackView, getPlaylistTracks
from app.models import Playlist, TrackView, Track
from app.utils import errorCheckMessage


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'NAME' in response:
            playlist = Playlist()
            playlist.name = strip_tags(response['NAME'])
            playlist.user = request.user
            playlist.save()
            data = {
                'PLAYLIST_ID': playlist.id,
                'NAME': playlist.name,
            }
            data = {**data, **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def deletePlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            user = request.user
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId, user=user).count() == 1:
                Playlist.objects.get(id=playlistId, user=user).delete()
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "permissionError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def renamePlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response and 'NAME' in response:
            user = request.user
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId, user=user).count() == 1:
                playlist = Playlist.objects.get(id=playlistId, user=user)
                playlist.name = strip_tags(response['NAME'])
                playlist.save()
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "permissionError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def addTracksToPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response and 'TRACKS_ID' in response:
            tracksId = response['TRACKS_ID']
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                tracks = Track.objects.filter(id__in=tracksId)
                addedTrack = len(tracks)
                for track in tracks:
                    playlist.track.add(track)
                data = {
                    'ADDED_TRACKS': addedTrack,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def removeTrackFromPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response and 'TRACKS_ID' in response:
            tracksId = response['TRACKS_ID']
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                tracks = Track.objects.filter(id__in=tracksId)
                removedTracks = len(tracks)
                for track in tracks:
                    playlist.track.remove(track)
                data = {
                    'REMOVED_TRACKS': removedTracks,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def simplePlaylistJsonGenerator():
    tracks = TrackView.objects.all()
    data = []
    for track in tracks:
        splicedArtistName = track.artist_name.split(",")
        splicedArtistId = track.artist_id.split(",")
        artists = []

        for artistId, artist in zip(splicedArtistId, splicedArtistName):
            artists.append({
                'ID': artistId,
                'NAME': artist,
            })

        data.append({
            'ID': track.track_id,
            'TITLE': track.track_title,
            'YEAR': track.track_year,
            'COMPOSER': track.track_composer,
            'PERFORMER': track.track_performer,
            'DURATION': track.track_duration,
            'BITRATE': track.track_bitrate,
            'COVER': track.track_cover,
            'ARTISTS': artists,
            'ALBUM': {
                'ID': track.album_id,
                'TITLE': track.album_title,
            },
            'GENRE': track.genre_name,
        })
    return data


# Load a library by returning simplified json
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def loadSimplifiedPlaylist(request):
    if request.method == 'POST':
        print("Getting json export of the library")
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
                playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
                updateTrackView(playlist.id)
                data = {**dict({'RESULT': simplePlaylistJsonGenerator()}), **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def lazyJsonGenerator(row):
    splicedArtistName = row[25].split(",")
    splicedArtistId = row[26].split(",")
    artists = []

    for artistId, artist in zip(splicedArtistId, splicedArtistName):
        artists.append({
            'ID': artistId,
            'NAME': artist,
        })

    data = {
        'ID': row[0],
        'TITLE': row[2],
        'YEAR': row[3],
        'COMPOSER': row[4],
        'PERFORMER': row[5],
        'BITRATE': row[10],
        'DURATION': row[13],
        'COVER': row[17],
        'ARTISTS': artists,
        'GENRE': row[23],
        'ALBUM': {
            'ID': row[24],
            'TITLE': row[21],
        },
    }
    return data


# Give 300 tracks of a playlist with an offset (REQ_NUMBER)
def lazyLoadingSimplifiedPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'REQ_NUMBER' in response and 'PLAYLIST_ID' in response:
            playlistId = strip_tags(response['PLAYLIST_ID'])
            reqNumber = strip_tags(response['REQ_NUMBER'])
            reqNumber *= 300
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                # Checking if the user is asking possible tracks
                if playlist.track.all().count() > reqNumber:
                    trackSet = getPlaylistTracks(playlistId)[reqNumber:reqNumber+300]
                    data = []
                    for row in trackSet:
                        data.append(lazyJsonGenerator(row))
                    data = dict({'RESULT': data})
                    data = {**data, **errorCheckMessage(True, None)}
                else:
                    data = errorCheckMessage(False, None)
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Send basic data about the playlist
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getPlaylistInfo(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                artists = set()
                genres = set()
                bitRate = 0
                for track in playlist.track:
                    artists.add(track.artist)
                    genres.add(track.genre)
                    bitRate += track.bitRate
                bitRate = bitRate / len(playlist.track)
                data = {
                    'TRACK_TOTAL': playlist.track.count(),
                    'ARTIST_TOTAL': len(artists),
                    'GENRE_TOTAL': len(genres),
                    'AVERAGE_BIT_RATE': bitRate,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Return all the id of the user playlists
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserPlaylists(request):
    if request.method == 'GET':
        user = request.user
        playlists = Playlist.objects.filter(user=request.user, isLibrary=False)
        playlistNames = []
        playlistIds = []
        isLibrary = []

        # Adding global libraries
        libraries = Playlist.objects.filter(isLibrary=True)
        for library in libraries:
            playlistNames.append(library.name)
            playlistIds.append(library.id)
            isLibrary.append(True)

        # Adding User playlists
        for playlist in playlists:
            playlistNames.append(playlist.name)
            playlistIds.append(playlist.id)
            isLibrary.append(False)

        if len(playlistIds) == 0:
            data = errorCheckMessage(False, None)
        else:
            data = {
                'NUMBER': len(playlistNames),
                'PLAYLIST_NAMES': playlistNames,
                'PLAYLIST_IDS': playlistIds,
                'PLAYLIST_IS_LIBRARY': isLibrary,
                'IS_ADMIN': user.is_superuser,
            }
            data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
