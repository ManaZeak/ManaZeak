from app.models.collections import LibraryScanStatus
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


## Handles the operations linked to the status of the libraries during the rescan
class LibraryStatusHelper(object):

    ## Constructor
    def __init__(self, library):
        ## The library associated to this helper
        self.library = library

    ## Initialise the scan status before updating it live when rescanning/scanning
    #   @param totalFiles the number of files to extract.
    #   @param library the library to be rescanned.
    def initScanStatus(self, totalFiles):
        scanStatus = self.getLibraryScanStatus(self.library)
        scanStatus.totalTracks = totalFiles
        scanStatus.save()

    ## Set the status of the library to available.
    def endLibraryScan(self):
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(self.library)
        if scanStatus.isScanned:
            raise UserException(ErrorEnum.UNEXPECTED_STATE, None)
        scanStatus.isScanned = True
        scanStatus.save()

    ## Update the number of processed track for the playlist of the helper.
    #   @param trackExtracted the number of track processed to add.
    def updateCounter(self, trackExtracted):
        # Getting the scan status object
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(self.library)
        # Adding processed tracks
        scanStatus.processedTrack += trackExtracted
        scanStatus.save()

    @staticmethod
    ## Set the status of the library rescan to false.
    def abortLibraryScan(library):
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(library)
        scanStatus.isScanned = True
        scanStatus.save()

    @staticmethod
    ## Set the status of the library to being scanned for avoiding colliding with others functions.
    def startLibraryScan(library):
        LibraryStatusHelper.scanNotInProgress(library)
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(library)
        scanStatus.isScanned = False
        scanStatus.save()

    @staticmethod
    ## Check if a scan is in progress, throw an exception if it's already in progress.
    def scanNotInProgress(library):
        isScanned = LibraryStatusHelper.getLibraryScanStatus(library).isScanned
        if not isScanned:
            raise UserException(ErrorEnum.SCAN_IN_PROGRESS)

    @staticmethod
    ## Get the scan status of the library
    def getLibraryScanStatus(library):
        # Case when the status hasn't been created
        if LibraryScanStatus.objects.filter(library=library).count() == 0:
            return LibraryStatusHelper._createLibraryScanStatus(library)
        # return the status
        return LibraryScanStatus.objects.get(library=library)

    @staticmethod
    ## Creates and save and library scan status object.
    def _createLibraryScanStatus(library):
        libScanStatus = LibraryScanStatus()
        libScanStatus.totalTracks = 0
        libScanStatus.processedTrack = 0
        libScanStatus.isScanned = True
        libScanStatus.library = library
        libScanStatus.save()
        return libScanStatus
