import logging

from app.models.track import Cover
from app.src.config.constants import Constants
from app.src.services.thumbs.abstractThumbnailService import AbstractThumbnailService
from app.src.services.thumbs.generator.coverThumbGenerator import CoverThumbGenerator
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator
from app.src.utils.imageGenerators.thumbSizeEnum import ThumbSizeEnum

loggerScan = logging.getLogger('scan')

class CoverThumbnailService(AbstractThumbnailService):

    ## Deletes the thumbnails of the labels and generates it again.
    def regenerateThumbnailForAllDbCovers(self):
        loggerScan.info('Starting the thumbnail generation for the covers.')
        # Delete the label thumb folder
        self.deleteThumbnailsFolder()
        # Getting all the labels in the database.
        covers = Cover.objects.all()
        # Creating the thumbnail generator
        tinyThumbnailGenerator = CoverThumbGenerator(ThumbSizeEnum.TINY)
        smallThumbnailGenerator = CoverThumbGenerator(ThumbSizeEnum.SMALL)
        largeThumbnailGenerator = CoverThumbGenerator(ThumbSizeEnum.LARGE)
        # Generating the thumbnails
        for cover in covers:
            # Getting the first part of the path.
            coverName = cover.location.split('.')[0]
            tinyThumbnailGenerator.generateThumbnail(coverName)
            smallThumbnailGenerator.generateThumbnail(coverName)
            largeThumbnailGenerator.generateThumbnail(coverName)
        loggerScan.info('The thumbnail generation of the covers is finished.')

    @staticmethod
    ## Get the thumbnail for the cover.
    def getThumbnailForCover(coverName, thumbSize):
        # We don't add teh .jpg, it's allready included in the database.
        return CoverPathGenerator.checkCoverExists(
            Constants.ROOT_THUMB_LOCATION + CoverThumbGenerator.getDirectoryElement() + thumbSize.name + '/' +
            coverName
        )

    def getDirectoryElement(self):
        return CoverThumbGenerator.getDirectoryElement()

    def getElementName(self):
        return 'covers'
