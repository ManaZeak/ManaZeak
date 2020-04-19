## Helper for some tasks on the library service.
class LibraryServiceHelper(object):

    @staticmethod
    ## Save the report of the library scan into the database.
    def saveScanEnded(newFiles, modifiedFiles, libScan):
        libScan.tracksAdded = newFiles
        libScan.tracksModified = modifiedFiles
        libScan.save()
