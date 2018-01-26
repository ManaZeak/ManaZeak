import json
import multiprocessing

import os
import threading

from django import db
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags
from multiprocessing import Process

from app.dao import addGenreBulk, addArtistBulk, addAlbumBulk, addTrackBulk
from app.models import Library, Playlist, FileType, Album
from app.track.importer import createMP3Track, createVorbisTrack
from app.utils import errorCheckMessage, splitTableCustom


# Perform the initial scan for a library
@login_required(redirect_field_name='login.html', login_url='app:login')
def initialScan(request):
    print("Asked for initial scan")
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'LIBRARY_ID' in response:
            library = Library.objects.get(id=response['LIBRARY_ID'])
            if os.path.isdir(library.path):
                playlist = Playlist()
                playlist.name = library.name
                playlist.user = request.user
                playlist.isLibrary = True
                playlist.save()
                data = scanLibrary(library, playlist, library.convertID3)
            else:
                data = errorCheckMessage(False, "dirNotFound")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Create a new library can only be done while being a superuser.
@login_required(redirect_field_name='login.html', login_url='app:login')
def newLibrary(request):
    if request.method == 'POST':
        if request.user.is_superuser:
            response = json.loads(request.body)
            if 'URL' in response and 'NAME' in response and 'CONVERT' in response:
                dirPath = response['URL']
                if os.path.isdir(dirPath):
                    # Removing / at the end of the dir path if present
                    if dirPath.endswith("/"):
                        dirPath = dirPath[:-1]
                    library = Library()
                    library.path = dirPath
                    library.name = strip_tags(response['NAME'])
                    library.convertID3 = response['CONVERT']
                    library.user = request.user
                    library.save()
                    data = {
                        'LIBRARY_ID': library.id,
                        'LIBRARY_NAME': library.name,
                    }
                    data = {**data, **errorCheckMessage(True, None)}
                else:
                    data = errorCheckMessage(False, "dirNotFound")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Function for check if a library has been scanned.
@login_required(redirect_field_name='login.html', login_url='app:login')
def checkLibraryScanStatus(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'PLAYLIST_ID' in response:
            if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
                playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
                data = errorCheckMessage(playlist.isScanned, None)
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def rescanLibrary(library, user):
    # Check if the library is not used somewhere else
    if library.playlist.isScanned:
        # Delete all the old tracks
        library.playlist.delete()

        # Recreating playlist
        playlist = Playlist()
        playlist.name = library.name
        playlist.user = user
        playlist.isLibrary = True
        playlist.save()
        library.playlist = playlist
        library.save()

        # Scan library
        data = scanLibrary(library, playlist, library.convertID3)
    else:
        data = errorCheckMessage(False, "rescanError")
    return data


# Drop a library and index all the tracks
@login_required(redirect_field_name='login.html', login_url='app:login')
def rescanLibraryRequest(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if 'LIBRARY_ID' in response:
            library = strip_tags(response['LIBRARY_ID'])
            if Library.objects.filter(id=library).count() == 1:
                library = Library.objects.get(id=library)
                data = rescanLibrary(library, user)
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


def rescanAllLibraries(request):
    if request.method == 'GET':
        user = request.user
        if user.is_superuser:
            libraries = Library.objects.all()
            for library in libraries:
                rescanLibrary(library, user)
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Index all the file and start the import
def scanLibrary(library, playlist, convert):
    failedItems = []
    coverPath = "/ManaZeak/static/img/covers/"
    print("started scanning library: " + library.name)
    if not os.path.isdir(coverPath):
        try:
            os.makedirs(coverPath)
        except OSError:
            return errorCheckMessage(False, "coverError")

    mp3Files = []
    flacFiles = []
    oggFiles = []
    for root, dirs, files in os.walk(library.path):
        for file in files:
            if file.lower().endswith('.mp3'):
                mp3Files.append(os.path.join(root, file))

            elif file.lower().endswith('.ogg'):
                oggFiles.append(os.path.join(root, file))

            elif file.lower().endswith('.flac'):
                flacFiles.append(os.path.join(root, file))

            elif file.lower().endswith('.wav'):
                # TODO: implement
                pass

            else:
                failedItems.append(file)

    # TODO, change when implement other file types
    if len(mp3Files) == 0 and len(flacFiles) == 0 and len(oggFiles) == 0:
        return errorCheckMessage(False, "emptyLibrary")

    scanThread = Process(target=scanLibraryProcess, args=(mp3Files, flacFiles, oggFiles, playlist, convert, coverPath, library))
    db.connections.close_all()
    scanThread.start()
    data = {
        'PLAYLIST_ID': playlist.id,
    }
    data = {**data, **errorCheckMessage(True, None)}
    return data


# Delete a library in the application
def deleteLibrary(library):
    library.playlist.track.all().delete()
    library.playlist.delete()
    library.delete()
    return errorCheckMessage(True, None)


# Delete all the libraries and the related elements
@login_required(redirect_field_name='login.html', login_url='app:login')
def deleteAllLibrary(request):
    if request.method == 'GET':
        admin = request.user
        if admin.is_superuser:
            libraries = Library.objects.all()
            for library in libraries:
                library.playlist.track.all().delete()
                library.playlist.delete()
                library.delete()
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Handler for importing the library
def scanLibraryProcess(mp3Files, flacFiles, oggFiles, playlist, convert, coverPath, library):
    importLibrary(mp3Files, flacFiles, oggFiles, coverPath, convert, playlist.id)
    playlist.isScanned = True
    playlist.save()
    library.playlist = playlist
    library.save()


# Create thread for importing the library into db
def importLibrary(mp3Files, flacFiles, oggFiles, coverPath, convert, playlistId):
    tracks = []
    albumReference = {}
    tracksInfo = []
    artists = set()
    albums = {}
    albumsTotalTracks = {}
    albumsTotalDisc = {}
    genres = set()

    # Adding default values
    albumReference[""] = Album.objects.get(title=None).id

    mp3FileReference = FileType.objects.get(name="mp3")
    flacFileReference = FileType.objects.get(name="flac")
    oggFileReference = FileType.objects.get(name="ogg")

    print("Started scanning MP3 file")
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
    # FLAC file processor
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
    # OGG file processor
    if len(oggFiles) != 0:
        procNumber = multiprocessing.cpu_count()
        while len(oggFiles) < procNumber:
            procNumber -= 1
            if procNumber == 0:
                return
        splicedOGG = splitTableCustom(oggFiles, multiprocessing.cpu_count())
        for ogg in splicedOGG:
            thread = ImportBulkThread(1, ogg, convert, oggFileReference, coverPath)
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
        albumsTotalTracks[track.album] = track.totalTrack
        albumsTotalDisc[track.album] = track.totalDisc
        genres.add(track.genre)
        if track.album in albums:
            for artist in albumArtist.split(","):
                if artist not in albums[track.album]:
                    albums[track.album] += "," + artist
        else:
            albums[track.album] = albumArtist
    print("Starting adding tracks to database")
    # Analyse the genre found and add the missing genre to the base
    genresReference = addGenreBulk(genres)
    artistsReference = addArtistBulk(artists)
    albumReference = addAlbumBulk(albums, artistsReference, albumsTotalTracks, albumsTotalDisc)
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
        elif self.fileType == 1:  # Vorbis files
            for file in self.files:
                self.tracks.append(createVorbisTrack(file, self.fileReference, self.coverPath))
