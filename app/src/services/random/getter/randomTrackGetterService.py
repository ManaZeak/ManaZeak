from django.db.models import Min, Max

from app.models import RandomGenreSortedByName, Genre
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


class RandomTrackGetterService(object):

    @staticmethod
    ## Get a random track from the table sorted by name
    def getRandomTrackSortedByName(numberToGet):
        # Get the minimum and the maximum id for the track
        minMaxObject = RandomGenreSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Genre.objects.filter(randomgenresortedbyname__hashIndex__in=randomIds)
