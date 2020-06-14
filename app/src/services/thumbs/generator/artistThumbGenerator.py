from app.src.config.constants import Constants
from app.src.services.thumbs.generator.abstractThumbGenerator import AbstractThumbGenerator


## Generate the thumbnails for the artists.
class ArtistThumbGenerator(AbstractThumbGenerator):

    @staticmethod
    def getDirectoryElement():
        return 'artist/'

    def _getSubDirectoryPathSource(self):
        return '/' + Constants.ARTIST_PICTURE_LOCATION
