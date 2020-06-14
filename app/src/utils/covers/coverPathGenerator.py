from os import path

from app.src.config.constants import Constants


## Generate cover path depending of the objects.
class CoverPathGenerator(object):

    @staticmethod
    ## Generate a cover path for an album.
    def generateCoverPathForAlbum(cover):
        if cover is None:
            return None
        return CoverPathGenerator.getCoverPathAlbum(cover.location)

    @staticmethod
    ## Generate a cover path for an album with only the cover name in string.
    def getCoverPathAlbum(coverName):
        return Constants.ALBUM_COVER_LOCATION + coverName

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
    def generateArtistPicturePath(name):
        imagePath = Constants.ARTIST_PICTURE_LOCATION + CoverPathGenerator.sanitizeName(name) + Constants.JPG
        return CoverPathGenerator.checkCoverExists(imagePath)

    @staticmethod
    def generateLabelPicturePath(name):
        imagePath = Constants.LABELS_COVER_LOCATION + CoverPathGenerator.sanitizeName(name) + Constants.JPG
        return CoverPathGenerator.checkCoverExists(imagePath)

    @staticmethod
    def generateCountryPicturePath(name):
        imagePath = Constants.COUNTRY_COVER_LOCATION + name + Constants.SVG
        return CoverPathGenerator.checkCoverExists(imagePath)

    ## Generate the path of the artist picture and checks if it exists.
    #   @return the path if it exists.
    @staticmethod
    def generateGenrePicturePath(name):
        imagePath = Constants.GENRE_COVER_LOCATION + CoverPathGenerator.sanitizeName(name) + Constants.JPG
        return CoverPathGenerator.checkCoverExists(imagePath)
