import logging
import multiprocessing
from multiprocessing import Process
from multiprocessing.pool import Pool

from django import db

from app.src.constants.trackFileTypeEnum import TrackFileTypeEnum
from app.src.services.collections.library.librarySatusHelper import LibraryStatusHelper
from app.src.dto.track.indexedTrackContainer import IndexedTrackContainer
from app.src.services.collections.library.libraryServiceHelper import LibraryServiceHelper
from app.src.services.random.randomGenerator import RandomGenerator
from app.src.services.thumbs.thumbnailService import ThumbnailService
from app.src.services.track.localTrackImporter import LocalTrackImporter
from app.src.services.track.trackExtractorService import TrackExtractorService
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## This class is used to integrates the audio file on the file system into the database.
class LibraryIntegrationService(object):

    def __init__(self, isInitScan):
        self.trackExtractorService = TrackExtractorService()
        self.statusHelper = None
        self.isInitScan = isInitScan

    @staticmethod
    ## Launch the scan for the selected files in a thread (fork).
    def launchThreadedFileScan(library, mp3Files, flacFiles, newFiles, modifiedFiles, libScan, isInitScan):
        # Creating the integration service for tracks and preparing the process (fork)
        integrationService = LibraryIntegrationService(isInitScan)
        scanThread = Process(
            target=integrationService.integrateTracksToLibraryProcess,
            args=(library, mp3Files, flacFiles, newFiles, modifiedFiles, libScan)
        )
        # Closing all connection to the database for avoiding to use the same connection between processes.
        db.connections.close_all()
        # Launching the process of integrating the track into the database.=
        scanThread.start()

    ## Integrates into the database the indexed tracks for the given library.
    #   @param library the library linked to the audio files to integrate.
    #   @param mp3Files the mp3 files to add to the library.
    #   @param flacFiles the flac files to add to the library.
    #   @param newFiles the number of new files integrated.
    #   @param modifiedFiles the number of files modified.
    def integrateTracksToLibraryProcess(self, library, mp3Files, flacFiles, newFiles, modifiedFiles, libScan):
        # Getting information about the lib
        numberMp3 = len(mp3Files)
        numberFlac = len(flacFiles)
        totalTracks = numberFlac + numberMp3

        loggerScan.info('Starting extracting the metadata for ' + str(numberFlac) +
                        'flac files and ' + str(numberMp3) + 'mp3.')
        loggerScan.info('There is ' + str(totalTracks) + ' to extract')

        # Setting up the scan status
        self.statusHelper = LibraryStatusHelper(library)
        self.statusHelper.initScanStatus(totalTracks)

        # Closing all the connection with the database for avoiding problems with the active transaction
        db.connections.close_all()

        # Setting up the process pool
        processToLaunch = multiprocessing.cpu_count()
        processPool = Pool(processes=processToLaunch)
        loggerScan.info('Preparing ' + str(processToLaunch) + ' processes.')
        # Launch process to extract the metadata contained in the flac and mp3 files
        trackContainers = [processPool.map(self.extractMetaDataFromTracks, self._trackTableSplitter(mp3Files)),
                           processPool.map(self.extractMetaDataFromTracks, self._trackTableSplitter(flacFiles))]

        # Creating the master track container this will contain all the track extracted
        trackContainer = IndexedTrackContainer()
        trackContainer.merge(trackContainers)

        loggerScan.info('Finished the extractions of all the tracks.')
        loggerScan.info('Number of extracted tracks : ' + str(trackContainer.tracksInContainer))

        # Launching the integration into the database
        trackImporter = LocalTrackImporter(trackContainer)
        trackImporter.insertLocalTracks(library.playlist.id)

        # Creating the random tables
        randFiller = RandomGenerator(library.playlist.id)
        randFiller.fillAllRandomTables(self.isInitScan)

        # Starting the process (fork) for generating the thumbnails
        ThumbnailService.startProcessRegenThumbnails()
        loggerScan.info('Starting the process of thumbnail generation.')

        # Finishing the scan
        LibraryServiceHelper.saveScanEnded(newFiles, modifiedFiles, libScan)
        if self.isInitScan:
            self.statusHelper.endLibraryScan()

    ## Extract the information contained in the tracks into a object.
    #   @param tracksPath a table containing the tracks path to extract
    #   @return a table a local tracks
    def extractMetaDataFromTracks(self, tracksPath):
        # Setting up the scan status
        container = IndexedTrackContainer()
        if len(tracksPath) == 0:
            loggerScan.info('No track to extract!')
            return
        if tracksPath[0].endswith('mp3'):
            for trackPath in tracksPath:
                container.addTrack(self.trackExtractorService.extractTrack(TrackFileTypeEnum.MP3, trackPath))
        elif tracksPath[0].endswith('flac'):
            for trackPath in tracksPath:
                container.addTrack(self.trackExtractorService.extractTrack(TrackFileTypeEnum.FLAC, trackPath))
        self.statusHelper.updateCounter(container.tracksInContainer)
        return container

    @staticmethod
    ## This function split a table into smaller tables of x element inside a table
    #   @param tracks the table of tracks to split
    #   @return a table of tables
    def _trackTableSplitter(tracks):
        return list(ListUtils.chunks(tracks, 200))
