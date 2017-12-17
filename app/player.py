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


# TODO : refactor shuffle and random to group them in one function
# Get the next track when the shuffle mode is enabled
@login_required(redirect_field_name='user/login.html', login_url='app:login')
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
                    'PATH': track.location,
                    'COVER': track.coverLocation,
                    'END': playlistEnd,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
            return JsonResponse(data)
        return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))


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
                            'PATH': track.location,
                            'COVER': track.coverLocation
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
@login_required(redirect_field_name='user/login.html', login_url='app:login')
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


# Return the link to a track with a track id
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getTrackPathByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        # Checking JSON keys
        if 'TRACK_ID' in response and 'PREVIOUS' in response and 'LAST_TRACK_PATH' in response and 'TRACK_PER' in response:
            trackId = strip_tags(response['TRACK_ID'])
            # Getting the track asked
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                # If we don't ask a previous track
                if not bool(response['PREVIOUS']):
                    # Adding the current track to the history
                    addToHistory(track, user)
                    # Removing the first 2 chars
                    previousTrackPath = strip_tags(response['LAST_TRACK_PATH'])[2:]
                    # If the previous track exists
                    if Track.objects.filter(location=previousTrackPath).count() == 1:
                        listeningPercentage = float(strip_tags(response['TRACK_PER']))
                        previousTrack = Track.objects.get(location=previousTrackPath)
                        # Adding to stats if the user has listened more than 15% of the song
                        if listeningPercentage > 15:
                            previousTrack.playCounter += 1
                            previousTrack.save()
                            addToStats(previousTrack, user)

                # Returning the asked song
                data = {
                    'PATH': track.location,
                    'COVER': track.coverLocation,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Return the mood file with a given track id
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getMoodbarByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackID = response['TRACK_ID']
            if Track.objects.filter(id=trackID).count() == 1:
                track = Track.objects.get(id=trackID)
                data = {
                    'MOOD': track.moodbar,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
