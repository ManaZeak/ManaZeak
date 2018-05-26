import json
import multiprocessing

import os
import threading
from time import sleep

from django import db
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags
from multiprocessing import Process

from app.dao import addGenreBulk, addArtistBulk, addAlbumBulk, addTrackBulk, refreshPlaylist
from app.models import Library, Playlist, FileType, Album, Track
from app.track.importer import createMP3Track, createVorbisTrack
from app.utils import errorCheckMessage, splitTableCustom, checkPermission, refreshAllViews


# Perform the initial scan for a library
@login_required(redirect_field_name='login.html', login_url='app:login')
def initialScan(request):
    print("Asked for initial scan")
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["LIBR"], user):
            if 'LIBRARY_ID' in response:
                library = Library.objects.get(id=response['LIBRARY_ID'])
                if os.path.isdir(library.path):
                    playlist = library.playlist
                    data = scanLibrary(library, playlist, library.convertID3)
                else:
                    data = errorCheckMessage(False, "dirNotFound")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Create a new library can only be done while being a superuser.
@login_required(redirect_field_name='login.html', login_url='app:login')
def newLibrary(request):
    if request.method == 'POST':
        user = request.user
        if checkPermission(["LIBR"], user):
            response = json.loads(request.body)
            if 'URL' in response and 'NAME' in response:
                dirPath = response['URL']
                if os.path.isdir(dirPath):
                    # Removing / at the end of the dir path if present
                    if dirPath.endswith("/"):
                        dirPath = dirPath[:-1]
                    library = Library()
                    library.path = dirPath
                    playlist = Playlist()
                    playlist.user = user
                    playlist.isLibrary = True
                    playlist.name = strip_tags(response['NAME'])
                    playlist.save()
                    library.playlist = playlist
                    library.save()
                    data = {
                        'LIBRARY_ID': library.id,
                        'LIBRARY_NAME': library.playlist.name,
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
        user = request.user
        if checkPermission(["LIBR"], user):
            if 'PLAYLIST_ID' in response:
                if Playlist.objects.filter(id=response['PLAYLIST_ID']).count() == 1:
                    playlist = Playlist.objects.get(id=response['PLAYLIST_ID'])
                    data = errorCheckMessage(playlist.isScanned, None)
                else:
                    data = errorCheckMessage(False, "dbError")
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Index all the file and start the import
def scanLibrary(library, playlist, convert):
    failedItems = []
    coverPath = "/ManaZeak/static/img/covers/"
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


# TODO : Create a threaded function for non blocking behavior with front
# Drop a library and index all the tracks
@login_required(redirect_field_name='login.html', login_url='app:login')
def rescanLibraryRequest(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["LIBR"], user):
            if 'LIBRARY_ID' in response:
                libraryId = strip_tags(response['LIBRARY_ID'])
                scanThread = Process(target=rescanLibraryProcess, args=libraryId)
                db.connections.close_all()
                scanThread.start()
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


@login_required(redirect_field_name='login.html', login_url='app:login')
def rescanAllLibraries(request):
    if request.method == 'GET':
        user = request.user
        if checkPermission(["LIBR"], user):
            scanThread = Process(target=rescanLibraryProcess, args=None)
            db.connections.close_all()
            scanThread.start()
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# If the playlist is initialized only rescan the library, else rescan all libraries
def rescanLibraryProcess(libraryId):
    if libraryId is None:
        libraries = Library.objects.all()
        scanned = False
        for library in libraries:
            rescanLibrary(library)
            while not scanned:
                # We call the database to refresh the value in memory.
                scanned = Library.objects.get(id=library.id).playlist.isScanned
                sleep(5)
    else:
        if Library.objects.filter(id=libraryId).count() == 1:
            library = Library.objects.get(id=libraryId)
            rescanLibrary(library)
    refreshAllViews()


def rescanLibrary(library):
    # Check if the library is not used somewhere else
    mp3Files = []
    oggFiles = []
    flacFiles = []
    if library.playlist.isScanned:
        for root, dirs, files in os.walk(library.path):
            for file in files:
                if file.lower().endswith('.mp3'):
                    mp3Files.append(os.path.join(root, file))

                elif file.lower().endswith('.ogg'):
                    oggFiles.append(os.path.join(root, file))

                elif file.lower().endswith('.flac'):
                    flacFiles.append(os.path.join(root, file))
        rescanTracksProcess(mp3Files, flacFiles, oggFiles, library.playlist)


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
        user = request.user
        if checkPermission(["LIBR"], user):
            libraries = Library.objects.all()
            for library in libraries:
                library.playlist.track.all().delete()
                library.playlist.delete()
                library.delete()
            for playlist in Playlist.objects.all():
                playlist.delete()
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


def fileIndexer(mp3Files, flacFiles, oggFiles, convert, coverPath):
    threads = []
    mp3FileReference = FileType.objects.get(name="mp3")
    flacFileReference = FileType.objects.get(name="flac")
    oggFileReference = FileType.objects.get(name="ogg")

    print("Started scanning MP3 file")
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
    tracks = []
    for thread in threads:
        thread.join()
        tracks += thread.tracks
    return tracks


# Create thread for importing the library into db
def importLibrary(mp3Files, flacFiles, oggFiles, coverPath, convert, playlistId):
    albumReference = {}
    tracksInfo = []
    artists = set()
    albums = {}
    albumsTotalTracks = {}
    albumsTotalDisc = {}
    genres = set()

    # Adding default values
    albumReference[""] = Album.objects.get(title=None).id

    tracks = fileIndexer(mp3Files, flacFiles, oggFiles, convert, coverPath)

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


# Scan tracks contained in a library, update metadata of the DB and remove tracks if they don't exists anymore
def rescanTracksProcess(mp3Files, flacFiles, oggFiles, playlist):
    albumReference = {}
    tracksInfo = []
    artists = set()
    albums = {}
    albumsTotalTracks = {}
    albumsTotalDisc = {}
    genres = set()

    # Set all track of the playlist as not scanned
    Track.objects.filter(playlist__id=playlist.id).update(scanned=False)

    # Adding default values
    albumReference[""] = Album.objects.get(title=None).id
    coverPath = "/ManaZeak/static/img/covers/"

    tracks = fileIndexer(mp3Files, flacFiles, oggFiles, True, coverPath)

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

    genresReference = addGenreBulk(genres)
    artistsReference = addArtistBulk(artists)
    albumReference = addAlbumBulk(albums, artistsReference, albumsTotalTracks, albumsTotalDisc)
    refreshPlaylist(tracks, artistsReference, albumReference, genresReference, playlist.id)
    # Delete the tracks that were not present during the rescan
    Track.objects.filter(scanned=False).delete()


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
