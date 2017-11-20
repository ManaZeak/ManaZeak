import binascii
import hashlib
import math

import multiprocessing
import os
import threading

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.html import strip_tags
from django.views.generic import TemplateView
from mutagen.flac import FLAC
from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3, BitrateMode


from app.dao import addGenreBulk, addArtistBulk, addAlbumBulk, addTrackBulk
from app.models import FileType, Track, Genre, Album, Artist

from app.models import FileType, Track, Genre, Album, Artist, Stats



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


# Split a table in x tables of equal size
def splitTableCustom(table, number):
    if len(table) % number == 0:
        chunkSize = int(len(table) / number)
    else:
        chunkSize = int(len(table) / number) + 1
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


    elif error == "rescanError":
        errorTitle = "Library isn't ready"
        errorMessage = "Another scan is running in background, be a little more patient"


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


def addAllGenreAndAlbumAndArtists(mp3Files, flacFiles, coverPath, convert, playlistId):
    tracks = []
    albumReference = {}
    tracksInfo = []
    artists = set()
    albums = {}
    genres = set()

    # Adding default values
    albumReference[""] = Album.objects.get(title=None).id

    mp3FileReference = FileType.objects.get(name="mp3")
    flacFileReference = FileType.objects.get(name="flac")

    print("Started scanning MP3 file")

    # TODO: Create general file processor

    threads = []
    # MP3 file processor
    if len(mp3Files) != 0:
        procNumber = multiprocessing.cpu_count()
        while len(mp3Files) < procNumber:
            procNumber -= 1
            if procNumber == 0:
                print("ERROR!")
                return
        splicedMP3 = splitTableCustom(mp3Files, procNumber)
        for mp3 in splicedMP3:
            thread = ImportBulkThread(0, mp3, convert, mp3FileReference, coverPath)
            threads.append(thread)
            thread.start()
    if len(flacFiles) != 0:
        procNumber = multiprocessing.cpu_count()
        while len(flacFiles) < procNumber:
            procNumber -= 1
            if procNumber == 0:
                return
        splicedFLAC = splitTableCustom(flacFiles, multiprocessing.cpu_count())
        for flac in splicedFLAC:
            thread = ImportBulkThread(1, flac, convert, flacFileReference, coverPath)
            threads.append(thread)
            thread.start()

    print("Started all scanning threads")
    for thread in threads:
        thread.join()
        tracks += thread.tracks

    for track in tracks:
        albumArtist = ""
        tracksInfo.append(track)
        for artist in track.artist:
            artists.add(artist)
            albumArtist += artist + ","
        albumArtist = albumArtist[:-1]
        genres.add(track.genre)
        albums[track.album] = albumArtist

    print("Starting adding tracks to database")
    # Analyse the genre found and add the missing genre to the base
    genresReference = addGenreBulk(genres)
    artistsReference = addArtistBulk(artists)
    albumReference = addAlbumBulk(albums, artistsReference)
    addTrackBulk(tracksInfo, artistsReference, albumReference, genresReference, playlistId)
    print("Finished import")


class ImportBulkThread(threading.Thread):
    def __init__(self, fileType, files, convert, fileReference, coverPath):
        threading.Thread.__init__(self)
        self.fileType = fileType
        self.files = files
        self.convert = convert
        self.fileReference = fileReference
        self.coverPath = coverPath
        self.tracks = []

    def run(self):
        # Check the file type for choosing the way of processing files
        if self.fileType == 0:  # MP3 files
            for file in self.files:
                self.tracks.append(createMP3Track(file, self.convert, self.fileReference, self.coverPath))
        elif self.fileType == 1:  # FLAC files
            for file in self.files:
                self.tracks.append(createFLACTrack(file, self.fileReference, self.coverPath))


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


# Scan all the attributes of an MP3 track, and add it to base.
def createMP3Track(filePath, convert, fileTypeId, coverPath):
    track = LocalTrack()

    # --- FILE INFORMATION ---
    audioFile = MP3(filePath)
    track.location = filePath
    track.size = os.path.getsize(filePath)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    if audioFile.info.bitrate_mode == BitrateMode.UNKNOWN:
        track.bitRateMode = 0
    elif audioFile.info.bitrate_mode == BitrateMode.CBR:
        track.bitRateMode = 1
    elif audioFile.info.bitrate_mode == BitrateMode.VBR:
        track.bitRateMode = 2
    else:
        track.bitRateMode = 3
    track.fileType = fileTypeId.id

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
            track.title = strip_tags(audioTag['TIT2'].text[0]).rstrip()

    if 'TDRC' in audioTag:
        if not audioTag['TDRC'].text[0].get_text() == "":
            track.year = strip_tags(audioTag['TDRC'].text[0].get_text()[:4]).rstrip()  # Date of Recording

    if 'TRCK' in audioTag:
        if not audioTag['TRCK'].text[0] == "":
            if "/" in audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = strip_tags(audioTag['TRCK'].text[0]).rstrip().split('/')
                track.number = tags[0]
                track.totalTrack = tags[1]
            else:
                track.number = strip_tags(audioTag['TRCK'].text[0]).rstrip()

    if 'TCOM' in audioTag:
        if not audioTag['TCOM'].text[0] == "":
            track.composer = strip_tags(audioTag['TCOM'].text[0]).rstrip()

    if 'TOPE' in audioTag:
        if not audioTag['TOPE'].text[0] == "":
            track.performer = strip_tags(audioTag['TOPE'].text[0]).rstrip()

    if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(strip_tags(audioTag['TBPM'].text[0]).rstrip()))

    if 'COMM' in audioTag:
        if not audioTag['COMM'].text[0] == "":
            track.comment = strip_tags(audioTag['COMM'].text[0]).rstrip()

    if 'USLT' in audioTag:
        if not audioTag['USLT'].text[0] == "":
            track.lyrics = strip_tags(audioTag['USLT'].text[0])

    if len(audioTag.getall('TXXX')) != 0:
        for txxx in audioTag.getall('TXXX'):
            if txxx.desc == 'TOTALDISCS':
                totalDisc = strip_tags(txxx.text[0]).rstrip()

    # --- Adding genre to structure ---
    if 'TCON' in audioTag:
        genreName = strip_tags(audioTag['TCON'].text[0]).rstrip()
        track.genre = genreName

    # --- Adding artist to structure ---
    if 'TPE1' in audioTag:  # Check if artist exists
        artists = strip_tags(audioTag['TPE1'].text[0]).split(",")
        for artistName in artists:
            artistName = artistName.lstrip().rstrip()  # Remove useless spaces at the beginning
            track.artist.append(artistName)

    # --- Adding album to structure ---
    if 'TALB' in audioTag:
        albumTitle = strip_tags(audioTag['TALB'].text[0]).rstrip()
        track.album = albumTitle.replace('\n', '')

    return track


def createFLACTrack(filePath, fileTypeId, coverPath):
    track = LocalTrack()

    # --- FILE INFORMATION ---
    audioFile = FLAC(filePath)
    track.location = filePath
    track.size = os.path.getsize(filePath)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    track.fileType = fileTypeId.id

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

    if 'GENRE' in audioFile:
        genreName = processVorbisTag(audioFile['GENRE'])
        track.genre = genreName.rstrip()

    if 'ARTIST' in audioFile:  # Check if artist exists
        artists = processVorbisTag(audioFile['ARTIST']).split(",")
        for artist in artists:
            track.artist.append(artist.lstrip().rstrip())

    if 'ALBUM' in audioFile:
        albumTitle = processVorbisTag(audioFile['ALBUM'])
        track.album = albumTitle.replace('\n', '')

    return track


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



class LocalTrack:
    def __init__(self, ):
        self.location = self.coverLocation = self.title = self.composer = self.performer = self.lyrics = self.comment \
            = self.album = self.genre = self.moodbar = ""
        self.year = self.fileType = self.number = self.bpm = self.bitRate = self.bitRateMode = self.sampleRate \
            = self.duration = self.discNumber = self.size = self.playCounter = 0
        self.artist = []
        self.scanned = False

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


def getUserNbTrackListened(user):
    tracks = Stats.objects.filter(user=user)
    totalListenedTrack = 0

    for track in tracks:
        totalListenedTrack += track.playCounter

    print(totalListenedTrack)
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
    totalgenre = 0
    
    for counter in genreCounter:
        totalgenre = totalgenre + genreCounter.counter

    for counter in genreCounter
        percentage = genreCounter.counter / totalgenre
    
    genreCounter.append(percentage)

    return genreCounter

def getUserPrefArtist(user)
    artists = Artist.objects.all()
    artistCounter = []
   
    for artist in artists
        counter = 0
        tracks = Stats.objects.filter(track__artist=artist, user=user)
      
        for track in tracks:
            counter += track.playCounter

        artistCounter.append(counter)
        
    artistTuple = (artists, artistCounter)

    sorted(artistTuple, key=lambda artistTuple: artistTuple.artistCounter.counter)

    return artistTuple
