from app.models.settings import ApplicationConfiguration


## @package app.utils.adminOptionManager
# Manage the global option of the application


## Get the global options of the application
#   @return the application configuration object
def getApplicationConfiguration():
    if ApplicationConfiguration.objects.all().count() != 1:
        createApplicationConfiguration()
    return ApplicationConfiguration.objects.first()


## This function creates the application configuration in database.
def createApplicationConfiguration():
    appConf = ApplicationConfiguration()
    appConf.save()
