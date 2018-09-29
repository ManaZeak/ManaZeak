import logging
from enum import Enum, unique


@unique
## The enumeration containing all the information about the errors.
class ErrorEnum(Enum):
    ## Bad json format send to the server.
    BAD_FORMAT = 1

    ## Bad type of request send to the server.
    BAD_REQUEST = 2

    ## The db didn't return anything.
    DB_ERROR = 3

    ## The asked file didn't exist.
    FILE_NOT_FOUND = 4

    ## The directory asked didn't exist.
    DIR_NOT_FOUND = 5

    ## The library asked is empty.
    EMPTY_LIBRARY = 6

    ## The directory for covers cannot be created.
    COVER_ERROR = 7

    ## The user didn't have enough permission.
    PERMISSION_ERROR = 8

    ## Error during the rescan.
    RESCAN_ERROR = 9

    ## No track history for the given user.
    NO_HISTORY = 10

    ## No same artist for the given track.
    NO_SAME_ARTIST = 11

    ## No same genre for the given track.
    NO_SAME_GENRE = 12

    ## No same album for the given track.
    NO_SAME_ALBUM = 13

    ## Syncthing encountered an error.
    SYNCTHING_ERROR = 14

    ## Some user tried to delete an admin user.
    USER_DELETE_ERROR = 15

    ## No stats for the given user.
    NO_STATS = 16

    ## Bad filename for the upload.
    BAD_FILENAME = 17

    ## The file didn't exists.
    FILE_EXISTS = 18

    ## Wrong format of input inside the JSON response.
    VALUE_ERROR = 19

    ## Error during the file uplaod.
    DND_ERROR = 20

    ## Wrong format of audio file.
    FORMAT_ERROR = 21

    ## Limit for download has been reached.
    DOWNLOAD_LIMIT = 22

    ## Cannot create a directory.
    DIR_CREATION_ERROR = 23

    ## Suspicious operation for a user.
    SUSPICIOUS_OPERATION = 24


logger = logging.getLogger('django')


## Deactivate a user after a suspicious operation.
#   @param user the user that must be suspended.
def deactivateUser(user):
    user.is_active = False
    user.save()


## Creates a JSON response with the status of the task, also log the errors to a file.
#   @param isDone if the operation was successful.
#   @param error the type of error (contained in the enum).
#   @param caller the function calling the function.
#   @param user the user logged in.
#   @return A JSON containing:
#       - the status of the operation (DONE)
#       - the key of the error (can be none) (ERROR_KEY)
def \
        errorCheckMessage(isDone, error, caller, user=None):
    if error is None:
        errorKey = None
    else:
        errorKey = error.name

        if error == ErrorEnum.BAD_FORMAT:
            if user is not None:
                logger.error("Invalid json send to the function " + caller.__name__ + " by the user " + user.username)
            else:
                logger.error("Invalid request from a unlogged user at " + caller.__name__)

        elif error == ErrorEnum.BAD_REQUEST:
            logger.warning("Invalid request type for the function " + caller.__name__)

        elif error == ErrorEnum.DB_ERROR:
            logger.error("A request returned an error in the function " + caller.__name__)

        elif error == ErrorEnum.FILE_NOT_FOUND:
            logger.error("The file required wasn't found by the function " + caller.__name__)

        elif error == ErrorEnum.DIR_NOT_FOUND:
            logger.warning("The directory the user asked didn't exists called by " + caller.__name__)

        elif error == ErrorEnum.EMPTY_LIBRARY:
            logger.warning("The directory scanned by the user was empty called by " + caller.__name__)

        elif error == ErrorEnum.COVER_ERROR:
            logger.error("The function " + caller.__name__ + " can't create the file for the cover")

        elif error == ErrorEnum.PERMISSION_ERROR:
            if user is not None:
                logger.warning("The user " + user.username + " tried to do something not allowed")
            else:
                logger.error("The user parameter is missing for function " + caller.__name__)

        elif error == ErrorEnum.RESCAN_ERROR:
            logger.error("A rescan was already in progress called by " + caller.__name__)

        elif error == ErrorEnum.NO_HISTORY:
            if user is not None:
                logger.info("The user " + user.username + " has finished his history")
            else:
                logger.error("The user parameter is missing for function " + caller.__name__)

        elif error == ErrorEnum.NO_SAME_ARTIST:
            logger.info("No same artist for the given track")

        elif error == ErrorEnum.NO_SAME_GENRE:
            logger.info("No same genre for the given track")

        elif error == ErrorEnum.NO_SAME_ALBUM:
            logger.info("No same album for the given track")

        elif error == ErrorEnum.SYNCTHING_ERROR:
            logger.error("Syncthing couldn't be contacted")

        elif error == ErrorEnum.USER_DELETE_ERROR:
            if user is not None:
                logger.critical("The user " + user.username + " tried to delete an admin user")
            else:
                logger.error("The user parameter is missing for function " + caller.__name__)

        elif error == ErrorEnum.NO_STATS:
            logger.info("No stats were found")

        elif error == ErrorEnum.BAD_FILE_NAME:
            logger.error("The filename specified was correct call by " + caller.__name__)

        elif error == ErrorEnum.FILE_EXISTS:
            if user is not None:
                logger.warning("The user " + user.username + " uploaded a song that already exists")
            else:
                logger.error("The user parameter is missing for function " + caller.__name__)

        elif error == ErrorEnum.VALUE_ERROR:
            if user is not None:
                logger.critical("The user " + user.username + " put a wrong type of value in a field. Called at "
                                + caller.__name__)
            else:
                logger.error("The user parameter is missing for function " + caller.__name__)

        elif error == ErrorEnum.DND_ERROR:
            logger.critical("The configuration is not done correctly")

        elif error == ErrorEnum.FORMAT_ERROR:
            logger.critical("The format of the given track has no support")

        elif error == ErrorEnum.DOWNLOAD_LIMIT:
            logger.error("Too much track selected")

        elif error == ErrorEnum.DIR_CREATION_ERROR:
            logger.error("The application can't create a folder for function " + caller.__name__)

        elif error == ErrorEnum.SUSPICIOUS_OPERATION:
            # If the user has an account
            if user is not None:
                logger.critical("The user : " + user.username + " tried to do some weird operation")
                deactivateUser(user)
            else:
                logger.critical("An unauthenticated user tried to do some weird operation.")

    return {
        'DONE': isDone,
        'ERROR_KEY': errorKey,
    }
