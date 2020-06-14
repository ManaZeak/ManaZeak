import abc
import logging
import shutil
from pathlib import Path

from app.src.config.constants import Constants

loggerScan = logging.getLogger('scan')

## Abstract class for the generation of thumbnails.
class AbstractThumbnailService(object, metaclass=abc.ABCMeta):

    ## Delete the thumbnail folder of the element.
    def deleteThumbnailsFolder(self):
        loggerScan.info('Deleting all the previous thumbnails of the' + self.getElementName() + '.')
        # Checking if the path of thumbnails exists.
        pathThumbnail = Path('/' + Constants.ROOT_THUMB_LOCATION + self.getDirectoryElement())
        if pathThumbnail.exists():
            # Deleting all the folder of the artists thumbnails.
            shutil.rmtree(pathThumbnail)

    @abc.abstractmethod
    ## Get the directory name of the element.
    def getDirectoryElement(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    @abc.abstractmethod
    ## Get the name of the element.
    def getElementName(self):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)
