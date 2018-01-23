import copy
from operator import itemgetter

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse

from app.models import Stats, Artist, Track, Genre
from app.utils import errorCheckMessage


# Add track to stats for a user
def addToStats(track, listeningPercentage, user):
    if Stats.objects.filter(user=user, track=track).count() == 0:
        stat = Stats()
        stat.track = track
        stat.user = user
        stat.playCounter = 1
        stat.listeningPercentage = listeningPercentage
    else:
        stat = Stats.objects.get(user=user, track=track)
        stat.playCounter += 1
        stat.listeningPercentage += listeningPercentage
    stat.save()


# Return the number of tracks played by a user
def getUserNbTrackListened(user):
    tracks = Stats.objects.filter(user=user)
    totalListenedTrack = 0

    for track in tracks:
        totalListenedTrack += track.playCounter

    return totalListenedTrack


# Get the number of tracks that a user uploaded
def getUserNbTrackPushed(user):
    totalUploadedTracks = Track.objects.filter(uploader=user).count()
    return totalUploadedTracks


# Return the user's favorite genre
@login_required(redirect_field_name='login.html', login_url='app:login')
def getUserPrefGenres(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        genreTuple = []
        user = request.user
        numberPlayedTrack = getUserNbTrackListened(user)
        for genre in genres:
            counter = 0
            tracks = Stats.objects.filter(track__genre=genre, user=user)
            for track in tracks:
                counter += track.playCounter
            if numberPlayedTrack != 0:
                genreTuple.append((genre.name, counter, (counter / numberPlayedTrack) * 100))
            else:
                genreTuple.append((genre.name, counter, 0))

        genreTuple.sort(key=itemgetter(1), reverse=True)
        prefGenres = copy.deepcopy(genreTuple)
        genreTuple.sort(key=itemgetter(1), reverse=False)
        if len(prefGenres) == 0:
            data = errorCheckMessage(True, "noStats")
        else:
            data = {
                'PREF_GENRES': prefGenres[:25],
                'LEAST_GENRES': genreTuple[:25],
            }
            data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "")
    return JsonResponse(data)


# Return the user favorite artists
@login_required(redirect_field_name='login.html', login_url='app:login')
def getUserPrefArtists(request):
    if request.method == 'GET':
        user = request.user
        artists = Artist.objects.all()
        artistCounter = []

        for artist in artists:
            counter = 0
            stats = Stats.objects.filter(track__artist=artist, user=user)

            for track in stats:
                counter += track.playCounter

            artistCounter.append((artist.name, counter))

        artistCounter.sort(key=itemgetter(1), reverse=True)
        prefArtists = copy.deepcopy(artistCounter)
        artistCounter.sort(key=itemgetter(1), reverse=False)
        if len(prefArtists) == 0:
            data = errorCheckMessage(True, "noStats")
        else:
            data = {
                'PREF_ARTISTS': prefArtists[:25],
                'LEAST_ARTISTS': artistCounter[:25],
            }
            data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Return the user favorite tracks
@login_required(redirect_field_name='login.html', login_url='app:login')
def getUserPrefTracks(request):
    if request.method == 'GET':
        user = request.user
        statsPref = Stats.objects.filter(user=user).order_by('-playCounter', '-listeningPercentage')
        statsLeast = Stats.objects.filter(user=user).order_by('playCounter', 'listeningPercentage')

        trackTuplePref = []
        trackTupleLeast = []
        for stat in statsPref:
            if stat.listeningPercentage is not None:
                trackTuplePref.append((stat.track.title, stat.playCounter, stat.listeningPercentage / stat.playCounter))
            else:
                trackTuplePref.append((stat.track.title, stat.playCounter, 0))
        for stat in statsLeast:
            if stat.listeningPercentage is not None:
                trackTupleLeast.append(
                    (stat.track.title, stat.playCounter, stat.listeningPercentage / stat.playCounter))
            else:
                trackTupleLeast.append((stat.track.title, stat.playCounter, 0))
        if len(trackTuplePref) == 0:
            data = errorCheckMessage(True, "noStats")
        else:
            data = {
                'PREF_TRACKS': trackTuplePref[:25],
                'LEAST_TRACKS': trackTupleLeast[:25],
            }
            data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Tracks that never have been played
def userNeverPlayed(user):
    stats = Stats.objects.filter(user=user)
    playedArtistId = set()

    for stat in stats:
        for artist in stat.track.artist.all():
            playedArtistId.add(artist.id)
    neverPlayedArtists = Artist.objects.exclude(id__in=playedArtistId)
    neverPlayed = []
    for artist in neverPlayedArtists:
        neverPlayed.append(artist.id)

    return neverPlayed


# Get the stats for all users
@login_required(redirect_field_name='login.html', login_url='app:login')
def adminGetUserStats(request):
    if request.method == 'GET':
        admin = request.user
        data = []
        if admin.is_superuser:
            for user in User.objects.all():
                nbTrackListened = getUserNbTrackListened(user)
                temp = {
                    'USERNAME': user.username,
                    'PREF_ARTIST': getUserPrefArtists(user, True)[:10],
                    'LEAST_ARTISTS': getUserPrefArtists(user, False)[:10],
                    'NB_TRACK_LISTENED': nbTrackListened,
                    'NB_TRACK_PUSHED': getUserNbTrackPushed(user),
                    'PREF_GENRE': getUserPrefGenres(user, nbTrackListened, True)[:10],
                    'LEAST_GENRE': getUserPrefGenres(user, nbTrackListened, False)[:10],
                    'NEVER_PLAYED': userNeverPlayed(user),
                }
                data.append(temp)
            data = {**dict({'RESULT': data}), **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
