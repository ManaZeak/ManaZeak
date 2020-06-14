import logging
import os

from app.models.collections import LibraryScan
from app.src.services.collections.library.librarySatusHelper import LibraryStatusHelper
from app.src.utils.fileDateUtils import FileDateUtils

loggerScan = logging.getLogger('scan')


## This class manages the rescan of the library.
class LibraryRescanHelper(object):

    def __init__(self):
        self.mp3Files = []
        self.flacFiles = []
        self.newFiles = 0
        self.modifiedFiles = 0
        self.libScan = None
        self.fileDateUtils = None

    ## Do the integration of tracks only for the modified one.
    def scanModifiedFiles(self, libraryPath):
        # Initialising the utils for getting the information about the file
        self._initializeFileDateUtil()
        # Adding the new scan to the database.
        self.libScan = LibraryStatusHelper.createLibraryScan()
        # Iterating through the files of the library.
        self._iterateThroughFiles(libraryPath)

    ## Checks all the library files and add them to the rescan if the are modified or created.
    def _iterateThroughFiles(self, libraryPath):
        for root, _, files in os.walk(libraryPath):
            for file in files:
                filePath = os.path.join(root, file)
                if file.lower().endswith('.mp3'):
                    self.addToFileToRescan(self.mp3Files, filePath)
                if file.lower().endswith('.flac'):
                    self.addToFileToRescan(self.flacFiles, filePath)

    ## Adds to the table the file if it's added or created.
    #   @param filesToRescan the array containing the file to rescan.
    #   @param filePath the path of the current file to process.
    def addToFileToRescan(self, filesToRescan, filePath):
        # Checking if the file was modified after the last scan.
        if self.fileDateUtils.isFileModifiedAfterScan(filePath):
            self.modifiedFiles += 1
            filesToRescan.append(filePath)
            return
        # Checking if the file was created after the last scan.
        if self.fileDateUtils.isFileCreatedAfterScan(filePath):
            self.newFiles += 1
            filesToRescan.append(filePath)

    ## Get the last date the scan was executed.
    def _initializeFileDateUtil(self):
        lastScan = LibraryScan.objects.order_by('id').first()
        self.fileDateUtils = FileDateUtils(lastScan.date)
