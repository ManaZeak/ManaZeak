import json

from django.http import JsonResponse
from django.utils.html import strip_tags
from mutagen.flac import FLAC
from mutagen.id3 import ID3
from mutagen.id3._frames import TIT2, TDRC, TPE1, TOPE, TCOM, TRCK, TBPM, USLT, TCON, TALB, COMM, TXXX, TPOS

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
    trackTitle = None
    trackArtist = None
    trackPerformer = None
    trackComposer = None
    trackYear = None
    trackNumber = None
    trackBPM = None
    trackGenre = None
    albumTitle = None
    albumArtist = None
    albumTotalDisc = None
    albumDiscNumber = None
    albumTotalTrack = None
    comment = None
    lyrics = None


# Update the track into the database
def updateDBInfo(response, track):
    tags = Information()
    # Changing tags in the database
    if 'TITLE' in response:
        tags.trackTitle = strip_tags(response['TITLE']).lstrip().rstrip()
        track.title = tags.trackTitle

    if 'ARTISTS' in response:
        tags.trackArtist = strip_tags(response['ARTISTS']).lstrip().rstrip().split(',')
        artists = []
        for artist in tags.trackArtist:
            if Artist.objects.filter(name=artist).count() == 0:
                newArtist = Artist()
                newArtist.name = artist
                newArtist.save()
            artists.append(Artist.objects.get(name=artist))
        track.artist.clear()
        for artist in artists:
            track.artist.add(artist)

    if 'PERFORMER' in response:
        tags.trackPerformer = strip_tags(response['PERFORMER']).lstrip().rstrip()
        track.performer = tags.trackPerformer

    if 'COMPOSER' in response:
        tags.trackComposer = strip_tags(response['COMPOSER']).lstrip().rstrip()
        track.composer = tags.trackComposer

    if 'YEAR' in response:
        tags.trackYear = checkIntValueError(response['YEAR'])
        track.year = tags.trackYear

    if 'TRACK_NUMBER' in response:
        tags.trackNumber = checkIntValueError(response['TRACK_NUMBER'])
        track.number = tags.trackNumber

    if 'BPM' in response:
        track.bpm = checkIntValueError(response['BPM'])

    if 'LYRICS' in response:
        tags.lyrics = strip_tags(response['LYRICS']).lstrip().rstrip()
        track.lyrics = tags.lyrics

    if 'COMMENT' in response:
        tags.comment = strip_tags(response['COMMENT']).lstrip().rstrip()
        track.comment = tags.comment

    if 'GENRE' in response:
        tags.trackGenre = strip_tags(response['GENRE']).lstrip().rstrip()
        if Genre.objects.filter(name=tags.trackGenre).count() == 0:
            genre = Genre()
            genre.name = tags.trackGenre
            genre.save()
        genre = Genre.objects.get(name=tags.trackGenre)
        track.genre = genre

    print("resp", response)
    if 'ALBUM_TITLE' in response and 'ALBUM_ARTISTS' in response:
        tags.albumTitle = strip_tags(response['ALBUM_TITLE']).lstrip().rstrip()
        tags.albumArtist = strip_tags(response['ALBUM_ARTISTS']).lstrip().rstrip().split(',')
        if Album.objects.filter(title=tags.albumTitle).count() == 0:
            album = Album()
            album.title = tags.albumTitle
            album.save()
        album = Album.objects.get(title=tags.albumTitle)
        album.artist.clear()
        for artist in tags.albumArtist:
            if Artist.objects.filter(name=artist).count() == 0:
                newArtist = Artist()
                newArtist.name = artist
                newArtist.save()
            album.artist.add(Artist.objects.get(name=artist))

        if 'ALBUM_TOTAL_DISC' in response:
            tags.albumTotalDisc = checkIntValueError(response['ALBUM_TOTAL_DISC'])
            album.totalDisc = tags.albumTotalDisc

        if 'DISC_NUMBER' in response:
            tags.albumDiscNumber = checkIntValueError(response['DISC_NUMBER'])
            track.discNumber = tags.albumDiscNumber

        if 'ALBUM_TOTAL_TRACK' in response:
            tags.albumTotalTrack = checkIntValueError(response['ALBUM_TOTAL_TRACK'])
            album.totalTrack = tags.albumTotalTrack
        album.save()
        track.album = album
    track.save()
    return tags


# Update the file information locally
def updateFileMetadata(track, tags):
    if track.location.endswith(".mp3"):
        # Check if the file has a tag header
        print(tags)
        audioTag = ID3()
        if tags.trackTitle is not None:
            audioTag.add(TIT2(text=tags.trackTitle))
        if tags.trackYear is not None:
            audioTag.add(TDRC(text=str(tags.trackYear)))
        if tags.trackArtist is not None:
            audioTag.add(TPE1(text=tags.trackArtist))
        if tags.trackPerformer is not None:
            audioTag.add(TOPE(text=tags.trackPerformer))
        if tags.trackComposer is not None:
            audioTag.add(TCOM(text=tags.trackComposer))
        if tags.trackNumber is not None:
            if tags.albumTotalTrack is not None:
                audioTag.add(TRCK(text=str(tags.trackNumber) + "/" + str(tags.albumTotalTrack)))
                print(audioTag)
            else:
                audioTag.add(TRCK(text=tags.trackNumber))
        if tags.trackBPM is not None:
            audioTag.add(TBPM(text=tags.trackBPM))
        if tags.lyrics is not None:
            audioTag.add(USLT(text=tags.lyrics))
        if tags.trackGenre is not None:
            audioTag.add(TCON(text=tags.trackGenre))
        if tags.albumTitle is not None:
            audioTag.add(TALB(text=tags.albumTitle))
        if tags.albumArtist is not None:
            audioTag.add(TPE1(text=tags.albumArtist))
        if tags.albumTotalDisc is not None:
            audioTag.add(TXXX(desc="TOTALDISCS", text=[tags.albumTotalDisc]))
        if tags.comment is not None:
            audioTag.add(COMM(text=tags.comment))
        if tags.albumDiscNumber is not None:
            audioTag.add(TPOS(text=str(tags.albumDiscNumber)))
        audioTag.save(track.location)
        data = errorCheckMessage(True, None)
    elif track.location.endswith(".flac"):
        audioTag = FLAC(track.location)
        if tags.trackTitle is not None:
            audioTag["TITLE"] = tags.trackTitle
        if tags.trackYear is not None:
            audioTag['DATE'] = str(tags.trackYear)
        if tags.trackArtist is not None:
            audioTag['ARTIST'] = tags.trackArtist
        if tags.trackPerformer is not None:
            audioTag['PERFORMER'] = tags.trackPerformer
        if tags.trackComposer is not None:
            audioTag['COMPOSER'] = tags.trackComposer
        if tags.trackNumber is not None:
            audioTag['TRACKNUMBER'] = str(tags.trackNumber)
        if tags.albumTotalTrack is not None:
            audioTag['TOTALTRACK'] = str(tags.albumTotalTrack)
        if tags.trackBPM is not None:
            audioTag['BPM'] = tags.trackBPM
        if tags.lyrics is not None:
            audioTag['LYRICS'] = tags.lyrics
        if tags.trackGenre is not None:
            audioTag['GENRE'] = tags.trackGenre
        if tags.albumTitle is not None:
            audioTag['ALBUM'] = tags.albumTitle
        if tags.albumArtist is not None:
            audioTag['ARTIST'] = tags.albumArtist
        if tags.albumTotalDisc is not None:
            audioTag['TOTALDISC'] = str(tags.albumTotalDisc)
        if tags.albumDiscNumber is not None:
            audioTag['DISCNUMBER'] = str(tags.albumDiscNumber)
        if tags.comment is not None:
            audioTag['COMMENT'] = str(tags.comment)
        audioTag.save(track.location)
        data = errorCheckMessage(True, None)
    else:
        data = errorCheckMessage(False, "formatError")
    return data


#
def changeTracksMetadata(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if user.is_superuser:
            if 'TRACKS_ID' in response:
                trackIds = response['TRACKS_ID']
                data = {}
                for trackId in trackIds:
                    trackId = checkIntValueError(trackId)
                    if trackId is not None:
                        if Track.objects.filter(id=trackId).count() == 1:
                            track = Track.objects.get(id=trackId)
                            # Updating database information
                            tags = updateDBInfo(response, track)
                            # Changing tags in the file
                            data = updateFileMetadata(track, tags)
                        else:
                            data = errorCheckMessage(False, "dbError")
                    else:
                        data = errorCheckMessage(False, "valueError")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
