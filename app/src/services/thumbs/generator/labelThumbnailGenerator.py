from app.src.config.constants import Constants
from app.src.services.thumbs.generator.abstractThumbGenerator import AbstractThumbGenerator


## Generates the thumbnails for a label.
class LabelThumbnailGenerator(AbstractThumbGenerator):

    @staticmethod
    def getDirectoryElement():
        return 'label/'

    def _getSubDirectoryPathSource(self):
        return '/' + Constants.LABELS_COVER_LOCATION
