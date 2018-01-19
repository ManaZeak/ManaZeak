import json

from django.http import JsonResponse
from django.utils.html import strip_tags
from mutagen.flac import FLAC
from mutagen.id3 import ID3
from mutagen.id3._frames import TIT2, TDRC, TPE1, TOPE, TCOM, TRCK, TBPM, USLT, TCON, TALB

from app.models import Track, Artist, Album, Genre
from app.utils import errorCheckMessage


# Check if the value can be converted to int
def checkIntValueError(string):
    try:
        value = int(strip_tags(string).lstrip().rstrip())
    except ValueError:
        value = None
    return value


# All the information about a track
class Information:
    def __int__(self):
        self.trackTitle = self.trackArtist = self.trackPerformer = self.trackComposer = self.trackYear =\
            self.trackNumber = self.trackBPM = self.trackLyrics = self.trackGenre = self.albumTitle = \
            self.albumArtist = self.albumTotalDisc = self.albumTotalTrack = None


# Update the track into the database
def updateDBInfo(response, track, tags):
    # Changing tags in the database
    if 'TRACK_TITLE' in response:
        tags.trackTitle = strip_tags(response['TRACK_TITLE']).lstrip().rstrip()
        track.title = tags.trackTitle

    if 'TRACK_ARTIST' in response:
        tags.trackArtist = strip_tags(response['TRACK_ARTIST']).lstrip().rstrip().split(',')
        artists = []
        for artist in tags.trackArtist:
            if Artist.objects.filter(name=artist).count() == 0:
                newArtist = Artist()
                newArtist.name = artist
                newArtist.save()
            artists.append(Artist.objects.get(name=artist))
        track.artist.remove()
        for artist in artists:
            track.artist.add(artist)

    if 'TRACK_PERFORMER' in response:
        track.performer = strip_tags(response['TRACK_PERFORMER']).lstrip().rstrip()

    if 'TRACK_COMPOSER' in response:
        track.composer = strip_tags(response['TRACK_COMPOSER']).lstrip().rstrip()

    if 'TRACK_YEAR' in response:
        track.year = checkIntValueError(response['TRACK_YEAR'])

    if 'TRACK_NUMBER' in response:
        track.number = checkIntValueError(response['TRACK_YEAR'])

    if 'TRACK_BPM' in response:
        track.bpm = checkIntValueError(response['TRACK_BPM'])

    if 'TRACK_LYRICS' in response:
        track.lyrics = strip_tags(response['TRACK_LYRICS']).lstrip().rstrip()

    if 'TRACK_GENRE' in response:
        tags.trackGenre = strip_tags(response['TRACK_GENRE']).lstrip().rstrip()
        if Genre.objects.filter(name=tags.trackGenre).count() == 0:
            genre = Genre()
            genre.name = tags.trackGenre
            genre.save()
        genre = Genre.objects.get(name=tags.trackGenre)
        track.genre = genre

    if 'ALBUM_TITLE' in response and 'ALBUM_ARTIST' in response:
        tags.albumTitle = strip_tags(response['ALBUM_TITLE']).lstrip().rstrip()
        tags.albumArtist = strip_tags(response['ALBUM_ARTIST']).lstrip().rstrip().split(',')
        if Album.objects.filter(title=tags.albumTitle).count() == 0:
            album = Album()
            album.title = tags.albumTitle
            album.artist.remove()
            for artist in tags.albumArtist:
                if Artist.objects.filter(name=artist).count() == 0:
                    newArtist = Artist()
                    newArtist.name = artist
                    newArtist.save()
                album.artist.add(Artist.objects.get(name=artist))

            if 'ALBUM_TOTAL_DISC' in response:
                tags.albumTotalDisc = checkIntValueError(response['ALBUM_TOTAL_DISC'])
                album.totalDisc = tags.albumTotalDisc

            if 'ALBUM_TOTAL_TRACK' in response:
                tags.albumTotalTrack = checkIntValueError(response['ALBUM_TOTAL_DISC'])
                album.totalTrack = tags.albumTotalTrack

        album = Album.objects.get(title=tags.albumTitle)
        track.album = album
    track.save()


# Update the file information locally
def updateFileMetadata(track, tags):
    if track.location.endswith(".mp3"):
        # Check if the file has a tag header
        audioTag = ID3()
        if tags.trackTitle is not None:
            audioTag.add(TIT2(tags.trackTitle))
        if tags.trackYear is not None:
            audioTag.add(TDRC(tags.trackYear))
        if tags.trackArtist is not None:
            audioTag.add(TPE1(tags.trackArtist))
        if tags.trackPerformer is not None:
            audioTag.add(TOPE(tags.trackPerformer))
        if tags.trackComposer is not None:
            audioTag.add(TCOM(tags.trackComposer))
        if tags.trackNumber is not None:
            if tags.albumTotalTrack is not None:
                audioTag.add(TRCK(tags.trackNumber + "/" + tags.albumTotalTrack))
            else:
                audioTag.add(TRCK(tags.trackNumber))
        if tags.trackBPM is not None:
            audioTag.add(TBPM(tags.trackBPM))
        if tags.trackLyrics is not None:
            audioTag.add(USLT(tags.trackLyrics))
        if tags.trackGenre is not None:
            audioTag.add(TCON(tags.trackGenre))
        if tags.albumTitle is not None:
            audioTag.add(TALB(tags.albumTitle))
        if tags.albumArtist is not None:
            audioTag.add(TPE1(tags.albumArtist))
        if tags.albumTotalDisc is not None:
            # TODO : find tag for total disc
            pass
        audioTag.save()
        data = errorCheckMessage(True, None)
    elif track.location.endswith(".flac"):
        audioTag = FLAC()
        if tags.trackTitle is not None:
            audioTag['TITLE'] = tags.trackTitle
        if tags.trackYear is not None:
            audioTag['DATE'] = tags.trackYear
        if tags.trackArtist is not None:
            audioTag['ARTIST'] = tags.trackArtist
        if tags.trackPerformer is not None:
            audioTag['PERFORMER'] = tags.trackPerformer
        if tags.trackComposer is not None:
            audioTag['COMPOSER'] = tags.trackComposer
        if tags.trackNumber is not None:
            audioTag['TRACKNUMBER'] = tags.trackNumber
        if tags.albumTotalTrack is not None:
            audioTag['TOTALTRACK'] = tags.albumTotalTrack
        if tags.trackBPM is not None:
            audioTag['BPM'] = tags.trackBPM
        if tags.trackLyrics is not None:
            audioTag['LYRICS'] = tags.trackLyrics
        if tags.trackGenre is not None:
            audioTag['GENRE'] = tags.trackGenre
        if tags.albumTitle is not None:
            audioTag['ALBUM'] = tags.albumTitle
        if tags.albumArtist is not None:
            audioTag['ARTIST'] = tags.albumArtist
        if tags.albumTotalDisc is not None:
            # TODO : find tag for total disc
            pass
        audioTag.save()
        data = errorCheckMessage(True, None)
    else:
        data = errorCheckMessage(False, "formatError")
    return data


#
def changeTrackMetadata(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        tags = Information()
        if user.is_superuser:
            if 'TRACK_ID' in response:
                trackId = strip_tags(response['TRACK_ID'])
                if Track.objects.filter(id=trackId).count() == 1:
                    track = Track.objects.get(id=trackId)
                    # Updating database information
                    updateDBInfo(response, track, tags)
                    # Changing tags in the file
                    data = updateFileMetadata(track, tags)
                else:
                    data = errorCheckMessage(False, "dbError")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)

