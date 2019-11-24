from os import path

from app.src.config.constants import Constants


## Generate cover path depending of the objects.
class CoverPathGenerator(object):

    @staticmethod
    ## Generate a cover path for an album.
    def generateCoverPathForAlbum(cover):
        if cover is None:
            return None
        return 'static/covers/' + cover.location

    @staticmethod
    ## Replace all the forbidden chars with -.
    def sanitizeName(name):
        for ch in Constants.FORBIDDEN_CHARS:
            if ch in name:
                name = name.replace(ch, "-")
        return name

    @staticmethod
    ## Check if a cover exists, if not return none.
    def checkCoverExists(coverPath):
        if path.exists('/' + coverPath):
            return coverPath
        return None


    @staticmethod
    ## Generate the path of the artist picture and checks if it exists.
    #   @return the path if it exists.
    def generatePicturePath(name):
        imagePath = Constants.ARTIST_PICTURE_LOCATION + CoverPathGenerator.sanitizeName(name) + '.jpg'
        if not path.exists('/' + imagePath):
            return None
        return imagePath
