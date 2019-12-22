from django.db.models import Min, Max

from app.models import RandomGenreSortedByName, Genre
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


class RandomGenreGetterService(object):

    @staticmethod
    ## Get a number of random genre from the table sorted genre by name.
    def getRandomGenreSortedByName(numberToGet):
        # Get the minimum and the maximum id for the artist
        minMaxObject = RandomGenreSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Genre.objects.filter(randomgenresortedbyname__hashIndex__in=randomIds)
