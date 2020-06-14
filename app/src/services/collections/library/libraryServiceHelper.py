from django.core.cache import cache


## Helper for some tasks on the library service.
class LibraryServiceHelper(object):

    @staticmethod
    ## Save the report of the library scan into the database.
    def saveScanEnded(newFiles, modifiedFiles, libScan):
        libScan.tracksAdded = newFiles
        libScan.tracksModified = modifiedFiles
        libScan.save()
        # Cleaning all the caches, since the library has been scanned.
        cache.clear()
