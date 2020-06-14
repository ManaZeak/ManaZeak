import abc

## The abstract class containing the method for extracting the tags.
from app.src.config.constants import Constants


class AbstractTagExtractor(object, metaclass=abc.ABCMeta):

    ## Extract the title of the track.
    def extractTitle(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the year of the track.
    def extractYear(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track number.
    def extractTrackNumber(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track bpm.
    def extractBpm(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track comment.
    def extractComment(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track lyrics.
    def extractLyrics(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track disc number.
    def extractDiscNumber(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track genre.
    def extractGenre(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track artists.
    def extractArtist(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track composer.
    def extractComposer(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track performer.
    def extractPerformer(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track producer.
    def extractProducer(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track album.
    def extractAlbum(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the album artist.
    def extractAlbumArtist(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the label of the track.
    def extractLabel(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    def extractCountry(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    ## Extract the track cover.
    def extractCover(self, coverPath):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)
