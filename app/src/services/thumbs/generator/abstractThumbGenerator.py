import abc
from os import path
from pathlib import Path

from app.src.config.constants import Constants
from app.src.utils.imageGenerators.thumbGenerator import ThumbGenerator


## This class allows to manage thumbnails.
class AbstractThumbGenerator(object, metaclass=abc.ABCMeta):

    def __init__(self, size):
        self.size = size

    ## Generate a thumbnail for the given type.
    def generateThumbnail(self, entityName):
        coverPath = self._generateSourcePath(entityName)
        # Checking if the path of the directory exists.
        thumbnailDirectory = Path(self._getDirectoryPathThumbnail())
        if not thumbnailDirectory.exists():
            # If the directory wasn't found we create it.
            thumbnailDirectory.mkdir(parents=True, exist_ok=True)
        # Checking if the source picture exists.
        coverFile = Path(coverPath)
        if coverFile.exists():
            # Generating the thumbnail
            ThumbGenerator.generateThumb(coverPath, self._getPathThumbnail(coverPath), self.size.value)

    ## Generate the path of the thumbnail.
    def _getDirectoryPathThumbnail(self):
        return '/' + Constants.ROOT_THUMB_LOCATION + self.getDirectoryElement() + self.size.name + '/'

    ## Generate the complete path of the thumbnail.
    def _getPathThumbnail(self, coverPath):
        return self._getDirectoryPathThumbnail() + path.basename(coverPath)

    ## Generate the source path of the image.
    def _generateSourcePath(self, entityName):
        return self._getSubDirectoryPathSource() + entityName + Constants.JPG

    @staticmethod
    @abc.abstractmethod
    ## Get the directory name of the element that will be processed.
    def getDirectoryElement():
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    @abc.abstractmethod
    ## Get the directory where the source image is stored.
    def _getSubDirectoryPathSource(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)
