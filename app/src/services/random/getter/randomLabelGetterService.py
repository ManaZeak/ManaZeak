from django.db.models import Min, Max

from app.models.random import RandomLabelSortedByName
from app.models.track import Label
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper


class RandomLabelGetterService(object):

    @staticmethod
    # Get a random label.
    def getRandomLabelSortedByNames(numberToGet):
        # Get the minimum and the maximum id for the artist
        minMaxObject = RandomLabelSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Label.objects.filter(randomlabelsortedbyname__hashIndex__in=randomIds)
