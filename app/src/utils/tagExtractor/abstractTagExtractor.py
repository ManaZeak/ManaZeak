import abc

## The abstract class containing the method for extracting the tags.
class AbstractTagExtractor(object, metaclass=abc.ABCMeta):

    ## Extract the title of the track.
    def extractTitle(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the year of the track.
    def extractYear(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track number.
    def extractTrackNumber(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track bpm.
    def extractBpm(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track comment.
    def extractComment(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track lyrics.
    def extractLyrics(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track disc number.
    def extractDiscNumber(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track genre.
    def extractGenre(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track artists.
    def extractArtist(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track composer.
    def extractComposer(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track performer.
    def extractPerformer(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track producer.
    def extractProducer(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track album.
    def extractAlbum(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the album artist.
    def extractAlbumArtist(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the label of the track.
    def extractLabel(self):
        raise NotImplementedError('The function needs an override.')

    def extractCountry(self):
        raise NotImplementedError('The function needs an override.')

    ## Extract the track cover.
    def extractCover(self, coverPath):
        raise NotImplementedError('The function needs an override.')
