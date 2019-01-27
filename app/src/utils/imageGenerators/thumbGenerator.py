import logging

logger = logging.getLogger('scan')


## This class generate a thumbnail of a image.
class ThumbGenerator(object):

    ## Constructor
    def __init__(self):
        self.thumbLocation = '/static/covers/thumbs/'

    # FIXME: to be implemented!
    def generateThumb(self, coverPath, newsize=(300, 300)):
        pass
