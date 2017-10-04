import hashlib
import os

import binascii

import math
import threading

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from mutagen.id3 import ID3
from mutagen.mp3 import MP3

from app.models import FileType, Track, Genre, Album, Artist


# Render class for serving modal to client
class ScanModal(TemplateView):
    template_name = 'utils/modal.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(ScanModal, self).dispatch(*args, **kwargs)


def checkIfNotNone(trackAttribute):
    if trackAttribute is not None:
        return trackAttribute
    else:
        return "null"


def checkIfNotNoneNumber(trackAttribute):
    if trackAttribute is not None:
        return str(trackAttribute)
    else:
        return "\"null\""


def exportPlaylistToJson(playlist):
    tracks = playlist.track.all()
    finalData = "["
    for track in tracks:
        finalData += "{ \"ID\":"
        finalData += str(track.id)
        finalData += ", \"TITLE\":\""
        finalData += checkIfNotNone(track.title)
        finalData += "\", \"YEAR\":"
        finalData += checkIfNotNoneNumber(track.year)
        finalData += ", \"COMPOSER\":\""
        finalData += checkIfNotNone(track.composer)
        finalData += "\", \"PERFORMER\":\""
        finalData += checkIfNotNone(track.performer)
        finalData += "\", \"TRACK_NUMBER\":"
        finalData += checkIfNotNoneNumber(track.number)
        finalData += ", \"BPM\":"
        finalData += checkIfNotNoneNumber(track.bpm)
        finalData += ", \"LYRICS\":\""
        finalData += checkIfNotNone(track.lyrics)
        finalData += "\", \"COMMENT\":\""
        finalData += checkIfNotNone(track.comment)
        finalData += "\", \"BITRATE\":"
        finalData += checkIfNotNoneNumber(track.bitRate)
        finalData += ", \"SAMPLERATE\":"
        finalData += checkIfNotNoneNumber(track.sampleRate)
        finalData += ", \"DURATION\":"
        finalData += checkIfNotNoneNumber(track.duration)
        finalData += ", \"GENRE\":\""
        if track.genre is not None:
            finalData += checkIfNotNone(track.genre.name)
        else:
            finalData += "null"
        finalData += "\", \"FILE_TYPE\":\""
        finalData += checkIfNotNone(track.fileType.name)
        finalData += "\", \"DISC_NUMBER\":"
        finalData += checkIfNotNoneNumber(track.discNumber)
        finalData += ", \"SIZE\":"
        finalData += checkIfNotNoneNumber(track.size)
        finalData += ", \"LAST_MODIFIED\":\""
        finalData += checkIfNotNoneNumber(track.lastModified)
        finalData += "\", \"ARTISTS\":["
        for artist in track.artist.all():
            finalData += "{\"ID\":"
            finalData += str(artist.id)
            finalData += ", \"NAME\":\""
            finalData += checkIfNotNone(artist.name)
            finalData += "\"},"
        finalData = finalData[:-1]
        finalData += "], \"ALBUM\": { "
        if track.album is not None:
            finalData += "\"ID\":"
            finalData += checkIfNotNoneNumber(track.album.id)
            finalData += ", \"TITLE\":\""
            finalData += checkIfNotNone(track.album.title)
            finalData += "\", \"TOTAL_DISC\":"
            finalData += checkIfNotNoneNumber(track.album.totalDisc)
            finalData += ", \"TOTAL_TRACK\":"
            finalData += checkIfNotNoneNumber(track.album.totalTrack)
            finalData += ", \"ARTIST\":["
            for artist in track.album.artist.all():
                finalData += "{\"ID\":"
                finalData += checkIfNotNoneNumber(artist.id)
                finalData += ", \"NAME\":\""
                finalData += checkIfNotNone(artist.name)
                finalData += "\"},"
        else:
            finalData += "\"ID\":\"null\"}"
        finalData = finalData[:-1]
        finalData += "]}},"
    finalData = finalData[:-1]
    finalData += "]"
    return finalData


def populateDB():
    if FileType.objects.all().count() == 0:
        fileType = FileType(name="mp3")
        fileType.save()
        fileType = FileType(name="ogg")
        fileType.save()
        fileType = FileType(name="flac")
        fileType.save()
        fileType = FileType(name="wav")
        fileType.save()


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
        addTrackMP3(root, file, playlist, convert, fileTypeId)
    else:
        track.scanned = True


# TODO: remove the file in DB that have been removed
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
                    addTrackMP3(root, file, playlist, convert, mp3ID)
                else:
                    compareTrackAndFile(track, root, file, playlist, convert, mp3ID, replacedTitles)
    # Removed the tracks that haven't been scanned
    removedTracks = playlist.track.filter(scanned=False).delete()
    return [replacedTitles, removedTracks]


def addTrackMP3(root, file, playlist, convert, fileTypeId, coverPath):
    track = Track()

    # --- Calculating checksum
    track.CRC = CRC32_from_file(root + "/" + file)

    # --- FILE INFORMATION ---
    audioFile = MP3(root + "/" + file)
    track.location = root + "/" + file
    track.size = os.path.getsize(root + "/" + file)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    track.bitRateMode = audioFile.info.bitrate_mode
    track.fileType = fileTypeId

    # --- FILE TAG ---
    audioTag = ID3(root + "/" + file)
    if convert:
        audioTag.update_to_v24()
        audioTag.save()
    audioTag = ID3(root + "/" + file)

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
            track.title = audioTag['TIT2'].text[0]

    if 'TDRC' in audioTag:
        if not audioTag['TDRC'].text[0].get_text() == "":
            track.year = audioTag['TDRC'].text[0].get_text()[:4]  # Date of Recording

    totalTrack = 0
    totalDisc = 1
    if 'TRCK' in audioTag:
        if not audioTag['TRCK'].text[0] == "":
            if "/" in audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = audioTag['TRCK'].text[0].split('/')
                track.number = tags[0]
                totalTrack = tags[1]
            else:
                track.number = audioTag['TRCK'].text[0]

    if 'TCOM' in audioTag:
        if not audioTag['TCOM'].text[0] == "":
            track.composer = audioTag['TCOM'].text[0]

    if 'TOPE' in audioTag:
        if not audioTag['TOPE'].text[0] == "":
            track.performer = audioTag['TOPE'].text[0]

    if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(audioTag['TBPM'].text[0]))

    if 'COMM' in audioTag:
        if not audioTag['COMM'].text[0] == "":
            track.comment = audioTag['COMM'].text[0]

    if 'USLT' in audioTag:
        if not audioTag['USLT'].text[0] == "":
            track.lyrics = audioTag['USLT'].text[0]

    if len(audioTag.getall('TXXX')) != 0:
        for txxx in audioTag.getall('TXXX'):
            if txxx.desc == 'TOTALDISCS':
                totalDisc = txxx.text[0]

    # --- Save data for many-to-many relationship registering ---
    track.save()

    # --- Adding genre to DB ---
    if 'TCON' in audioTag:
        genreName = audioTag['TCON'].text[0]
        genreFound = Genre.objects.filter(name=genreName)
        if genreFound.count() == 0:
            genre = Genre()
            genre.name = genreName
            genre.save()
        genre = Genre.objects.get(name=genreName)
        track.genre = genre

    # --- Adding artist to DB ---
    if 'TPE1' in audioTag:  # Check if artist exists
        artists = audioTag['TPE1'].text[0].split(",")
        for artistName in artists:
            artistName = artistName.lstrip()  # Remove useless spaces at the beginning
            num_results = Artist.objects.filter(name=artistName).count()
            if num_results == 0:  # The artist doesn't exist
                artist = Artist()
                artist.name = artistName
                artist.save()
            artist = Artist.objects.get(name=artistName)
            track.artist.add(artist)

    # --- Adding album to DB ---
    if 'TALB' in audioTag:
        albumTitle = audioTag['TALB'].text[0]
        if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
            album = Album()
            album.title = albumTitle
            album.totalTrack = totalTrack
            album.totalDisc = totalDisc
            album.save()
            for trackArtist in track.artist.all():
                album.artist.add(trackArtist)
        album = Album.objects.get(title=albumTitle)
        # Check for each artist if he exists in the album
        for trackArtist in track.artist.all():
            if album.artist.filter(name=trackArtist.name).count() == 0:  # The Artist wasn't added
                album.artist.add(trackArtist)
                album.save()
        track.album = album
        track.save()

    # --- Adding track to playlist --- #
    playlist.track.add(track)


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
