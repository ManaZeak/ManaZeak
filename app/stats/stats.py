from operator import itemgetter

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse

from app.models import Stats, Artist, Track, Genre
from app.utils import errorCheckMessage


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


def getUserNbTrackListened(user):
    tracks = Stats.objects.filter(user=user)
    totalListenedTrack = 0

    for track in tracks:
        totalListenedTrack += track.playCounter

    return totalListenedTrack


def getUserNbTrackPushed(user):
    totalUploadedTracks = Track.objects.filter(uploader=user).count()
    return totalUploadedTracks


def getUserPrefGenre(user, numberPlayedTrack, order):
    genres = Genre.objects.all()
    genreTuple = []

    for genre in genres:
        counter = 0
        tracks = Stats.objects.filter(track__genre=genre, user=user)
        for track in tracks:
            counter += track.playCounter
        if numberPlayedTrack != 0:
            genreTuple.append((genre.name, counter, (counter/numberPlayedTrack)*100))
        else:
            genreTuple.append((genre.name, counter, 0))

    genreTuple.sort(key=itemgetter(1), reverse=order)
    return genreTuple


def getUserPrefArtist(user, order):
    artists = Artist.objects.all()
    artistCounter = []

    for artist in artists:
        counter = 0
        stats = Stats.objects.filter(track__artist=artist, user=user)

        for track in stats:
            counter += track.playCounter

        artistCounter.append((artist.name, counter))

    artistCounter.sort(key=itemgetter(1), reverse=order)

    return artistCounter


def getUserPrefTracks(user, nbTrackListened, order):
    if order:
        stats = Stats.objects.filter(user=user).order_by('-playCounter', '-listeningPercentage')
    else:
        stats = Stats.objects.filter(user=user).order_by('playCounter', 'listeningPercentage')

    trackTuple = []
    for stat in stats:
        trackTuple.append((stat.track.title, stat.playCounter, stat.listeningPercentage/nbTrackListened))

    return trackTuple


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


# TODO : create POST request with the arg for the number of elements returned
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserStats(request):
    if request.method == 'GET':
        user = request.user

        nbTrackListened = getUserNbTrackListened(user)
        nbTrackPushed = getUserNbTrackPushed(user)
        neverPlayed = userNeverPlayed(user)

        data = {
            'USERNAME': user.username,
            'TOTAL_TRACK': Track.objects.all().count(),
            'PREF_ARTISTS': getUserPrefArtist(user, True)[:10],
            'LEAST_ARTISTS': getUserPrefArtist(user, False)[:10],
            'PREF_TRACKS': getUserPrefTracks(user, nbTrackListened, True)[:10],
            'LEAST_TRACKS': getUserPrefTracks(user, nbTrackListened, False)[:10],
            'NB_TRACK_LISTENED': nbTrackListened,
            'NB_TRACK_PUSHED': nbTrackPushed,
            'PREF_GENRES': getUserPrefGenre(user, nbTrackListened, True)[:10],
            'LEAST_GENRES': getUserPrefGenre(user, nbTrackListened, False)[:10],
            'NEVER_PLAYED': neverPlayed,
        }
        data = {**data, **errorCheckMessage(True, None)}
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def adminGetUserStats(request):
    if request.method == 'GET':
        admin = request.user
        data = []
        if admin.is_superuser:
            for user in User.objects.all():
                nbTrackListened = getUserNbTrackListened(user)
                temp = {
                    'USERNAME': user.username,
                    'PREF_ARTIST': getUserPrefArtist(user, True)[:10],
                    'LEAST_ARTISTS': getUserPrefArtist(user, False)[:10],
                    'NB_TRACK_LISTENED': nbTrackListened,
                    'NB_TRACK_PUSHED': getUserNbTrackPushed(user),
                    'PREF_GENRE': getUserPrefGenre(user, nbTrackListened, True)[:10],
                    'LEAST_GENRE': getUserPrefGenre(user, nbTrackListened, False)[:10],
                    'NEVER_PLAYED': userNeverPlayed(user),
                }
                data.append(temp)
            data = {**dict({'RESULT': data}), **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
