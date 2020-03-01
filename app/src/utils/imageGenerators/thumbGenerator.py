import logging
from pathlib import Path

from PIL import Image


logger = logging.getLogger('scan')


## This class generates a thumbnail for an image.
class ThumbGenerator(object):

    @staticmethod
    ## Generates a thumbnail (300x300px by default) of the specified album cover.
    #  If the image isn't square, that's your problem.
    #  If the image is already smaller than the specified size, nothing is done and the event is logged.
    #   @param cover: path to an album cover image
    #   @param newSize: desired size of the thumbnail, defaults to (300, 300)
    def generateThumb(coverPath, thumbPath, newSize=(300, 300)):
        img = Image.open(coverPath)
        if img.size[0] * img.size[1] < newSize[0] * newSize[1]:
            logger.warning('Thumbnail generation failure: image too small. Image size: ' +
                           str(img.size) + " | thumbnail size: " + str(newSize))
        else:
            try:
                img.resize(newSize, Image.ANTIALIAS).save(thumbPath)
            except Exception:
                logger.info('The cover at ' + coverPath + ' can''t be saved.')
