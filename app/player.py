import json
from random import randint

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.history import addToHistory
from app.models import Shuffle, Playlist, Track, PlaylistSettings
from app.stats.stats import addToStats
from app.utils import errorCheckMessage


# Select a sound with shuffle mode enabled
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


# Get the next track when the shuffle mode is enabled
@login_required(redirect_field_name='login.html', login_url='app:login')
def shuffleNextTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
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
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Get the next track when the random mode is enabled
def randomNextTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
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
                        data = {**data, **errorCheckMessage(True, None)}
                        return JsonResponse(data)
                    else:
                        count += 1
            data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Change the mode of getting the next track
@login_required(redirect_field_name='login.html', login_url='app:login')
def toggleRandom(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'RANDOM_MODE' in response and 'PLAYLIST_ID' in response:
            randomMode = strip_tags(response['RANDOM_MODE'])
            randomMode = int(randomMode)
            if randomMode in range(0, 3):
                user = request.user
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
                    data = errorCheckMessage(True, None)
                else:
                    data = errorCheckMessage(False, "dbError")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
