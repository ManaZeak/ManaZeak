import logging
import PIL

from PIL import Image


logger = logging.getLogger('scan')


## This class generates a thumbnail for an image.
class ThumbGenerator(object):

    ## Constructor
    def __init__(self):
        self.thumbLocation = '/static/covers/thumbs/'

    ## Generates a thumbnail (300x300px by default) of the specified album cover.
    #  If the image isn't square, that's your problem.
    #  If the image is already smaller than the specified size, nothing is done and the event is logged.
    #   @param cover: path to an album cover image
    #   @param newsize: desired size of the thumbnail, defaults to (300, 300)
    def generateThumb(self, coverPath, newsize=(300, 300)):
        newpath = self.thumbLocation + coverPath.split("/")[-1]
        img = Image.open(coverPath)
        if img.size[0] * img.size[1] < newsize[0] * newsize[1]:
            logger.warn('Thumbnail generation failure: image too small. Image size: ' +
                        str(img.size) + " | thumbnail size: " + str(newsize))
        else:
            img.resize(newsize, PIL.Image.ANTIALIAS).save(newpath)

