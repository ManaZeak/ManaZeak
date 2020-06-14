import logging

from app.models import Artist
from app.src.config.constants import Constants
from app.src.services.thumbs.abstractThumbnailService import AbstractThumbnailService
from app.src.services.thumbs.generator.artistThumbGenerator import ArtistThumbGenerator
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator
from app.src.utils.imageGenerators.thumbSizeEnum import ThumbSizeEnum

loggerScan = logging.getLogger('scan')


## Handles the generation of the thumbnails of the artists.
class ArtistThumbnailService(AbstractThumbnailService):

    ## Deleting and recreating all the artist thumbnails. Uses the artists present in the database.
    def regenerateThumbnailsForAllDbArtists(self):
        self.deleteThumbnailsFolder()
        loggerScan.info('Starting the thumbnail generation for the artists.')
        # Getting all the artists of the database.
        artists = Artist.objects.all()
        # Creating the generators.
        smallThumbnailGenerator = ArtistThumbGenerator(ThumbSizeEnum.SMALL)
        mediumThumbnailGenerator = ArtistThumbGenerator(ThumbSizeEnum.MEDIUM)
        # Generating all the thumbnails.
        for artist in artists:
            smallThumbnailGenerator.generateThumbnail(artist.name)
            mediumThumbnailGenerator.generateThumbnail(artist.name)
        loggerScan.info('The thumbnail generation of the artist is finished.')

    @staticmethod
    ## Get the thumbnail of the artist.
    def getThumbnailForArtist(artistName, thumbSize):
        return CoverPathGenerator.checkCoverExists(
            Constants.ROOT_THUMB_LOCATION + ArtistThumbGenerator.getDirectoryElement() + thumbSize.name + '/' +
            artistName + Constants.JPG)

    def getDirectoryElement(self):
        return ArtistThumbGenerator.getDirectoryElement()

    def getElementName(self):
        return 'artists'
