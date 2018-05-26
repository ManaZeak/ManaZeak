import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.dao import getPlaylistTracks, createViewForLazy, lazyJsonGenerator
from app.models import Playlist, Track
from app.utils import errorCheckMessage, checkPermission


# Create an empty playlist
@login_required(redirect_field_name='login.html', login_url='app:login')
def newPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["PLST"], user):
            if 'PLAYLIST_NAME' in response:
                playlist = Playlist()
                playlist.name = strip_tags(response['PLAYLIST_NAME'])
                playlist.user = request.user
                playlist.save()
                data = {
                    'PLAYLIST_ID': playlist.id,
                    'PLAYLIST_NAME': playlist.name,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Rename user's playlist
@login_required(redirect_field_name='login.html', login_url='app:login')
def renamePlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response and 'PLAYLIST_NAME' in response:
            user = request.user
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId, user=user).count() == 1:
                playlist = Playlist.objects.get(id=playlistId, user=user)
                if (checkPermission(["PLST"], user) and not playlist.isLibrary) \
                        or (playlist.isLibrary and checkPermission(["LIBR"], user)):
                    playlist.name = strip_tags(response['PLAYLIST_NAME'])
                    playlist.save()
                    data = {
                        'PLAYLIST_ID': playlist.id,
                        'PLAYLIST_NAME': playlist.name,
                    }
                    data = {**data, **errorCheckMessage(True, None)}
                else:
                    data = errorCheckMessage(False, "permissionError")
            else:
                data = errorCheckMessage(False, "permissionError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Add a track to a user playlist
@login_required(redirect_field_name='login.html', login_url='app:login')
def addTracksToPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if 'PLAYLIST_ID' in response and 'TRACKS_ID' in response:
            tracksId = response['TRACKS_ID']
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)

                # Checking permissions
                if not playlist.isLibrary and checkPermission(["PLST"], user) and playlist.user == user:
                    tracks = Track.objects.filter(id__in=tracksId)
                    for track in tracks:
                        playlist.track.add(track)
                    # Set rescan flag for view generation
                    playlist.refreshView = True
                    playlist.save()
                    data = errorCheckMessage(True, None)
                else:
                    data = errorCheckMessage(False, "permissionError")
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Remove a table of tracks from a playlist
@login_required(redirect_field_name='login.html', login_url='app:login')
def removeTracksFromPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if 'PLAYLIST_ID' in response and 'TRACKS_ID' in response:
            tracksId = response['TRACKS_ID']
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                if checkPermission(["PLST"], user) and user == playlist.user and not playlist.isLibrary:
                    tracks = Track.objects.filter(id__in=tracksId)
                    for track in tracks:
                        playlist.track.remove(track)
                    data = errorCheckMessage(True, None)
                else:
                    data = errorCheckMessage(False, "permissionError")
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# TODO : test for the best value for the number of element in the JSON
# Give 300 tracks of a playlist with an offset (REQ_NUMBER)
@login_required(redirect_field_name='login.html', login_url='app:login')
def simplifiedLazyLoadingPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'REQUEST_NUMBER' in response and 'PLAYLIST_ID' in response:
            playlistId = strip_tags(response['PLAYLIST_ID'])
            try:
                reqNumber = int(strip_tags(response['REQUEST_NUMBER']))
            except ValueError:
                return JsonResponse(errorCheckMessage(False, "valueError"))
            nbTracks = 300
            reqNumber *= nbTracks
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                # Checking if it's the first request for creating the view
                user = request.user
                if reqNumber == 0:
                    # Checking if the user can display the asked playlist
                    if playlist.user == user or playlist.isLibrary:
                        if playlist.refreshView:
                            createViewForLazy(playlist)
                    else:
                        return JsonResponse(errorCheckMessage(False, "permissionError"))
                # Checking if the user is asking possible tracks
                if playlist.track.all().count() > reqNumber:
                    trackSet = getPlaylistTracks(playlist, nbTracks, reqNumber)
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
@login_required(redirect_field_name='login.html', login_url='app:login')
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


# Return the time length of a playlist
def getTotalLength(playlist):
    tracks = playlist.track.all()
    totalDuration = 0
    for track in tracks:
        totalDuration += track.duration
    return totalDuration


# Return all the id of the user playlists
@login_required(redirect_field_name='login.html', login_url='app:login')
def getUserPlaylists(request):
    # This function is available for all users even banned one
    if request.method == 'GET':
        user = request.user
        playlists = Playlist.objects.filter(user=user, isLibrary=False)
        playlistNames = []
        playlistIds = []
        isLibrary = []
        playlistDescriptions = []

        # Adding global libraries
        libraries = Playlist.objects.filter(isLibrary=True)
        for library in libraries:
            playlistNames.append(library.name)
            playlistIds.append(library.id)
            isLibrary.append(True)
            playlistDescriptions.append(library.description)

        # Adding User playlists
        for playlist in playlists:
            playlistNames.append(playlist.name)
            playlistIds.append(playlist.id)
            isLibrary.append(False)
            playlistDescriptions.append(playlist.description)

        if len(playlistIds) == 0:
            data = errorCheckMessage(False, None)
        else:
            # TODO : use JS0N convention
            data = {
                'NUMBER': len(playlistNames),
                'PLAYLIST_NAMES': playlistNames,
                'PLAYLIST_IDS': playlistIds,
                'PLAYLIST_IS_LIBRARY': isLibrary,
                'PLAYLIST_DESCRIPTIONS': playlistDescriptions,
            }
            data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Change the playlist description
@login_required(redirect_field_name='login.html', login_url='app:login')
def setPlaylistDescription(request):
    if request.method == "POST":
        response = json.loads(request.body)
        user = request.user
        if 'PLAYLIST_ID' in response and 'PLAYLIST_DESC':
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)

                # Checking if it's a library
                if playlist.isLibrary:
                    if not checkPermission(['LIBR'], user):
                        return errorCheckMessage(False, "permissionError")
                else:
                    # playlist edition
                    if not checkPermission(['PLST'], user):
                        return errorCheckMessage(False, "permissionError")
                playlist.description = strip_tags(response['PLAYLIST_DESC'])
                playlist.save()

                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Get the playlist description
@login_required(redirect_field_name='login.html', login_url='app:login')
def getPlaylistDescription(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            playlistId = response['PLAYLIST_ID']
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                data = {
                    'PLAYLIST_DESC': playlist.description
                }
                data = {{**data, **errorCheckMessage(True, None)}}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
