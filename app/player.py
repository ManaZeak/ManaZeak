import json
from random import randint

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.errors import ErrorEnum, errorCheckMessage
from app.models import Shuffle, Playlist, Track, PlaylistSettings
from app.utils import checkPermission

## @package app.player
#   this package is used to handle the player actions.


## Select a sound when shuffle mode enabled
#   @param shuffle a shuffle object, contains for each user the track he already played
#   @return a track and if the playlist is finished
def shuffleSoundSelector(shuffle):
    playlistEnd = False
    playlist = shuffle.playlist
    tracksPlayed = shuffle.tracksPlayed.all()
    playedIds = set()

    # Getting all the ids of played tracks into a set
    for trackPlayed in tracksPlayed:
        playedIds.add(trackPlayed.id)

    # Removing all the tracks already played once
    possibleTracks = playlist.track.all().exclude(id__in=playedIds)

    # Check if the user has reach the end of the playlist
    length = len(possibleTracks)
    if length == 0:
        shuffle.tracksPlayed.clear()
        possibleTracks = playlist.track.all()
        length = len(possibleTracks)
        playlistEnd = True

    # Select a random track
    selected = randint(0, length - 1)
    count = 0
    for track in possibleTracks:
        if count == selected:
            shuffle.tracksPlayed.add(track)
            shuffle.save()
            return track, playlistEnd
        else:
            count += 1
    return -1


@login_required(redirect_field_name='login.html', login_url='app:login')
## Function for getting a track from the front when in shuffle mode.
#   @param request the POST request from the front must contain :
#   - a playlist ID (PLAYLIST_ID)
#   @return a default json response and the following information :
#   - the track ID (TRACK_ID)
#   - if the track is the last one boolean (IS_LAST)
def shuffleNextTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["PLAY"], user):
            if 'PLAYLIST_ID' in response:
                if Shuffle.objects.filter(playlist=Playlist.objects.get(id=response['PLAYLIST_ID']),
                                          user=request.user).count() == 1:
                    shuffle = Shuffle.objects.get(playlist=Playlist.objects.get(id=response['PLAYLIST_ID']),
                                                  user=request.user)
                else:
                    shuffle = Shuffle(playlist=Playlist.objects.get(id=response['PLAYLIST_ID']), user=request.user)
                    shuffle.save()
                track, playlistEnd = shuffleSoundSelector(shuffle)
                shuffle.tracksPlayed.add(track)
                shuffle.save()
                if Track.objects.filter(id=track.id).count() == 1:
                    data = {
                        'TRACK_ID': track.id,
                        'IS_LAST': playlistEnd,
                    }
                    data = {**data, **errorCheckMessage(True, None, shuffleNextTrack)}
                else:
                    data = errorCheckMessage(False, ErrorEnum.DB_ERROR, shuffleNextTrack)
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, shuffleNextTrack, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, shuffleNextTrack, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, shuffleNextTrack)
    return JsonResponse(data)


## Get the next track when the random mode is enabled
#   @param request the POST request from the front must contain the following information :
#   - the playlist id (PLAYLIST_ID)
#   @return a default json response and a track ID (TRACK_ID)
def randomNextTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["PLAY"], user):
            if 'PLAYLIST_ID' in response:
                playlistID = strip_tags(response['PLAYLIST_ID'])
                if Playlist.objects.filter(id=playlistID).count() == 1:
                    playlist = Playlist.objects.get(id=playlistID)
                    rangeRand = playlist.track.count()
                    selectedTrack = randint(0, rangeRand)
                    count = 0
                    for track in playlist.track.all():
                        if count == selectedTrack:
                            data = {
                                'TRACK_ID': track.id,
                            }
                            data = {**data, **errorCheckMessage(True, None, randomNextTrack)}
                            return JsonResponse(data)
                        else:
                            count += 1
                data = errorCheckMessage(False, ErrorEnum.DB_ERROR, randomNextTrack)
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, randomNextTrack, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, randomNextTrack, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, randomNextTrack)
    return JsonResponse(data)


@login_required(redirect_field_name='login.html', login_url='app:login')
## Change the mode of getting the next track
#   @param request a POST request from the front must contains :
#   - the playlist ID (PLAYLIST_ID)
#   - the mode of shuffle (RANDOM_MODE) the modes are :
#       - 0 no random
#       - 1 shuffle tracks
#       - 2 random tracks
#   @return a default json response
def toggleRandom(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'RANDOM_MODE' in response and 'PLAYLIST_ID' in response:
            randomMode = strip_tags(response['RANDOM_MODE'])
            randomMode = int(randomMode)
            if randomMode in range(0, 3):
                playlistId = strip_tags(response['PLAYLIST_ID'])
                if Playlist.objects.filter(id=playlistId).count() == 1:
                    playlist = Playlist.objects.get(id=playlistId)
                    if PlaylistSettings.objects.filter(playlist=playlist, user=user).count() == 1:
                        settings = PlaylistSettings.objects.get(playlist=playlist, user=user)
                    else:
                        settings = PlaylistSettings()
                        settings.user = user
                        # TODO : change to right view mode
                        settings.viewMode = 0
                        settings.playlist = playlist
                    settings.randomMode = randomMode
                    settings.save()
                    data = errorCheckMessage(True, None, toggleRandom)
                else:
                    data = errorCheckMessage(False, ErrorEnum.DB_ERROR, toggleRandom)
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, toggleRandom, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, toggleRandom, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, toggleRandom)
    return JsonResponse(data)
