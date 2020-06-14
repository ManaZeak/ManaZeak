from django.db.models import Min, Max

from app.models.random import RandomCountrySortedByName
from app.models.track import Country
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


class RandomCountryGetterService(object):

    @staticmethod
    ## Get a number of random genre from the table sorted genre by name.
    def getRandomCountrySortedByName(numberToGet):
        # Get the minimum and the maximum id for the artist
        minMaxObject = RandomCountrySortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Country.objects.filter(randomcountrysortedbyname__hashIndex__in=randomIds)
