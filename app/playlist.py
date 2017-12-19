import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.dao import updateTrackView
from app.models import Playlist, TrackView
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
                data = dict({'RESULT': simplePlaylistJsonGenerator()})
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
    print("getting usr playlist")
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
        return JsonResponse(errorCheckMessage(False, None))

    data = {
        'NUMBER': len(playlistNames),
        'PLAYLIST_NAMES': playlistNames,
        'PLAYLIST_IDS': playlistIds,
        'PLAYLIST_IS_LIBRARY': isLibrary,
        'IS_ADMIN': user.is_superuser,
    }
    data = {**data, **errorCheckMessage(True, None)}
    return JsonResponse(data)
