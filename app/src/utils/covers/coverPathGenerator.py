## Generate cover path depending of the objects.
class CoverPathGenerator(object):

    @staticmethod
    ## Generate a cover path for an album.
    def generateCoverPathForAlbum(coverName):
        return '/static/covers/' + coverName
