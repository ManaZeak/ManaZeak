import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.collection.playlistManager import getPlaylistInfo
from app.dao import getPlaylistTracksFromView, createViewForLazy, lazyJsonGenerator, deleteView
from app.errors.errors import ErrorEnum, errorCheckMessage
from app.errors.exceptions import CreationException
from app.models import Playlist, Track
from app.utils import checkPermission


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
                data = {**data, **errorCheckMessage(True, None, newPlaylist)}
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, newPlaylist, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, newPlaylist, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, newPlaylist)
    return JsonResponse(data)


# Rename user's playlist
@login_required(redirect_field_name='login.html', login_url='app:login')
def renamePlaylist(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response and 'PLAYLIST_NAME' in response:
            playlistId = strip_tags(response['PLAYLIST_ID'])
            if Playlist.objects.filter(id=playlistId, user=user).count() == 1:
                playlist = Playlist.objects.get(id=playlistId, user=user)
                if (checkPermission(["PLST"], user) and not playlist.isLibrary) \
                        or (playlist.isLibrary and checkPermission(["LIBR"], user)):
                    deleteView(playlist)
                    playlist.name = strip_tags(response['PLAYLIST_NAME'])
                    playlist.refreshView = True
                    playlist.save()
                    data = {
                        'PLAYLIST_ID': playlist.id,
                        'PLAYLIST_NAME': playlist.name,
                    }
                    data = {**data, **errorCheckMessage(True, None, renamePlaylist)}
                else:
                    data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, renamePlaylist, user)
            else:
                data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, renamePlaylist, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, renamePlaylist, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, renamePlaylist)
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
                    data = errorCheckMessage(True, None, addTracksToPlaylist)
                else:
                    data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, addTracksToPlaylist, user)
            else:
                data = errorCheckMessage(False, ErrorEnum.DB_ERROR, addTracksToPlaylist)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, addTracksToPlaylist, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, addTracksToPlaylist)
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
                    data = errorCheckMessage(True, None, removeTracksFromPlaylist)
                else:
                    data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, removeTracksFromPlaylist, user)
            else:
                data = errorCheckMessage(False, ErrorEnum.DB_ERROR, removeTracksFromPlaylist)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, removeTracksFromPlaylist, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, removeTracksFromPlaylist)
    return JsonResponse(data)


# TODO : test for the best value for the number of element in the JSON
# Give 300 tracks of a playlist with an offset (REQ_NUMBER)
@login_required(redirect_field_name='login.html', login_url='app:login')
def simplifiedLazyLoadingPlaylist(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'REQUEST_NUMBER' in response and 'PLAYLIST_ID' in response:

            playlistId = strip_tags(response['PLAYLIST_ID'])
            try:
                reqNumber = int(strip_tags(response['REQUEST_NUMBER']))
            except ValueError:
                return JsonResponse(
                    errorCheckMessage(False, ErrorEnum.VALUE_ERROR, simplifiedLazyLoadingPlaylist, user))
            nbTracks = 300
            reqNumber *= nbTracks
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                # Checking if it's the first request for creating the view
                if reqNumber == 0:
                    # Checking if the user can display the asked playlist
                    if playlist.user == user or playlist.isLibrary:
                        if playlist.refreshView:
                            createViewForLazy(playlist)
                    else:
                        return JsonResponse(
                            errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, simplifiedLazyLoadingPlaylist, user))
                # Checking if the user is asking possible tracks
                if playlist.track.all().count() > reqNumber:
                    trackSet = getPlaylistTracksFromView(playlist, nbTracks, reqNumber)
                    data = {}
                    for row in trackSet:
                        lazyJsonGenerator(row, data)
                    data = {**data, **errorCheckMessage(True, None, simplifiedLazyLoadingPlaylist)}
                else:
                    data = errorCheckMessage(False, None, simplifiedLazyLoadingPlaylist)
            else:
                data = errorCheckMessage(False, ErrorEnum.DB_ERROR, simplifiedLazyLoadingPlaylist)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, simplifiedLazyLoadingPlaylist, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, simplifiedLazyLoadingPlaylist)
    return JsonResponse(data)


# Return the time length of a playlist
def getTotalLength(playlist):
    tracks = playlist.track.all()
    totalDuration = 0
    for track in tracks:
        totalDuration += track.duration
    return totalDuration


@login_required(redirect_field_name='login.html', login_url='app:login')
## This function is used to get all the information about the available playlist for a user
#   @param request a GET request from the front.
def getUserPlaylists(request):
    # This function is available for all users even banned one
    if request.method == 'GET':
        user = request.user

        # Getting all the available playlists
        playlists = Playlist.objects.filter(isPublic=True) | \
                    Playlist.objects.filter(isLibrary=True) | \
                    Playlist.objects.filter(user=user)

        playlistsInfo = []
        try:
            for playlist in playlists:
                playlistsInfo.append(getPlaylistInfo(playlist, user))
        except CreationException:
            # If something when wrong stop the process and send an error to the front
            return JsonResponse(errorCheckMessage(False, ErrorEnum.DB_ERROR, getUserPlaylists))
        data = {
            'MZK': playlistsInfo
        }
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, getUserPlaylists)
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
                        return errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, setPlaylistDescription, user)
                else:
                    # playlist edition
                    if not checkPermission(['PLST'], user):
                        return errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, setPlaylistDescription, user)
                playlist.description = strip_tags(response['PLAYLIST_DESC'])
                playlist.save()

                data = errorCheckMessage(True, None, setPlaylistDescription)
            else:
                data = errorCheckMessage(False, ErrorEnum.DB_ERROR, setPlaylistDescription)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, setPlaylistDescription, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, setPlaylistDescription)
    return JsonResponse(data)


# Get the playlist description
@login_required(redirect_field_name='login.html', login_url='app:login')
def getPlaylistDescription(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            playlistId = response['PLAYLIST_ID']
            if Playlist.objects.filter(id=playlistId).count() == 1:
                playlist = Playlist.objects.get(id=playlistId)
                data = {
                    'PLAYLIST_DESC': playlist.description
                }
                data = {{**data, **errorCheckMessage(True, None, getPlaylistDescription)}}
            else:
                data = errorCheckMessage(False, ErrorEnum.DB_ERROR, getPlaylistDescription)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, getPlaylistDescription, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, getPlaylistDescription)
    return JsonResponse(data)
