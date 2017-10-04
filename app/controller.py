import hashlib
import json
import math
import os
import threading

from django.http.response import JsonResponse
from mutagen.id3 import ID3
from mutagen.mp3 import MP3

from app.models import Track, Artist, Album, FileType, Genre
from app.utils import exportPlaylistToJson, CRCGenerator


# Return a bad format error
def badFormatError():
    data = {
        'RESULT': 'FAIL',
        'ERROR': 'Bad format'
    }
    return JsonResponse(data)


def scanLibrary(library, playlist, convert):
    failedItems = []
    # TODO : Check if the cover folder is present
    coverPath = "/home/messmaker/Documents/covers/"  # TODO: to be defined with docker or with the front
    if not os.path.isdir(coverPath):
        os.makedirs(coverPath)

    mp3ID = FileType.objects.get(name="mp3")
    mp3Files = []
    for root, dirs, files in os.walk(library.path):
        for file in files:
            if file.lower().endswith('.mp3'):
                # addTrackMP3(root, file, playlist, convert, mp3ID, coverPath)
                mp3Files.append(root + "/" + file)

            elif file.lower().endswith('.ogg'):
                # TODO: implement
                pass

            elif file.lower().endswith('.flac'):
                # TODO: implement
                pass

            elif file.lower().endswith('.wav'):
                # TODO: implement
                pass

            else:
                failedItems.append(file)

    # TODO: if trackPath is null, return an error
    addAllGenreAndAlbumAndArtistsMP3(mp3Files)
    trackPath = splitTable(mp3Files)
    threads = []
    # saving all the library to base
    for tracks in trackPath:
        threads.append(ImportMp3Thread(tracks, playlist, convert, mp3ID, coverPath))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    library.playlist = playlist
    library.save()
    tracks = playlist.track.all()
    splicedTracks = splitTable(tracks)
    threads = []
    # generating CRC checksum
    for tracks in splicedTracks:
        threads.append(CRCGenerator(tracks))
    for thread in threads:
        thread.start()
    data = {
        'DONE': 'OK',
        'ID': playlist.id,
        'FAILS': failedItems,
    }
    return data


def addAllGenreAndAlbumAndArtistsMP3(filePaths):
    for filePath in filePaths:
        audioTag = ID3(filePath)
        # --- Adding genre to DB ---
        if 'TCON' in audioTag:
            genreName = audioTag['TCON'].text[0]
            if Genre.objects.filter(name=genreName).count() == 0:
                genre = Genre()
                genre.name = genreName
                genre.save()
        # --- Adding album to DB ---
        if 'TALB' in audioTag:
            albumTitle = audioTag['TALB'].text[0]
            if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
                album = Album()
                album.title = albumTitle
                album.save()
        # --- Adding artist to DB ---
        if 'TPE1' in audioTag:  # Check if artist exists
            artists = audioTag['TPE1'].text[0].split(",")
            for artistName in artists:
                artistName = artistName.lstrip()  # Remove useless spaces at the beginning
                if Artist.objects.filter(name=artistName).count() == 0:  # The artist doesn't exist
                    artist = Artist()
                    artist.name = artistName
                    artist.save()


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
    audioTag = ID3(path)
    if convert:
        audioTag.update_to_v24()
        audioTag.save()
    audioTag = ID3(path)

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
        if Genre.objects.filter(name=genreName).count() == 1:
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
    else:
        # TODO default value of artist (see if it's possible)
        pass

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

    else:
        # TODO default value of artist (see if it's possible)
        pass

    # --- Adding track to playlist --- #
    playlist.track.add(track)


class ImportMp3Thread(threading.Thread):
    def __init__(self, mp3Paths, playlist, convert, fileTypeId, coverPath):
        threading.Thread.__init__(self)
        self.mp3Paths = mp3Paths
        self.playlist = playlist
        self.convert = convert
        self.fileTypeId = fileTypeId
        self.coverPath = coverPath

    def run(self):
        print(self.mp3Paths)
        for path in self.mp3Paths:
            addTrackMP3Thread(path, self.playlist, self.convert, self.fileTypeId, self.coverPath)


def splitTable(table):
    print(table)
    if len(table) % 4 == 0:
        chunkSize = int(len(table) / 4)
    else:
        chunkSize = int(len(table) / 4) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]
