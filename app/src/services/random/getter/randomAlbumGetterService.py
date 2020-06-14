from django.db.models import Min, Max

from app.models import RandomAlbumSortedByArtist, Album
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


## This class selects a number of random albums in the database.
class RandomAlbumGetterService(object):

    @staticmethod
    # Get a number of albums from the random table.
    def getAlbumsSortedByArtist(numberToGet):
        # Get the minimum and the maximum id for the artist
        minMaxObject = RandomAlbumSortedByArtist.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Album.objects.filter(randomalbumsortedbyartist__hashIndex__in=randomIds)
