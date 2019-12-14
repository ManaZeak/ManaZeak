import logging

from django.db.models import Min, Max

from app.models import RandomTrackSortedByName, Track
from app.models.random import RandomTrackSortedByArtist
from app.src.services.random.getter.randomGetterHelper import RandomGetterHelper

logger = logging.getLogger('django')

class RandomTrackGetterService(object):

    @staticmethod
    ## Get a random track from the table sorted by name
    def getRandomTrackSortedByName(numberToGet):
        # Get the minimum and the maximum id for the track
        minMaxObject = RandomTrackSortedByName.objects.aggregate(Min('hashIndex'), Max('hashIndex'))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        return Track.objects.filter(randomtracksortedbyname__hashIndex__in=randomIds)

    @staticmethod
    ## Get random tracks from the table sorted by artist.
    def getRandomTrackSortedByArtist(numberToGet, artistId):
        # Get the minimum and the maximum id for the track
        minMaxObject = RandomTrackSortedByArtist.objects.filter(track__album__releaseArtist_id=artistId)\
            .order_by('hashIndex')\
            .aggregate(Min('hashIndex'), Max('hashIndex'))
        logger.info(str(minMaxObject['hashIndex__min']) + ' ' + str(minMaxObject['hashIndex__max']))
        randomIds = RandomGetterHelper.getRandomIds(minMaxObject, numberToGet)
        logger.info(str(randomIds))
        return Track.objects.filter(randomtracksortedbyartist__hashIndex__in=randomIds)
