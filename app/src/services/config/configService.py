from app.models.settings import Config


## This class allows to get some configuration objects of the database.
from app.src.config.configEnum import ConfigEnum
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


class ConfigService(object):

    @staticmethod
    ## Return the number of tracks returned by the lazy loading.
    def getNumberOfTracksReturnedByLazyLoad():
        if Config.objects.filter(code=ConfigEnum.TRACK_IN_LAZY).count() != 1:
            raise UserException(ErrorEnum.UNEXPECTED_STATE)
        return Config.objects.get(code=ConfigEnum.TRACK_IN_LAZY).value
