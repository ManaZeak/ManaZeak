import os
from multiprocessing import Process

from django import db
from django.http.response import JsonResponse

from app.models import FileType
from app.utils import scanLibraryProcess, errorCheckMessage


def scanLibrary(library, playlist, convert):
    failedItems = []
    # TODO : Check if the cover folder is present
    coverPath = "/ManaZeak/static/img/covers/"
    if not os.path.isdir(coverPath):
        try:
            os.makedirs(coverPath)
        except OSError:
            return errorCheckMessage(False, "coverError")
    else:
        return errorCheckMessage(False, "dirNotFound")

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
    db.connections.close_all()
    scanThread.start()
    data = {
        'PLAYLIST_ID': playlist.id,
    }
    data = {**data, **errorCheckMessage(True, None)}
    return data
