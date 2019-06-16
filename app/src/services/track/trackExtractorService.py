import logging

from mutagen.flac import FLAC
from mutagen.mp3 import MP3, BitrateMode

from app.src.constants.trackFileTypeEnum import TrackFileTypeEnum
from app.src.dto.track.localTrack import LocalTrack
from app.src.services.track.trackExtractorHelper import TrackExtractorHelper
from app.src.utils.tagExtractor.flacTagExtractor import FlacTagExtractor
from app.src.utils.tagExtractor.mp3TagExtractor import Mp3TagExtractor

loggerScan = logging.getLogger('scan')


## This class allows to extract the metadata contained in a file and put it in a local track.
class TrackExtractorService(object):

    def __init__(self):
        self.coverPath = "static/covers/"

    ## Extract the track into the database.
    #   @param fileType the type of file extracted.
    #   @param filePath the path of the file.
    #   @return a track object containing all the metadata.
    def extractTrack(self, fileType, filePath):
        track = LocalTrack()
        # Selecting the extractor type for the file type.
        if fileType == TrackFileTypeEnum.FLAC:
            audioTag = self._getFlacTag(filePath, track)
            trackExtractor = FlacTagExtractor(track, audioTag)
        elif fileType == TrackFileTypeEnum.MP3:
            audioTag = self._getMp3TagAndSpecificFileInfo(filePath, track)
            trackExtractor = Mp3TagExtractor(track, audioTag)
        else:
            raise NotImplementedError('The file' + fileType + 'type has no support in ManaZeak.')

        # Getting the basic information about the track
        TrackExtractorHelper.getBaseInfo(track, audioTag, filePath)
        # Getting the information contained in the tags.
        trackExtractor.extractTitle()
        trackExtractor.extractYear()
        trackExtractor.extractTrackNumber()
        trackExtractor.extractBpm()
        trackExtractor.extractComment()
        trackExtractor.extractLyrics()
        trackExtractor.extractDiscNumber()
        trackExtractor.extractGenre()
        trackExtractor.extractArtist()
        trackExtractor.extractComposer()
        trackExtractor.extractPerformer()
        trackExtractor.extractProducer()
        trackExtractor.extractAlbum()
        trackExtractor.extractAlbumArtist()
        trackExtractor.extractCover(self.coverPath)

        return track

    @staticmethod
    ## Get the specific information about a mp3 file and create the tag reader for the track.
    #   @param filePath the file location on the filesystem.
    #   @param track the track object containing the extracted tags.
    #   @return the interface for reading the tag of the file.
    def _getMp3TagAndSpecificFileInfo(filePath, track):
        audioFile = MP3(filePath)
        track.fileType = TrackFileTypeEnum.MP3.value
        if audioFile.info.bitrate_mode == BitrateMode.UNKNOWN:
            track.bitRateMode = 0
        elif audioFile.info.bitrate_mode == BitrateMode.CBR:
            track.bitRateMode = 1
        elif audioFile.info.bitrate_mode == BitrateMode.VBR:
            track.bitRateMode = 2
        else:
            track.bitRateMode = 3
        return MP3(filePath)

    @staticmethod
    ## Get the tag reader for a flac file.
    #   @param filePath the file path of the track.
    #   @return the interface for reading the tag of the file.
    def _getFlacTag(filePath, track):
        track.fileType = TrackFileTypeEnum.FLAC.value
        return FLAC(filePath)
