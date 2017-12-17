from operator import itemgetter

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse

from app.models import Stats, Artist, Track, Genre
from app.utils import errorCheckMessage


def addToStats(track, user):
    if Stats.objects.filter(user=user, track=track).count() == 0:
        stat = Stats()
        stat.track = track
        stat.user = user
        stat.playCounter = 1
    else:
        stat = Stats.objects.get(user=user, track=track)
        stat.playCounter += 1
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


def getUserGenre(user):
    genres = Genre.objects.all()
    genreCounter = []

    for genre in genres:
        counter = 0
        tracks = Stats.objects.filter(track__genre=genre, user=user)
        for track in tracks:
            counter += track.playCounter

        genreCounter.append(counter)

    return genreCounter


def getUserGenrePercentage(user):
    genreCounter = getUserGenre(user)
    genrePercentage = []
    totalGenre = 1  # At the moment protection against empty tests
    i = 0

    for i in genreCounter:
        totalGenre = totalGenre + i

    for i in genreCounter:
        percentage = 100 * i / totalGenre
        genrePercentage.append(percentage)

    return genrePercentage


def getUserPrefArtist(user, order):
    artists = Artist.objects.all()
    artistCounter = []

    for artist in artists:
        counter = 0
        tracks = Stats.objects.filter(track__artist=artist, user=user)

        for track in tracks:
            counter += track.playCounter

        artistCounter.append((artist.name, counter))

    artistCounter.sort(key=itemgetter(1), reverse=order)

    return artistCounter


def getUserPrefTracks(user, order):
    if order:
        stats = Stats.objects.filter(user=user).order_by('-playCounter')
    else:
        stats = Stats.objects.filter(user=user).order_by('playCounter')

    trackTuple = []
    for stat in stats:
        trackTuple.append((stat.track.title, stat.playCounter))

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


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserStats(request):
    if request.method == 'GET':
        user = request.user

        nbTrackListened = getUserNbTrackListened(user)
        nbTrackPushed = getUserNbTrackPushed(user)
        userGenre = getUserGenre(user)
        userGenrePercentage = getUserGenrePercentage(user)
        neverPlayed = userNeverPlayed(user)

        data = {
            'USERNAME': user.username,
            'TOTAL_TRACK': Track.objects.all().count(),
            'PREF_ARTISTS': getUserPrefArtist(user, True)[:10],
            'LEAST_ARTISTS': getUserPrefArtist(user, False)[:10],
            'PREF_TRACKS': getUserPrefTracks(user, True)[:10],
            'LEAST_TRACKS': getUserPrefTracks(user, False)[:10],
            'NB_TRACK_LISTENED': nbTrackListened,
            'NB_TRACK_PUSHED': nbTrackPushed,
            'USER_GENRE': userGenre,
            'USER_GENRE_PERCENTAGE': userGenrePercentage,
            'NEVER_PLAYED': neverPlayed,
        }
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def adminGetUserStats(request):
    if request.method == 'GET':
        user = request.user
        data = []
        if user.is_superuser:
            for users in User.objects.all():
                temp = {
                    'USER': users.username,
                    'PREF_ARTIST': getUserPrefArtist(users),
                    'NB_TRACK_LISTENED': getUserNbTrackListened(users),
                    'NB_TRACK_PUSHED': getUserNbTrackPushed(users),
                    'USER_GENRE': getUserGenre(users),
                    'USER_GENRE_PERCENTAGE': getUserGenrePercentage(users),
                    'NEVER_PLAYED': userNeverPlayed(users),
                }
                data.append(temp)
            data = {**dict({'RESULT': data}), **errorCheckMessage(True, None)}
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
