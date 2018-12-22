from app.models.settings import ApplicationConfiguration

from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.unexpectedStateException import UnexpectedStateException


## @package app.utils.adminOptionManager
# Manage the global option of the application
class ApplicationConfigurationManager(object):

    @staticmethod
    ## Get the global options of the application
    #   @return the application configuration object
    def getApplicationConfiguration():
        if ApplicationConfiguration.objects.all().count() != 1:
            raise UnexpectedStateException()
        return ApplicationConfiguration.objects.first()
