import logging

from app.models.track import Label
from app.src.config.constants import Constants
from app.src.services.thumbs.abstractThumbnailService import AbstractThumbnailService
from app.src.services.thumbs.generator.labelThumbnailGenerator import LabelThumbnailGenerator
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator
from app.src.utils.imageGenerators.thumbSizeEnum import ThumbSizeEnum

loggerScan = logging.getLogger('scan')

## Handles the generation of the thumbnail of the labels.
class LabelThumbnailService(AbstractThumbnailService):

    ## Deletes the thumbnails of the labels and generates it again.
    def regenerateThumbnailForAllDbLabels(self):
        loggerScan.info('Starting the thumbnail generation for the labels.')
        # Delete the label thumb folder
        self.deleteThumbnailsFolder()
        # Getting all the labels in the database.
        labels = Label.objects.all()
        # Creating the thumbnail generator
        smallThumbnailGenerator = LabelThumbnailGenerator(ThumbSizeEnum.SMALL)
        mediumThumbnailGenerator = LabelThumbnailGenerator(ThumbSizeEnum.MEDIUM)
        # Generating the thumbnails
        for label in labels:
            smallThumbnailGenerator.generateThumbnail(label.name)
            mediumThumbnailGenerator.generateThumbnail(label.name)
        loggerScan.info('The thumbnail generation of the labels is finished.')

    @staticmethod
    ## Get the thumbnail for the label.
    def getThumbnailForLabel(labelName, thumbSize):
        return CoverPathGenerator.checkCoverExists(
            Constants.ROOT_THUMB_LOCATION + LabelThumbnailGenerator.getDirectoryElement() + thumbSize.name + '/' +
            labelName + Constants.JPG
        )

    def getDirectoryElement(self):
        return LabelThumbnailGenerator.getDirectoryElement()

    def getElementName(self):
        return 'labels'
