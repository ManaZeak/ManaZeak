import json

from django.http import JsonResponse
from django.utils.html import strip_tags
from mutagen.flac import FLAC
from mutagen.id3 import ID3
from mutagen.id3._frames import TIT2, TDRC, TPE1, TOPE, TCOM, TRCK, TBPM, USLT, TCON, TALB

from app.models import Track, Artist, Album, Genre
from app.utils import errorCheckMessage


def checkIntValueError(string):
    try:
        value = int(strip_tags(string).lstrip().rstrip())
    except ValueError:
        value = None
    return value


def changeTrackMetadata(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        trackTitle = None
        trackArtist = None
        trackPerformer = None
        trackComposer = None
        trackYear = None
        trackNumber = None
        trackBPM = None
        trackLyrics = None
        trackGenre = None
        albumTitle = None
        albumArtist = None
        albumTotalDisc = None
        albumTotalTrack = None

        if user.is_superuser:
            if 'TRACK_ID' in response:
                trackId = strip_tags(response['TRACK_ID'])
                if Track.objects.filter(id=trackId).count() == 1:
                    track = Track.objects.get(id=trackId)

                    # Changing tags in the database
                    if 'TRACK_TITLE' in response:
                        trackTitle = strip_tags(response['TRACK_TITLE']).lstrip().rstrip()
                        track.title = trackTitle

                    if 'TRACK_ARTIST' in response:
                        trackArtist = strip_tags(response['TRACK_ARTIST']).lstrip().rstrip().split(',')
                        artists = []
                        for artist in trackArtist:
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
                        trackGenre = strip_tags(response['TRACK_GENRE']).lstrip().rstrip()
                        if Genre.objects.filter(name=trackGenre).count() == 0:
                            genre = Genre()
                            genre.name = trackGenre
                            genre.save()
                        genre = Genre.objects.get(name=trackGenre)
                        track.genre = genre

                    if 'ALBUM_TITLE' in response and 'ALBUM_ARTIST' in response:
                        albumTitle = strip_tags(response['ALBUM_TITLE']).lstrip().rstrip()
                        albumArtist = strip_tags(response['ALBUM_ARTIST']).lstrip().rstrip().split(',')
                        if Album.objects.filter(title=albumTitle).count() == 0:
                            album = Album()
                            album.title = albumTitle
                            album.artist.remove()
                            for artist in albumArtist:
                                if Artist.objects.filter(name=artist).count() == 0:
                                    newArtist = Artist()
                                    newArtist.name = artist
                                    newArtist.save()
                                album.artist.add(Artist.objects.get(name=artist))

                            if 'ALBUM_TOTAL_DISC' in response:
                                albumTotalDisc = checkIntValueError(response['ALBUM_TOTAL_DISC'])
                                album.totalDisc = albumTotalDisc

                            if 'ALBUM_TOTAL_TRACK' in response:
                                albumTotalTrack = checkIntValueError(response['ALBUM_TOTAL_DISC'])
                                album.totalTrack = albumTotalTrack

                        album = Album.objects.get(title=albumTitle)
                        track.album = album
                    track.save()

                    # Changing tags in the file
                    if track.location.endswith(".mp3"):
                        # Check if the file has a tag header
                        audioTag = ID3()
                        if trackTitle is not None:
                            audioTag.add(TIT2(trackTitle))
                        if trackYear is not None:
                            audioTag.add(TDRC(trackYear))
                        if trackArtist is not None:
                            audioTag.add(TPE1(trackArtist))
                        if trackPerformer is not None:
                            audioTag.add(TOPE(trackPerformer))
                        if trackComposer is not None:
                            audioTag.add(TCOM(trackComposer))
                        if trackNumber is not None:
                            if albumTotalTrack is not None:
                                audioTag.add(TRCK(trackNumber+"/"+albumTotalTrack))
                            else:
                                audioTag.add(TRCK(trackNumber))
                        if trackBPM is not None:
                            audioTag.add(TBPM(trackBPM))
                        if trackLyrics is not None:
                            audioTag.add(USLT(trackLyrics))
                        if trackGenre is not None:
                            audioTag.add(TCON(trackGenre))
                        if albumTitle is not None:
                            audioTag.add(TALB(albumTitle))
                        if albumArtist is not None:
                            audioTag.add(TPE1(albumArtist))
                        if albumTotalDisc is not None:
                            # TODO : find tag for total disc
                            pass
                        audioTag.save()
                        data = errorCheckMessage(True, None)
                    elif track.location.endswith(".flac"):
                        audioTag = FLAC()
                        if trackTitle is not None:
                            audioTag['TITLE'] = trackTitle
                        if trackYear is not None:
                            audioTag['DATE'] = trackYear
                        if trackArtist is not None:
                            audioTag['ARTIST'] = trackArtist
                        if trackPerformer is not None:
                            audioTag['PERFORMER'] = trackPerformer
                        if trackComposer is not None:
                            audioTag['COMPOSER'] = trackComposer
                        if trackNumber is not None:
                            audioTag['TRACKNUMBER'] = trackNumber
                        if albumTotalTrack is not None:
                            audioTag['TOTALTRACK'] = albumTotalTrack
                        if trackBPM is not None:
                            audioTag['BPM'] = trackBPM
                        if trackLyrics is not None:
                            audioTag['LYRICS'] = trackLyrics
                        if trackGenre is not None:
                            audioTag['GENRE'] = trackGenre
                        if albumTitle is not None:
                            audioTag['ALBUM'] = albumTitle
                        if albumArtist is not None:
                            audioTag['ARTIST'] = albumArtist
                        if albumTotalDisc is not None:
                            # TODO : find tag for total disc
                            pass
                        audioTag.save()
                        data = errorCheckMessage(True, None)
                    else:
                        data = errorCheckMessage(False, "formatError")
                else:
                    data = errorCheckMessage(False, "dbError")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)

