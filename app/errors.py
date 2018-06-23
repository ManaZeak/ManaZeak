import logging
from enum import Enum, unique


# Enum containing al the possible errors
@unique
class ErrorEnum(Enum):
    # Bad json format send to the server
    BAD_FORMAT = 1

    # Bad type of request send to the server
    BAD_REQUEST = 2

    # The db didn't return anything
    DB_ERROR = 3

    # The asked file didn't exist
    FILE_NOT_FOUND = 4

    # The directory asked didn't exist
    DIR_NOT_FOUND = 5

    # The library asked is empty
    EMPTY_LIBRARY = 6

    # The directory for covers cannot be created
    COVER_ERROR = 7

    # The user didn't have enough permission
    PERMISSION_ERROR = 8

    # Error during the rescan
    RESCAN_ERROR = 9

    # No track history for the given user
    NO_HISTORY = 10

    # No same artist for the given track
    NO_SAME_ARTIST = 11

    # No same genre for the given track
    NO_SAME_GENRE = 12

    # No same album for the given track
    NO_SAME_ALBUM = 13

    # Syncthing encountered an error
    SYNCTHING_ERROR = 14

    # Some user tried to delete an admin user
    USER_DELETE_ERROR = 15

    # No stats for the given user
    NO_STATS = 16

    # Bad filename for the upload
    BAD_FILENAME = 17

    # File didn't exists
    FILE_EXISTS = 18

    # Wrong format of input inside the JSON response
    VALUE_ERROR = 19

    # Error during the file uplaod
    DND_ERROR = 20

    # Wrong format of audio file
    FORMAT_ERROR = 21

    # Limit for download has been reached
    DOWNLOAD_LIMIT = 22

    # Cannot create a directory
    DIR_CREATION_ERROR = 23

    # Suspicious operation for a user
    SUSPICIOUS_OPERATION = 24


logger = logging.getLogger('django')


# Deactivate a user after a suspicious operation
def deactivateUser(user):
    user.is_active = False
    user.save()


# Generate the base of any status message
# TODO: mettre caller a None
def errorCheckMessage(isDone, error, caller, user=None):
    errorTitle = ""
    errorMessage = ""

    if error is None:
        errorTitle = "null"
        errorMessage = "null"

    elif error == ErrorEnum.BAD_FORMAT:
        errorTitle = "Wrong format"
        errorMessage = "The server didn't understood what you said."
        if user is not None:
            logger.error("Invalid json send to the function " + caller.__name__ + " by the user " + user.username)
        else:
            logger.error("Invalid request from a unlogged user at " + caller.__name__)

    elif error == ErrorEnum.BAD_REQUEST:
        errorTitle = "Bad request"
        errorMessage = "The server didn't expected this request."
        logger.warning("Invalid request type for the function " + caller.__name__)

    elif error == ErrorEnum.DB_ERROR:
        errorTitle = "Database error"
        errorMessage = "Something went wrong with the database."
        logger.error("A request returned an error in the function " + caller.__name__)

    elif error == ErrorEnum.FILE_NOT_FOUND:
        errorTitle = "No such file"
        errorMessage = "The server didn't find the file you asked."
        logger.error("The file required wasn't found by the function " + caller.__name__)

    elif error == ErrorEnum.DIR_NOT_FOUND:
        errorTitle = "No such directory"
        errorMessage = "The server didn't find the directory you asked."
        logger.warning("The directory the user asked didn't exists called by " + caller.__name__)

    elif error == ErrorEnum.EMPTY_LIBRARY:
        errorTitle = "The library is empty"
        errorMessage = "There is no file to add in the library"
        logger.warning("The directory scanned by the user was empty called by " + caller.__name__)

    elif error == ErrorEnum.COVER_ERROR:
        errorTitle = "Can't create file"
        errorMessage = "The server cannot generate the file for the covers, check the permissions."
        logger.error("The function " + caller.__name__ + " can't create the file for the cover")

    elif error == ErrorEnum.PERMISSION_ERROR:
        errorTitle = "Not permitted"
        errorMessage = "You are not allowed to do this."
        if user is not None:
            logger.warning("The user " + user.username + " tried to do something not allowed")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == ErrorEnum.RESCAN_ERROR:
        errorTitle = "Library isn't ready"
        errorMessage = "Another scan is running in background, be a little more patient"
        logger.error("A rescan was already in progress called by " + caller.__name__)

    elif error == ErrorEnum.NO_HISTORY:
        errorTitle = "Your history is empty"
        errorMessage = "Can't go backward if you never played any song!"
        if user is not None:
            logger.info("The user " + user.username + " has finished his history")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == ErrorEnum.NO_SAME_ARTIST:
        errorTitle = "No results were found"
        errorMessage = "Can't find any track by the same artist"
        logger.info("No same artist for the given track")

    elif error == ErrorEnum.NO_SAME_GENRE:
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same genre"
        logger.info("No same genre for the given track")

    elif error == ErrorEnum.NO_SAME_ALBUM:
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same album"
        logger.info("No same album for the given track")

    elif error == ErrorEnum.SYNCTHING_ERROR:
        errorTitle = "Fail to communicate with syncthing"
        errorMessage = "Check if syncthing is running correctly"
        logger.error("Syncthing couldn't be contacted")

    elif error == ErrorEnum.USER_DELETE_ERROR:
        errorTitle = "Can't delete this user"
        errorMessage = "You can't delete your own account if you are admin"
        if user is not None:
            logger.critical("The user " + user.username + " tried to delete an admin user")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == ErrorEnum.NO_STATS:
        errorTitle = "Can't display stats"
        errorMessage = "Use the application for generating stats"
        logger.info("No stats were found")

    elif error == ErrorEnum.BAD_FILE_NAME:
        errorTitle = "The filename is invalid"
        errorMessage = "Change the filename if you want to upload it"
        logger.error("The filename specified was correct call by " + caller.__name__)

    elif error == ErrorEnum.FILE_EXISTS:
        errorTitle = "File already exists"
        errorMessage = "The file you want to upload exists already"
        if user is not None:
            logger.warning("The user " + user.username + " uploaded a song that already exists")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == ErrorEnum.VALUE_ERROR:
        errorTitle = "Wrong value"
        errorMessage = "The value wasn't expected"
        if user is not None:
            logger.critical("The user " + user.username + " put a wrong type of value in a field. Called at "
                            + caller.__name__)
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == ErrorEnum.DND_ERROR:
        errorTitle = "The drag and drop hasn't been setup"
        errorMessage = "The administrator didn't configured correctly the buffer folder"
        logger.critical("The configuration is not done correctly")

    elif error == ErrorEnum.FORMAT_ERROR:
        errorTitle = "The format provided doesn't have support"
        errorMessage = "We don't supports this extension"
        logger.critical("The format of the given track has no support")

    elif error == ErrorEnum.DOWNLOAD_LIMIT:
        errorTitle = "You maximum download limit reached"
        errorMessage = "Select less tracks and try again"
        logger.error("Too much track selected")

    elif error == ErrorEnum.DIR_CREATION_ERROR:
        errorTitle = "Can't create a folder"
        errorMessage = "The application can't create a folder contact the administrator"
        logger.error("The application can't create a folder for function " + caller.__name__)

    elif error == ErrorEnum.SUSPICIOUS_OPERATION:
        errorTitle = "Your account have been suspended"
        errorMessage = "And you know why!"
        # If the user has an account
        if user is not None:
            logger.critical("The user : " + user.username + " tried to do some weird operation")
            deactivateUser(user)
        else:
            logger.critical("An unauthenticated user tried to do some weird operation.")

    return {
        'DONE': isDone,
        'ERROR_H1': "" + errorTitle + "",
        'ERROR_MSG': "" + errorMessage + "",
    }
