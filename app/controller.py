import hashlib
import math
import os
import threading

from django.http.response import JsonResponse
from django.utils.html import strip_tags
from multiprocessing import Process
from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3

from app.models import Track, Artist, Album, FileType, Genre


# Return a bad format error
from app.utils import ResponseThread, scanLibraryProcess


def badFormatError():
    data = {
        'RESULT': 'FAIL',
        'ERROR': 'Bad format'
    }
    return JsonResponse(data)


def scanLibrary(library, playlist, convert):
    failedItems = []
    # TODO : Check if the cover folder is present
    coverPath = "/ManaZeak/static/img/covers/"  # TODO: to be defined with docker or with the front
    if not os.path.isdir(coverPath):
        try:
            os.makedirs(coverPath)
        except OSError:
            print("error")
            data = {
                'DONE': 'FAIL',
                'ERROR': 'Can\'t create cover path',
            }
            return data

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
    print("indexed all files")
    mp3ID = FileType.objects.get(name="mp3")
    scanThread = Process(target=scanLibraryProcess, args=(mp3Files, library, playlist, convert, coverPath, mp3ID,))
    scanThread.start()
    data = {
        'DONE': True,
        'ID': playlist.id,
    }
    return data


