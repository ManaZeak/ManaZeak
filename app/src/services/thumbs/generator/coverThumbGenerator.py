from app.src.config.constants import Constants
from app.src.services.thumbs.generator.abstractThumbGenerator import AbstractThumbGenerator


## Generates the thumbnails for the tracks.
class CoverThumbGenerator(AbstractThumbGenerator):

    @staticmethod
    def getDirectoryElement():
        return 'cover/'

    def _getSubDirectoryPathSource(self):
        return '/' + Constants.ALBUM_COVER_LOCATION
