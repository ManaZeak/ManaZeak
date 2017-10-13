import os
from multiprocessing import Process
from random import randint

from django import db

from app.models import FileType
from app.utils import scanLibraryProcess, errorCheckMessage


def scanLibrary(library, playlist, convert):
    failedItems = []
    # TODO : Check if the cover folder is present
    coverPath = "/ManaZeak/static/img/covers/"
    print("started scanning library")
    if not os.path.isdir(coverPath):
        try:
            os.makedirs(coverPath)
        except OSError:
            return errorCheckMessage(False, "coverError")

    print(library.path)
    mp3Files = []
    for root, dirs, files in os.walk(library.path):
        for file in files:
            if file.lower().endswith('.mp3'):
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
    print("indexed all files")
    mp3ID = FileType.objects.get(name="mp3")
    scanThread = Process(target=scanLibraryProcess, args=(mp3Files, library, playlist, convert, coverPath, mp3ID,))
    print("me")
    db.connections.close_all()
    print("der")
    scanThread.start()
    data = {
        'PLAYLIST_ID': playlist.id,
    }
    data = {**data, **errorCheckMessage(True, None)}
    return data


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
