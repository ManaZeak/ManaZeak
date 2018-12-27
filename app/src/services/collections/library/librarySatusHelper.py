from app.models.collections import LibraryScanStatus
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException

## Handles the operations linked to the status of the libraries during the rescan
class LibraryStatusHelper(object):

    @staticmethod
    ## Set the status of the library to being scanned for avoiding colliding with others functions.
    def startLibraryScan(library):
        LibraryStatusHelper.scanNotInProgress(library)
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(library)
        scanStatus.isScanned = False
        scanStatus.save()

    @staticmethod
    ## Set the status of the library to available.
    def endLibraryScan(library):
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(library)
        if scanStatus.isScanned:
            raise UserException(ErrorEnum.UNEXPECTED_STATE)
        scanStatus.isScanned = True
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
        libScanStatus.totalTracks = library.playlist.totalTracks
        libScanStatus.processedTrack = library.playlist.totalTracks
        libScanStatus.isScanned = True
        libScanStatus.library = library
        libScanStatus.save()
        return libScanStatus
