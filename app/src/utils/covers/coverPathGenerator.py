## Generate cover path depending of the objects.
class CoverPathGenerator(object):

    @staticmethod
    ## Generate a cover path for an album.
    def generateCoverPathForAlbum(cover):
        if cover is None:
            return None
        return '/static/covers/' + coverName
