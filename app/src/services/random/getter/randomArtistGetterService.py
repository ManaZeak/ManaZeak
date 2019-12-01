from django.db.models import Max, Min

from app.models import Artist
from app.models.random import RandomArtistSortedByName
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


class RandomArtistGetterService(object):

    @staticmethod
    def getArtistsSortedByName(numberToGet):
        # Get the minimum and the maximum id for the artist
        minMaxObject = RandomArtistSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Artist.objects.filter(randomartistsortedbyname__hashIndex__in=randomIds)

