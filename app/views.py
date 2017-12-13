import json
import os
from builtins import print
from random import randint

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic.base import View
from django.views.generic.list import ListView

from app.controller import scanLibrary, shuffleSoundSelector
from app.dao import getPlaylistExport
from app.form import UserForm
from app.models import Playlist, Track, Artist, Album, Library, Genre, Shuffle, PlaylistSettings, UserHistory, History, \
    Wish, Stats
from app.utils import exportPlaylistToJson, populateDB, errorCheckMessage, exportTrackInfo, \
    generateSimilarTrackJson, updateTrackView, simpleJsonGenerator, getUserPrefArtist, getUserNbTrackListened, \
    getUserNbTrackPushed, getUserGenre, getUserGenrePercentage, userNeverPlayed


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        populateDB()
        return super(mainView, self).dispatch(*args, **kwargs)


# Perform the initial scan for a library
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def initialScan(request):
    print("Asked for initial scan")
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'LIBRARY_ID' in response:
            library = Library.objects.get(id=response['LIBRARY_ID'])
            if os.path.isdir(library.path):
                playlist = Playlist()
                playlist.name = library.name
                playlist.user = request.user
                playlist.isLibrary = True
                playlist.save()
                data = scanLibrary(library, playlist, library.convertID3)
            else:
                data = errorCheckMessage(False, "dirNotFound")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Drop all database, used for debug
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def dropAllDB(request):
    if request.user.is_authenticated():
        Track.objects.all().delete()
        Artist.objects.all().delete()
        Album.objects.all().delete()
        Playlist.objects.all().delete()
        Library.objects.all().delete()
        Genre.objects.all().delete()
        Shuffle.objects.all().delete()
        UserHistory.objects.all().delete()
        Stats.objects.all().delete()
        History.objects.all().delete()
        data = {
            'DROPPED': "OK",
        }
        return JsonResponse(data)
    else:
        data = {
            'DROPPED': 'KO'
        }
        return JsonResponse(data)


# Create a new user in database
def createUser(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        admin = False
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            print("users : " + str(User.objects.all().count()))
            if User.objects.all().count() == 1:
                admin = True
            user = authenticate(username=username, password=raw_password)
            user.is_superuser = admin
            print(admin)
            user.save()
            login(request, user)
            return render(request, 'index.html')  # TODO : fix URL
    else:
        form = UserCreationForm()
    return render(request, 'user/signup.html', {'form': form})


# Render the user form login views
class UserFormLogin(View):
    form_class = UserForm
    template_name = 'user/login.html'

    # Display the blank form
    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    # Receive the filled out form
    def post(self, request):
        form = self.form_class(request.POST)
        username = form.data['username']
        password = form.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('app:index')

        return render(request, self.template_name, {'form': form})


# Log out the user
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def logoutView(request):
    logout(request)
    return render(request, 'user/login.html')


# Return all the id of the user playlists
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserPlaylists(request):
    print("getting usr playlist")
    playlists = Playlist.objects.filter(user=request.user, isLibrary=False)
    playlistNames = []
    playlistIds = []
    isLibrary = []

    # Adding User playlists
    for playlist in playlists:
        playlistNames.append(playlist.name)
        playlistIds.append(playlist.id)
        isLibrary.append(False)

    # Adding global libraries
    libraries = Playlist.objects.filter(isLibrary=True)
    for library in libraries:
        playlistNames.append(library.name)
        playlistIds.append(library.id)
        isLibrary.append(True)

    if len(playlistIds) == 0:
        return JsonResponse(errorCheckMessage(False, None))

    data = {
        'NUMBER': len(playlistNames),
        'PLAYLIST_NAMES': playlistNames,
        'PLAYLIST_IDS': playlistIds,
        'PLAYLIST_IS_LIBRARY': isLibrary,
    }
    data = {**data, **errorCheckMessage(True, None)}
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


# Load a library by returning simplified json
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def loadSimplifiedLibrary(request):
    if request.method == 'POST':
        print("Getting json export of the library")
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
                playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
                updateTrackView(playlist.id)
                return JsonResponse(dict({'RESULT': simpleJsonGenerator()}))
            else:
                return JsonResponse(errorCheckMessage(False, "dbError"))
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))


# Get all track information from a playlist and format it as json
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def loadTracksFromPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            playlist = Playlist.objects.get(id=response['ID'])
            tmp = exportPlaylistToJson(playlist)
            # playlist.jsonInfo = tmp
            # playlist.save()
            return HttpResponse(tmp)

        except AttributeError:
            return JsonResponse(errorCheckMessage(False, "badFormat"))


# TODO: nouvelle convention JSON!
def getTrackDetailedInfo(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                # TODO : change to dict
                return JsonResponse(dict({'RESULT': exportTrackInfo(track)}))
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def bulkExport(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'LIBRARY_ID' in response:
            libraryId = strip_tags(response['LIBRARY_ID'])
            if Library.objects.filter(id=libraryId).count() == 1:
                library = Library.objects.get(id=libraryId)
                return HttpResponse(getPlaylistExport(library.playlist.id))


# Create a new library can only be done while being a superuser.
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newLibrary(request):
    if request.method == 'POST':
        if request.user.is_superuser:
            response = json.loads(request.body)

            try:
                if 'URL' in response and 'NAME' in response and 'CONVERT' in response:
                    dirPath = response['URL']
                else:
                    return JsonResponse(errorCheckMessage(False, "badFormat"))
                if not os.path.isdir(dirPath):
                    return JsonResponse(errorCheckMessage(False, "dirNotFound"))
                # Removing / at the end of the dir path if present
                if dirPath.endswith("/"):
                    dirPath = dirPath[:-1]
                library = Library()
                library.path = dirPath
                library.name = strip_tags(response['NAME'])
                library.convertID3 = response['CONVERT']
                library.user = request.user
                library.save()
            except AttributeError:
                return JsonResponse(errorCheckMessage(False, "badFormat"))
            data = {
                'LIBRARY_ID': library.id,
                'NAME': library.name,
            }
            data = {**data, **errorCheckMessage(True, None)}
            return JsonResponse(data)
        return JsonResponse(errorCheckMessage(False, "permissionError"))
    return JsonResponse(errorCheckMessage(False, "badRequest"))


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def newPlaylist(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        try:
            if 'NAME' in response:
                playlist = Playlist()
                playlist.name = strip_tags(response['NAME'])
                playlist.user = request.user
                playlist.save()
                data = {
                    'ID': playlist.id,
                    'NAME': playlist.name,
                }
                return JsonResponse(data)
        except AttributeError:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))


# Change the meta of a file inside it and in database
# TODO : change JSON keys for matching convention
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def changeMetaData(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        # TODO: test with a table and see if "for in" works, if doesn't work create while loop
        if 'ID' in response:
            trackId = strip_tags(response['ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                if 'TITLE' in response:
                    track.title = response['TITLE']
            else:
                data = {
                    'DONE': 'FAIL',
                    'ERROR': 'DB error',
                }
                return JsonResponse(data)
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))


# Return the link to a track with a track id
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getTrackPathByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        data = {}
        if 'TRACK_ID' in response and 'PREVIOUS' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                track.playCounter += 1
                track.save()
                user = request.user
                if Stats.objects.filter(user=user, track=track).count() == 0:
                    stat = Stats()
                    stat.track = track
                    stat.user = user
                    stat.playCounter = 1
                else:
                    stat = Stats.objects.get(user=user, track=track)
                    stat.playCounter += 1
                stat.save()
                print("PREVIOUS : ", response['PREVIOUS'])
                if not response['PREVIOUS']:
                    # Creating user history
                    history = History()
                    history.track = track
                    history.save()
                    if UserHistory.objects.filter(user=user).count() == 0:
                        userHistory = UserHistory(user=user)
                        userHistory.save()
                        userHistory.histories.add(history)
                    # Adding to existing history
                    else:
                        userHistory = UserHistory.objects.get(user=user)
                        userHistory.save()
                        userHistory.histories.add(history)

                print("PATH : " + track.location)
                data = {
                    'PATH': track.location,
                    'COVER': track.coverLocation,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")

        else:
            data = errorCheckMessage(False, "badFormat")
        return JsonResponse(data)


# Download the given song
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getDownloadLocation(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                track.downloadCounter += 1
                track.save()
                data = {
                    'PATH': track.location,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Function for check if a library has been scanned.
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def checkLibraryScanStatus(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
                playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
                return JsonResponse(errorCheckMessage(playlist.isScanned, None))


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


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getMoodbarByID(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'TRACK_ID' in response:
            trackID = response['TRACK_ID']
            if Track.objects.filter(id=trackID).count() == 1:
                track = Track.objects.get(id=trackID)
                print(track.moodbar)
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


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def adminGetUserStats(request):
    if request.method == 'POST':
        response = json.loads(request.body)
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

        return JsonResponse(dict({'mydata': data}))
    else:
        return JsonResponse(errorCheckMessage(False, "permissionError"))



@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getUserStats(request):
    if request.method == 'POST':
        response = json.loads(request.body)
    user = request.user

    nbTrackListened = getUserNbTrackListened(user)
    nbTrackPushed = getUserNbTrackPushed(user)
    userGenre = getUserGenre(user)
    userGenrePercentage = getUserGenrePercentage(user)
    prefArtists = getUserPrefArtist(user)
    neverPlayed = userNeverPlayed(user)

    data = {
            'PREF_ARTIST': prefArtists[:100],
            'NB_TRACK_LISTENED': nbTrackListened,
            'NB_TRACK_PUSHED': nbTrackPushed,
            'USER_GENRE': userGenre,
            'USER_GENRE_PERCENTAGE': userGenrePercentage,
            'NEVER_PLAYED': neverPlayed,
    }

    return JsonResponse(data)




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
            return JsonResponse(errorCheckMessage(False, "dbError"))
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))


# Drop a library and index all the tracks
@login_required(redirect_field_name='user/login.html', login_url='app:login')
def rescanLibrary(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'LIBRARY_ID' in response:
            library = strip_tags(response['LIBRARY_ID'])
            if Library.objects.filter(id=library).count() == 1:
                library = Library.objects.get(id=library)

                # Check if the library is not used somewhere else
                if library.playlist.isScanned:
                    # Delete all the old tracks
                    library.playlist.delete()

                    # Recreating playlist
                    playlist = Playlist()
                    playlist.name = library.name
                    playlist.user = request.user
                    playlist.isLibrary = True
                    playlist.save()
                    library.playlist = playlist

                    # Scan library
                    data = scanLibrary(library, playlist, library.convertID3)
                    return JsonResponse(data)
                else:
                    return JsonResponse(errorCheckMessage(False, "rescanError"))
            else:
                return JsonResponse(errorCheckMessage(False, "dbError"))
        else:
            return JsonResponse(errorCheckMessage(False, "badFormat"))
    else:
        return JsonResponse(errorCheckMessage(False, "badRequest"))


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
                    return JsonResponse(errorCheckMessage(True, None))


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getLastSongPlayed(request):
    if request.method == 'GET':
        user = request.user
        if UserHistory.objects.filter(user=user).count() != 0:
            userHistory = UserHistory.objects.get(user=user)
            if userHistory.histories.count() != 0:
                trackId = 0
                for history in userHistory.histories.order_by('-date'):
                    trackId = history.track.id
                    history.delete()
                    break
                data = {
                    'TRACK_ID': trackId,
                }
                data = {**data, **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "noHistory")
        else:
            data = errorCheckMessage(False, "noHistory")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def getSimilarTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        selectedTracks = []
        if 'TRACK_ID' in response and 'MODE' in response and 'PLAYLIST':
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                mode = strip_tags(response['MODE'])
                numberTrackTarget = 4

                try:
                    mode = int(mode)
                except ValueError:
                    mode = 5

                # Same artist track selection
                if mode == 0:
                    tracks = Track.objects.filter(artist__in=track.artist.all()).exclude(id=track.id) \
                        .order_by('-playCounter')
                # Same album track selection
                elif mode == 1:
                    tracks = Track.objects.filter(album=track.album).exclude(id=track.id).order_by('-playCounter')
                # Same genre track selection
                elif mode == 2:
                    tracks = Track.objects.filter(genre=track.genre).exclude(id=track.id).order_by('-playCounter')
                # Other values
                else:
                    return JsonResponse(errorCheckMessage(False, "badFormat"))

                # Check length of the query set
                if len(tracks) < 4:
                    if len(tracks) == 0:
                        if mode == 0:
                            return JsonResponse(errorCheckMessage(False, "noSameArtist"))
                        elif mode == 1:
                            return JsonResponse(errorCheckMessage(False, "noSameAlbum"))
                        else:
                            return JsonResponse(errorCheckMessage(False, "noSameGenre"))
                    else:
                        numberTrackTarget = len(tracks)

                # Choosing the X most listened tracks
                for trackCursor in tracks:
                    selectedTracks.append(trackCursor)
                    if len(selectedTracks) == numberTrackTarget:
                        break

                # Returning results
                return JsonResponse({**generateSimilarTrackJson(selectedTracks), **errorCheckMessage(True, None)})
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return data


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def createWish(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'WISH' in response:
            wish = Wish()
            wish.user = user
            wish.text = strip_tags(str(response['WISH']))
            wish.status = 0 # Not done; 1 Refused; 2 Accepted
            wish.save()
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)