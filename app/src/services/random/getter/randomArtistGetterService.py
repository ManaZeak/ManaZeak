from django.db.models import Max, Min

from app.models import Artist
from app.models.random import RandomReleaseArtistSortedByName, RandomArtistSortedByName
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


## Getter for random artist in the different random tables.
class RandomArtistGetterService(object):

    @staticmethod
    ## Get a number of release artist from the table sorted by names.
    def getReleaseArtistsSortedByName(numberToGet):
        # Get the minimum and the maximum id for the artist
        minMaxObject = RandomReleaseArtistSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Artist.objects.filter(randomreleaseartistsortedbyname__hashIndex__in=randomIds)

    @staticmethod
    ## Get random artists from the table sorted by names.
    def getArtistsSortedByName(numberToGet):
        minMaxObject = RandomArtistSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Artist.objects.filter(randomartistsortedbyname__hashIndex__in=randomIds)
