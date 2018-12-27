import multiprocessing
from multiprocessing.pool import Pool

from app.src.services.track.trackExtractorService import TrackExtractorService


## This class is used to integrates the audio file on the file system into the database.
class LibraryIntegrationService(object):

    def __init__(self):
        self.trackExtractorService = TrackExtractorService()

    ## Integrates into the database the indexed tracks for the given library.
    #   @param library the library linked to the audio files to integrate.
    #   @param mp3Files the mp3 files to add to the library.
    #   @param flacFiles the flac files to add to the library.
    def integrateTracksToLibraryProcess(self, library, mp3Files, flacFiles):
        # Setting up the process pool
        processToLaunch = multiprocessing.cpu_count()
        processPool = Pool(processes=processToLaunch)

        # Launch process to extract the metadata contained in the flac and mp3 files
        extractedTracks = [processPool.map(self.extractMetaDataFromTracks, self._trackTableSplitter(mp3Files)),
                           processPool.map(self.extractMetaDataFromTracks, self._trackTableSplitter(flacFiles))]

        # FIXME : integrates the data into the database

    ## Extract the information contained in the tracks into a object.
    #   @param tracksPath a table containing the tracks path to extract
    #   @return a table a local tracks
    def extractMetaDataFromTracks(self, tracksPath):
        localTracks = []
        if tracksPath.get(0).endswith('mp3'):
            for trackPath in tracksPath:
                localTracks.append(self.trackExtractorService.extractMp3File(trackPath))
        elif tracksPath.get(0).endswith('flac'):
            for trackPath in tracksPath:
                localTracks.append(self.trackExtractorService.extractFlacFile(trackPath))
        return localTracks

    @staticmethod
    ## This function split a table into smaller tables of x element inside a table
    #   @param tracks the table of tracks to split
    #   @return a table of tables
    def _trackTableSplitter(tracks):
        return list(LibraryIntegrationService._chunks(tracks, 200))

    @staticmethod
    ## Yield sub-table of a table of the given length
    #   @param tracks the table to split
    #   @param length the length of the chunks
    #   @return chunks of the table of the length
    def _chunks(tracks, length):
        # For item i in a range that is a length of length,
        for i in range(0, len(tracks), length):
            # Create an index range for l of n items:
            yield tracks[i:i + length]
