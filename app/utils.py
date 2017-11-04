import binascii
import csv
import hashlib
import math
import os
import threading

import io
from contextlib import closing

from django.contrib.auth.decorators import login_required
from django.db import connection
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic import TemplateView
from mutagen.flac import FLAC
from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3

from app.models import FileType, Track, Genre, Album, Artist


# Render class for serving modal to client (Scan)
class ScanModal(TemplateView):
    template_name = 'utils/modal/scanLibrary.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(ScanModal, self).dispatch(*args, **kwargs)


# Render class for serving modal to client (Edit metadata)
class EditMetadataModal(TemplateView):
    template_name = 'utils/modal/editMetadata.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(EditMetadataModal, self).dispatch(*args, **kwargs)


# Split a table in 4 table of equal size
def splitTable(table):
    if len(table) % 4 == 0:
        chunkSize = int(len(table) / 4)
    else:
        chunkSize = int(len(table) / 4) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]


# Check if an attribute is existing or not
def checkIfNotNone(trackAttribute):
    if trackAttribute is not None:
        return trackAttribute
    else:
        return "null"


# Check if an attribute is existing or not and add "" around it
def checkIfNotNoneNumber(trackAttribute):
    if trackAttribute is not None:
        return str(trackAttribute)
    else:
        return "\"null\""


def processVorbisTag(tag):
    tag = strip_tags(tag)
    tag = tag[2:]
    tag = tag[:-2]
    return tag


# Generate the base of any status message
def errorCheckMessage(isDone, error):
    errorTitle = ""
    errorMessage = ""
    if error == "badFormat":
        errorTitle = "Wrong format"
        errorMessage = "The server didn't understood what you said."
    elif error == "badRequest":
        errorTitle = "Bad request"
        errorMessage = "The server didn't expected this request."
    elif error == "dbError":
        errorTitle = "Database error"
        errorMessage = "Something went wrong with the database."
    elif error == "fileNotFound":
        errorTitle = "No such file"
        errorMessage = "The server didn't find the file you asked."
    elif error == "dirNotFound":
        errorTitle = "No such directory"
        errorMessage = "The server didn't find the directory you asked."
    elif error == "emptyLibrary":
        errorTitle = "The library is empty"
        errorMessage = "There is no file to add in the library"
    elif error == "coverError":
        errorTitle = "Can't create file"
        errorMessage = "The server cannot generate the file for the covers, check the permissions."
    elif error == "permissionError":
        errorTitle = "Not permitted"
        errorMessage = "You are not allowed to do this."
    elif error is None:
        errorTitle = "null"
        errorMessage = "null"
    return {
        'DONE': isDone,
        'ERROR_H1': "\"" + errorTitle + "\"",
        'ERROR_MSG': "\"" + errorMessage + "\"",
    }


# Exporting a playlist to json with not all the file metadata
def exportPlaylistToSimpleJson(playlist):
    tracks = playlist.track.all()
    spiltedTracks = splitTable(tracks)
    threads = []
    finalData = "["
    for splitedTrack in spiltedTracks:
        threads.append(SimpleJsonCreator(splitedTrack))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
        finalData += thread.finalData
    finalData = finalData[:-1]
    finalData += "]"
    return finalData.replace('\n', '').replace('\r', '')


# Thread for creating the json in parallel
class SimpleJsonCreator(threading.Thread):
    finalData = ""

    def __init__(self, tracks):
        threading.Thread.__init__(self)
        self.tracks = tracks

    def run(self):
        internData = ""
        for track in self.tracks:
            internData += "{\"ID\":"
            internData += str(track.id)
            internData += ",\"TITLE\":\""
            internData += checkIfNotNone(track.title)
            internData += "\",\"YEAR\":"
            internData += checkIfNotNoneNumber(track.year)
            internData += ",\"COMPOSER\":\""
            internData += checkIfNotNone(track.composer)
            internData += "\",\"PERFORMER\":\""
            internData += checkIfNotNone(track.performer)
            internData += "\",\"DURATION\":"
            internData += checkIfNotNoneNumber(track.duration)
            internData += ",\"BITRATE\":"
            internData += checkIfNotNoneNumber(track.bitRate)
            internData += ",\"ARTISTS\":["
            for artist in track.artist.all():
                internData += "{\"ID\":"
                internData += str(artist.id)
                internData += ",\"NAME\":\""
                internData += checkIfNotNone(artist.name)
                internData += "\"},"
            if len(track.artist.all()) != 0:
                internData = internData[:-1]
            internData += "],\"ALBUM\":{"
            if track.album is not None:
                internData += "\"ID\":"
                internData += checkIfNotNoneNumber(track.album.id)
                internData += ",\"TITLE\":\""
                internData += checkIfNotNone(track.album.title)
                internData += "\""
            internData += "},\"GENRE\":\""
            if track.genre is not None:
                internData += checkIfNotNone(track.genre.name)
            else:
                internData += "null"
            internData += "\"},"
        self.finalData = internData


# export a playlist to json, not threaded, to be avoided
def exportPlaylistToJson(playlist):
    tracks = playlist.track.all()
    finalData = "["
    for track in tracks:
        finalData += "{\"ID\":"
        finalData += str(track.id)
        finalData += ",\"TITLE\":\""
        finalData += checkIfNotNone(track.title)
        finalData += "\",\"YEAR\":"
        finalData += checkIfNotNoneNumber(track.year)
        finalData += ",\"COMPOSER\":\""
        finalData += checkIfNotNone(track.composer)
        finalData += "\",\"PERFORMER\":\""
        finalData += checkIfNotNone(track.performer)
        finalData += "\",\"TRACK_NUMBER\":"
        finalData += checkIfNotNoneNumber(track.number)
        finalData += ",\"BPM\":"
        finalData += checkIfNotNoneNumber(track.bpm)
        finalData += ",\"LYRICS\":\""
        finalData += checkIfNotNone(track.lyrics)
        finalData += "\",\"COMMENT\":\""
        finalData += checkIfNotNone(track.comment)
        finalData += "\",\"BITRATE\":"
        finalData += checkIfNotNoneNumber(track.bitRate)
        finalData += ",\"SAMPLERATE\":"
        finalData += checkIfNotNoneNumber(track.sampleRate)
        finalData += ",\"DURATION\":"
        finalData += checkIfNotNoneNumber(track.duration)
        finalData += ",\"GENRE\":\""
        if track.genre is not None:
            finalData += checkIfNotNone(track.genre.name)
        else:
            finalData += "null"
        finalData += "\",\"FILE_TYPE\":\""
        finalData += checkIfNotNone(track.fileType.name)
        finalData += "\",\"DISC_NUMBER\":"
        finalData += checkIfNotNoneNumber(track.discNumber)
        finalData += ",\"SIZE\":"
        finalData += checkIfNotNoneNumber(track.size)
        finalData += ",\"LAST_MODIFIED\":\""
        finalData += checkIfNotNoneNumber(track.lastModified)
        finalData += "\",\"ARTISTS\":["
        for artist in track.artist.all():
            finalData += "{\"ID\":"
            finalData += str(artist.id)
            finalData += ",\"NAME\":\""
            finalData += checkIfNotNone(artist.name)
            finalData += "\"},"
        finalData = finalData[:-1]
        finalData += "],\"ALBUM\":{"
        if track.album is not None:
            finalData += "\"ID\":"
            finalData += checkIfNotNoneNumber(track.album.id)
            finalData += ",\"TITLE\":\""
            finalData += checkIfNotNone(track.album.title)
            finalData += "\",\"TOTAL_DISC\":"
            finalData += checkIfNotNoneNumber(track.album.totalDisc)
            finalData += ",\"TOTAL_TRACK\":"
            finalData += checkIfNotNoneNumber(track.album.totalTrack)
            finalData += ",\"ARTIST\":["
            for artist in track.album.artist.all():
                finalData += "{\"ID\":"
                finalData += checkIfNotNoneNumber(artist.id)
                finalData += ",\"NAME\":\""
                finalData += checkIfNotNone(artist.name)
                finalData += "\"},"
            finalData = finalData[:-1]
            finalData += "]}},"
        else:
            finalData += "\"ID\":\"null\"}},"
    finalData = finalData[:-1]
    finalData += "]"
    return finalData


# Function to add all the genre, album and artist to the database
# Need to do this action before scan to avoid concurrency errors
def addAllGenreAndAlbumAndArtistsMP3(filePaths):
    for filePath in filePaths:
        try:
            audioTag = ID3(filePath)
        except ID3NoHeaderError:
            audioTag = ID3()
        hasArtist = False
        trackArtists = []
        # --- Adding genre to DB ---
        if 'TCON' in audioTag:
            genreName = strip_tags(audioTag['TCON'].text[0])
            if Genre.objects.filter(name=genreName).count() == 0:
                genre = Genre()
                genre.name = genreName
                genre.save()
        # --- Adding artist to DB ---
        if 'TPE1' in audioTag:  # Check if artist exists
            artists = strip_tags(audioTag['TPE1'].text[0]).split(",")
            for artistName in artists:
                artistName = artistName.lstrip()  # Remove useless spaces at the beginning
                if Artist.objects.filter(name=artistName).count() == 0:  # The artist doesn't exist
                    artist = Artist()
                    artist.name = artistName
                    artist.save()
                    trackArtists.append(artist)
                else:
                    trackArtists.append(Artist.objects.get(name=artistName))
                hasArtist = True
        # --- Adding album to DB ---
        if 'TALB' in audioTag:
            albumTitle = strip_tags(audioTag['TALB'].text[0])
            if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
                album = Album()
                album.title = albumTitle
                album.save()
                if hasArtist:
                    album.artist.add(*trackArtists)


def addAllGenreAndAlbumAndArtistsFLAC(filePaths):
    for filePath in filePaths:
        # TODO: check if the tags are presents.
        audioTag = FLAC(filePath)
        # --- Adding genre to DB ---
        if 'GENRE' in audioTag:
            genreName = processVorbisTag(audioTag['GENRE'])

            if Genre.objects.filter(name=genreName).count() == 0:
                genre = Genre()
                genre.name = genreName
                genre.save()
        # --- Adding artist to DB ---
        if 'ARTIST' in audioTag:  # Check if artist exists
            artists = processVorbisTag(audioTag['ARTIST'])

            artists = artists.split(",")
            for artistName in artists:
                artistName = artistName.lstrip()  # Remove useless spaces at the beginning
                if Artist.objects.filter(name=artistName).count() == 0:  # The artist doesn't exist
                    artist = Artist()
                    artist.name = artistName
                    artist.save()
        # --- Adding album to DB ---
        if 'ALBUM' in audioTag:
            albumTitle = processVorbisTag(audioTag['ALBUM'])

            if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
                album = Album()
                album.title = albumTitle
                album.save()
                if 'ALBUMARTIST' in audioTag:
                    albumArtists = processVorbisTag(audioTag['ALBUMARTIST'])

                    albumArtists = albumArtists.split(",")
                    for albumArtist in albumArtists:
                        if Artist.objects.filter(name=albumArtist).count() == 0:
                            artist = Artist()
                            artist.name = albumArtist
                            artist.save()
                        else:
                            artist = Artist.objects.get(name=albumArtist)
                        album.artist.add(artist)


# With a given set give
def addGenreBulk(genres):
    genreReference = {"": Genre.objects.get(name=None).id}

    # Add genre to the database
    genreInBase = Genre.objects.filter(name__in=genres)
    genreToAdd = len(genres) - len(genreInBase)

    # Get the sequence value
    cursor = connection.cursor()
    cursor.execute("SELECT nextval('app_genre_id_seq')")
    firstId = cursor.fetchone()
    # Offset the sequence value
    sql = 'ALTER SEQUENCE app_genre_id_seq RESTART WITH {0};'.format(str(firstId[0] + genreToAdd))
    cursor.execute(sql)
    cursor.close()

    # Add known genre into the dict and remove the genre known in database in the set
    for genre in genreInBase:
        genreReference[genre.name] = genre.id
        genres.remove(genre.name)

    # Creating the structure for DB import
    counter = 0
    infoGenre = []
    for genre in genres:
        genreReference[genre] = firstId[0] + counter
        infoGenre.append((firstId[0] + counter, genre.name))
        counter += 1

    print("generating CSV")
    # Creating a CSV file in memory for faster import in the database
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for info in infoGenre:
        writer.writerow([info[x] for x in range(0, len(info))])

    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='app_genre',
            sep='\t',
            columns=('id', 'name'),
        )

    return genreReference


def addAllGenreAndAlbumAndArtists(mp3Files, flacFiles, coverPath, convert):
    albumReference = {}
    artistReference = {}
    tracksInfo = []
    artists = set()
    albums = set()
    genres = set()

    # Adding default values
    artistReference[""] = Artist.objects.get(name=None)
    albumReference[""] = Album.objects.get(title=None)

    mp3fileReference = FileType.objects.get(name="mp3")

    print("Started scanning MP3 file")

    # MP3 file processor
    for filePath in mp3Files:
        track = createMP3Track(filePath, convert, mp3fileReference, coverPath)
        tracksInfo.append(track)
        for artist in track.artist:
            artists.add(artist)
        albums.add(track.album)
        genres.add(track.genre)

    print("Finished scanning MP3 file")

    # Analyse the genre found and add the missing genre to the base
    genreReference = addGenreBulk(genres)

    # Add Artist to the database


    # cursor.executemany('INSERT INTO app_genre VALUES (?, ?)', infoGenre)



    '''
        # --- Adding genre to DB ---
        if 'TCON' in audioTag:
            genreName = strip_tags(audioTag['TCON'].text[0])
            if Genre.objects.filter(name=genreName).count() == 0:
                genre = Genre()
                genre.name = genreName
                genre.save()
                # Add genre to dict
                genreReference[genreName] = genre.id
            elif genreName not in genreReference:
                genre = Genre.objects.get(name=genreName)
                # Add genre to dict
                genreReference[genreName] = genre.id

        # --- Adding artist to DB ---
        if 'TPE1' in audioTag:  # Check if artist exists
            artists = strip_tags(audioTag['TPE1'].text[0]).split(",")
            for artistName in artists:
                artistName = artistName.lstrip()  # Remove useless spaces at the beginning
                if Artist.objects.filter(name=artistName).count() == 0:  # The artist doesn't exist
                    artist = Artist()
                    artist.name = artistName
                    artist.save()
                    artistReference[artistName] = artist.id
                    trackArtists.append(artist)
                elif artistName not in artistReference:
                    artist = Artist.objects.get(name=artistName)
                    artistReference[artistName] = artist.id
                    trackArtists.append(artist)
                else:
                    trackArtists.append(Artist.objects.get(name=artistName))
                hasArtist = True

        # --- Adding album to DB ---
        if 'TALB' in audioTag:
            albumTitle = strip_tags(audioTag['TALB'].text[0])
            if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
                album = Album()
                album.title = albumTitle
                album.save()
                albumReference[albumTitle] = album.id
                if hasArtist:
                    album.artist.add(*trackArtists)
            elif albumTitle not in albumReference:
                albumReference[albumTitle] = Album.objects.get(title=albumTitle).id
        tracksInfo.append(LocalTrack())
    # Processing flac files
    for filePath in flacFiles:
        # TODO: check if the tags are presents.
        audioTag = FLAC(filePath)
        # --- Adding genre to DB ---
        if 'GENRE' in audioTag:
            genreName = processVorbisTag(audioTag['GENRE'])

            if Genre.objects.filter(name=genreName).count() == 0:
                genre = Genre()
                genre.name = genreName
                genre.save()
                genreReference[genreName] = genre.id
            elif genreName not in genreReference:
                genreReference[genreName] = Genre.objects.get(name=genreName).id

        # --- Adding artist to DB ---
        if 'ARTIST' in audioTag:  # Check if artist exists
            artists = processVorbisTag(audioTag['ARTIST'])

            artists = artists.split(",")
            for artistName in artists:
                artistName = artistName.lstrip()  # Remove useless spaces at the beginning
                if Artist.objects.filter(name=artistName).count() == 0:  # The artist doesn't exist
                    artist = Artist()
                    artist.name = artistName
                    artist.save()
                    artistReference[artistName] = artist.id
                elif artistName not in artistReference:
                    artistReference[artistName] = Artist.objects.get(name=artistName)

        # --- Adding album to DB ---
        if 'ALBUM' in audioTag:
            albumTitle = processVorbisTag(audioTag['ALBUM'])

            if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
                album = Album()
                album.title = albumTitle
                album.save()
                albumReference[albumTitle] = album.id
                if 'ALBUMARTIST' in audioTag:
                    albumArtists = processVorbisTag(audioTag['ALBUMARTIST'])

                    albumArtists = albumArtists.split(",")
                    for albumArtist in albumArtists:
                        if Artist.objects.filter(name=albumArtist).count() == 0:
                            artist = Artist()
                            artist.name = albumArtist
                            artist.save()
                            artistReference[albumArtist] = artist.id
                        else:
                            artist = Artist.objects.get(name=albumArtist)
                        album.artist.add(artist)
            elif albumTitle not in albumReference:
                albumReference[albumTitle] = Album.objects.get(title=albumTitle).id
'''
    # Preparing informations about tracks for adding them to the database
    # TODO: info sur les tracks a ajouter (préparation bulk)
    # TODO: info sur les TJ a ajouter (préparation bulk)
    # TODO: insérer toutes les infos sur les tracks en bulk avec un curseur (http://www.smipple.net/snippet/adige/kinterbasdb%20executemany)
    # TODO: insérer toutes les infos dans les TJ
    # TODO: remove old function, re factor for more generic function.


# Create the file type entry
def populateDB():
    if FileType.objects.all().count() == 0:
        print("Created files types")
        FileType(name="mp3").save()
        FileType(name="ogg").save()
        FileType(name="flac").save()
        FileType(name="wav").save()
    if Artist.objects.all().count() == 0:
        print("Created default artist")
        Artist(name=None).save()
    if Album.objects.all().count() == 0:
        print("Created default album")
        Album(title=None).save()
    if Genre.objects.all().count() == 0:
        print("Created default genre")
        Genre(name=None).save()


# Create the CRC32 code from a file
def CRC32_from_file(filename):
    buf = open(filename, 'rb').read()
    buf = (binascii.crc32(buf) & 0xFFFFFFFF)
    return "%08X" % buf


# Compare the file by hash (faster than reading the tag)
def compareTrackAndFile(track, root, file, playlist, convert, fileTypeId, replacedTitles):
    fileCRC = CRC32_from_file(root + "/" + file)
    if fileCRC != track.CRC:
        replacedTitles.append(track.title)
        track.delete()
        # addTrackMP3(root, file, playlist, convert, fileTypeId)
    else:
        track.scanned = True


# Check if new file have been added
def rescanLibrary(library):
    playlist = library.playlist
    convert = False
    mp3ID = FileType.objects.get(name="mp3")
    replacedTitles = []
    for root, dirs, files in os.walk(library.path):
        for file in files:
            if file.lower().endswith('.mp3'):
                track = Track.objects.get(location=root + file)
                if track is None:
                    # addTrackMP3(root, file, playlist, convert, mp3ID)
                    pass
                else:
                    compareTrackAndFile(track, root, file, playlist, convert, mp3ID, replacedTitles)
    # Removed the tracks that haven't been scanned
    removedTracks = playlist.track.filter(scanned=False).delete()
    return [replacedTitles, removedTracks]


# Scan all the attributes of an MP3 track, and add it to base.
def createMP3Track(filePath, convert, fileTypeId, coverPath):
    track = LocalTrack()

    # --- Calculating checksum
    track.CRC = CRC32_from_file(filePath)

    # --- FILE INFORMATION ---
    audioFile = MP3(filePath)
    track.location = filePath
    track.size = os.path.getsize(filePath)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    track.bitRateMode = audioFile.info.bitrate_mode
    track.fileType = fileTypeId

    # Check if the file has a tag header
    try:
        audioTag = ID3(filePath)
    except ID3NoHeaderError:
        audioTag = ID3()
    # --- FILE TAG ---
    if convert:
        audioTag.update_to_v24()
        audioTag.save()

    # --- COVER ---
    if 'APIC:' in audioTag:
        front = audioTag['APIC:'].data
        # Creating md5 hash for the cover
        md5Name = hashlib.md5()
        md5Name.update(front)
        # Check if the cover already exists and save it
        if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
            with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                img.write(front)
        track.coverLocation = md5Name.hexdigest() + ".jpg"
    if 'TIT2' in audioTag:
        if not audioTag['TIT2'].text[0] == "":
            track.title = strip_tags(audioTag['TIT2'].text[0])

    if 'TDRC' in audioTag:
        if not audioTag['TDRC'].text[0].get_text() == "":
            track.year = strip_tags(audioTag['TDRC'].text[0].get_text()[:4])  # Date of Recording

    if 'TRCK' in audioTag:
        if not audioTag['TRCK'].text[0] == "":
            if "/" in audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = strip_tags(audioTag['TRCK'].text[0]).split('/')
                track.number = tags[0]
                totalTrack = tags[1]
            else:
                track.number = strip_tags(audioTag['TRCK'].text[0])

    if 'TCOM' in audioTag:
        if not audioTag['TCOM'].text[0] == "":
            track.composer = strip_tags(audioTag['TCOM'].text[0])

    if 'TOPE' in audioTag:
        if not audioTag['TOPE'].text[0] == "":
            track.performer = strip_tags(audioTag['TOPE'].text[0])

    if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(strip_tags(audioTag['TBPM'].text[0])))

    if 'COMM' in audioTag:
        if not audioTag['COMM'].text[0] == "":
            track.comment = strip_tags(audioTag['COMM'].text[0])

    if 'USLT' in audioTag:
        if not audioTag['USLT'].text[0] == "":
            track.lyrics = strip_tags(audioTag['USLT'].text[0])

    if len(audioTag.getall('TXXX')) != 0:
        for txxx in audioTag.getall('TXXX'):
            if txxx.desc == 'TOTALDISCS':
                totalDisc = strip_tags(txxx.text[0])

    # --- Adding genre to structure ---
    if 'TCON' in audioTag:
        genreName = strip_tags(audioTag['TCON'].text[0])
        genreFound = Genre.objects.filter(name=genreName)
        if genreFound.count() == 0:
            genre = Genre()
            genre.name = genreName
            genre.save()
        genre = Genre.objects.get(name=genreName)
        track.genre = genre

    # --- Adding artist to structure ---
    if 'TPE1' in audioTag:  # Check if artist exists
        artists = strip_tags(audioTag['TPE1'].text[0]).split(",")
        for artistName in artists:
            artistName = artistName.lstrip()  # Remove useless spaces at the beginning
            track.artist.append(artistName)

    # --- Adding album to structure ---
    if 'TALB' in audioTag:
        albumTitle = strip_tags(audioTag['TALB'].text[0])
        track.album = albumTitle

    return track


# Adding a MP3 track to the database
def addTrackMP3Thread(path, playlist, convert, fileTypeId, coverPath):
    track = Track()

    # --- FILE INFORMATION ---
    audioFile = MP3(path)
    track.location = path
    track.size = os.path.getsize(path)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    track.bitRateMode = audioFile.info.bitrate_mode
    track.fileType = fileTypeId

    # --- FILE TAG ---
    try:
        audioTag = ID3(path)
        if convert:
            audioTag.update_to_v24()
            audioTag.save()
        audioTag = ID3(path)
    except ID3NoHeaderError:
        audioTag = ID3()

    # --- COVER ---
    if 'APIC:' in audioTag:
        front = audioTag['APIC:'].data
        # Creating md5 hash for the cover
        md5Name = hashlib.md5()
        md5Name.update(front)
        # Check if the cover already exists and save it
        if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
            with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                img.write(front)
        track.coverLocation = "../static/img/covers/" + md5Name.hexdigest() + ".jpg"
    if 'TIT2' in audioTag:
        if not audioTag['TIT2'].text[0] == "":
            track.title = strip_tags(audioTag['TIT2'].text[0])

    if 'TDRC' in audioTag:
        if not audioTag['TDRC'].text[0].get_text() == "":
            track.year = strip_tags(audioTag['TDRC'].text[0].get_text())[:4]  # Date of Recording

    if 'TRCK' in audioTag:
        if not audioTag['TRCK'].text[0] == "":
            if "/" in audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = strip_tags(audioTag['TRCK'].text[0]).split('/')
                track.number = tags[0]
                totalTrack = tags[1]
            else:
                track.number = strip_tags(audioTag['TRCK'].text[0])

    if 'TCOM' in audioTag:
        if not audioTag['TCOM'].text[0] == "":
            track.composer = strip_tags(audioTag['TCOM'].text[0])

    if 'TOPE' in audioTag:
        if not audioTag['TOPE'].text[0] == "":
            track.performer = strip_tags(audioTag['TOPE'].text[0])

    if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(strip_tags(audioTag['TBPM'].text[0])))

    if 'COMM' in audioTag:
        if not audioTag['COMM'].text[0] == "":
            track.comment = strip_tags(audioTag['COMM'].text[0])

    if 'USLT' in audioTag:
        if not audioTag['USLT'].text[0] == "":
            track.lyrics = strip_tags(audioTag['USLT'].text[0])

    if len(audioTag.getall('TXXX')) != 0:
        for txxx in audioTag.getall('TXXX'):
            if txxx.desc == 'TOTALDISCS':
                totalDisc = strip_tags(txxx.text[0])

    # --- Save data for many-to-many relationship registering ---
    track.save()

    # --- Adding genre to DB ---
    if 'TCON' in audioTag:
        genreName = strip_tags(audioTag['TCON'].text[0])
        genre = Genre.objects.get(name=genreName)
        track.genre = genre

    # --- Adding artist to DB ---
    if 'TPE1' in audioTag:  # Check if artist exists
        artists = strip_tags(audioTag['TPE1'].text[0]).split(",")
        for artistName in artists:
            artistName = artistName.lstrip()  # Remove useless spaces at the beginning
            artist = Artist.objects.get(name=artistName)
            track.artist.add(artist)

    # --- Adding album to DB ---
    if 'TALB' in audioTag:
        albumTitle = strip_tags(audioTag['TALB'].text[0])
        album = Album.objects.get(title=albumTitle)
        track.album = album
        track.save()

    # --- Adding track to playlist --- #
    playlist.track.add(track)


# Create the md5 of all the files and add create the URLs
def createMoodbarsUrls(playlist):
    print("Generating moodbar URLs")
    tracks = playlist.track.all()
    for track in tracks:
        path = track.location.encode("ascii", "ignore")
        md5 = hashlib.md5(path).hexdigest()
        track.moodbar = "../static/mood/" + md5 + ".mood"
        track.save()
    print("Ended generating moodbars")


# Thread for generating multiple CRC32
class CRCGenerator(threading.Thread):
    def __init__(self, tracks):
        threading.Thread.__init__(self)
        self.tracks = tracks

    def run(self):
        tracks = list(self.tracks)
        print(tracks)
        for track in tracks:
            buf = open(track.location, 'rb').read()
            buf = (binascii.crc32(buf) & 0xFFFFFFFF)
            track.CRC = "%08X" % buf
            print("CRC = " + track.CRC)
            track.save()


def addFlacTrackThread(path, playlist, coverPath):
    track = Track()

    # --- FILE INFORMATION ---
    audioFile = FLAC(path)
    track.location = path
    track.size = os.path.getsize(path)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate

    # --- COVER ---
    pictures = audioFile.pictures
    if len(pictures) != 0:
        # Creating md5 hash for the cover
        md5Name = hashlib.md5()
        md5Name.update(pictures[0].data)
        # Check if the cover already exists and save it
        if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
            with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                img.write(pictures[0].data)
        track.coverLocation = "../static/img/covers/" + md5Name.hexdigest() + ".jpg"

    if 'TITLE' in audioFile:
        trackTitle = processVorbisTag(audioFile['TITLE'])
        if not trackTitle == "":
            track.title = trackTitle

    if 'DATE' in audioFile:
        trackDate = processVorbisTag(audioFile['DATE'])
        if not trackDate == "":
            track.year = trackDate  # Date of Recording

    if 'TRACKNUMBER' in audioFile:
        trackNumber = processVorbisTag(audioFile['TRACKNUMBER'])
        if not trackNumber == "":
            track.number = trackNumber

    if 'COMPOSER' in audioFile:
        trackComposer = processVorbisTag(audioFile['COMPOSER'])
        if not trackComposer == "":
            track.composer = trackComposer

    if 'PERFORMER' in audioFile:
        trackPerformer = processVorbisTag(audioFile['PERFORMER'])
        if not trackPerformer == "":
            track.performer = trackPerformer

    # TODO: find how to include this tags
    '''if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(strip_tags(audioTag['TBPM'].text[0])))

    if 'COMM' in audioTag:
        if not audioTag['COMM'].text[0] == "":
            track.comment = strip_tags(audioTag['COMM'].text[0])

    if 'USLT' in audioTag:
        if not audioTag['USLT'].text[0] == "":
            track.lyrics = strip_tags(audioTag['USLT'].text[0])

    if len(audioTag.getall('TXXX')) != 0:
        for txxx in audioTag.getall('TXXX'):
            if txxx.desc == 'TOTALDISCS':
                totalDisc = strip_tags(txxx.text[0])
    '''

    track.save()

    if 'GENRE' in audioFile:
        genreName = processVorbisTag(audioFile['GENRE'])
        track.genre = Genre.objects.get(name=genreName)

    if 'ALBUM' in audioFile:
        albumName = processVorbisTag(audioFile['ALBUM'])
        track.album = Album.objects.get(title=albumName)

    if 'ARTIST' in audioFile:
        artistNames = processVorbisTag(audioFile['ARTIST']).split(",")
        for artistName in artistNames:
            artistName = artistName.lstrip()
            track.artist.add(Artist.objects.get(name=artistName))

    track.save()
    playlist.track.add(track)


# Import in a threaded way a library
class ImportMp3Thread(threading.Thread):
    def __init__(self, mp3Paths, playlist, convert, fileTypeId, coverPath):
        threading.Thread.__init__(self)
        self.mp3Paths = mp3Paths
        self.playlist = playlist
        self.convert = convert
        self.fileTypeId = fileTypeId
        self.coverPath = coverPath

    def run(self):
        for path in self.mp3Paths:
            addTrackMP3Thread(path, self.playlist, self.convert, self.fileTypeId, self.coverPath)


class ImportFlacThread(threading.Thread):
    def __init__(self, tracks, playlist, coverPath):
        threading.Thread.__init__(self)
        self.tracks = tracks
        self.playlist = playlist
        self.coverPath = coverPath

    def run(self):
        for track in self.tracks:
            addFlacTrackThread(track, self.playlist, self.coverPath)


class LocalTrack:
    def __init__(self, ):
        self.location = self.coverLocation = self.title = self.composer = self.performer = self.lyrics = self.comment \
            = self.album = self.genre = self.moodbar = self.CRC = ""
        self.year = self.fileType = self.number = self.bpm = self.bitRate = self.bitRateMode = self.sampleRate \
            = self.duration = self.discNumber = self.size = 0
        self.artist = []
        self.scanned = False
