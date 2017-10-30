import hashlib
import os
from multiprocessing import Process
from random import randint

from django import db

from app.models import FileType
from app.utils import errorCheckMessage, ImportMp3Thread, splitTable, \
    addAllGenreAndAlbumAndArtistsMP3, createMoodbarsUrls


def scanLibrary(library, playlist, convert):
    failedItems = []
    coverPath = "/ManaZeak/static/img/covers/"
    print("started scanning library")
    if not os.path.isdir(coverPath):
        try:
            os.makedirs(coverPath)
        except OSError:
            return errorCheckMessage(False, "coverError")

    mp3Files = []
    for root, dirs, files in os.walk(library.path):
        for file in files:
            if file.lower().endswith('.mp3'):
                mp3Files.append(os.path.join(root, file))

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

    # TODO, change when implement other file types
    if len(mp3Files) == 0:
        return errorCheckMessage(False, "emptyLibrary")

    print("indexed all files")
    mp3ID = FileType.objects.get(name="mp3")
    scanThread = Process(target=scanLibraryProcess, args=(mp3Files, library, playlist, convert, coverPath, mp3ID,))
    db.connections.close_all()
    scanThread.start()
    data = {
        'PLAYLIST_ID': playlist.id,
    }
    data = {**data, **errorCheckMessage(True, None)}
    return data


# Scan a library.
def scanLibraryProcess(mp3Files, library, playlist, convert, coverPath, mp3ID):
    addAllGenreAndAlbumAndArtistsMP3(mp3Files)
    print("Filled DB structure")
    print(len(mp3Files))
    trackPath = splitTable(mp3Files)
    threads = []
    # Saving all the library to base
    for tracks in trackPath:
        threads.append(ImportMp3Thread(tracks, playlist, convert, mp3ID, coverPath))
    for thread in threads:
        thread.start()
    print("Launched scanning threads")
    for thread in threads:
        thread.join()
    print("Ended scan")
    playlist.isScanned = True
    playlist.save()
    library.playlist = playlist
    library.save()
    # TODO : re-enable CRC generation
    # tracks = playlist.track.all()
    # splicedTracks = splitTable(tracks)
    # threads = []
    # generating CRC checksum
    # for tracks in splicedTracks:
    #    threads.append(CRCGenerator(tracks))
    # for thread in threads:
    #    thread.start()
    createMoodbarsUrls(playlist)


# Select a sound with shuffle mode enabled
def shuffleSoundSelector(shuffle):
    playlist = shuffle.playlist
    if shuffle.tracksPlayed.count() == 0:
        possibleTracks = playlist.track.all()
    else:
        possibleTracks = playlist.track.exclude(shuffle.tracksPlayed)

    # Select a random track
    length = len(possibleTracks)
    selected = randint(0, length)
    count = 0
    for track in possibleTracks:
        if count == selected:
            return track
        else:
            count += 1
    return -1
