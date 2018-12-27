from enum import unique, Enum


@unique
## The enumeration containing all the keys of each possible errors.
class ErrorEnum(Enum):
    ## Bad json format send to the server.
    BAD_FORMAT = 'Bad json format send to the server.'

    ## Bad type of request send to the server.
    BAD_REQUEST = 'Bad request send to the server.'

    ## The db didn't return anything.
    DB_ERROR = 'The database didn\'t return anything.'

    ## The asked file didn't exist.
    FILE_NOT_FOUND = 'The file asked doesn\'t exist.'

    ## The directory asked didn't exist.
    DIR_NOT_FOUND = 'The directory asked doesn\'t exist.'

    ## The library asked is empty.
    EMPTY_LIBRARY = 'The library asked is empty.'

    ## The directory for covers cannot be created.
    COVER_ERROR = 'The covers cannot be created.'

    ## The user didn't have enough permission.
    PERMISSION_ERROR = 'The user doesn\'t have the required permission.'

    ## Error during the rescan.
    SCAN_IN_PROGRESS = 'A scan is already in progress.'

    ## No track history for the given user.
    NO_HISTORY = 'The user has no track history.'

    ## No same artist for the given track.
    NO_SAME_ARTIST = 'No other tracks of the artist has been found in the database.'

    ## No same genre for the given track.
    NO_SAME_GENRE = 'No other tracks of the same genre has been found in the database.'

    ## No same album for the given track.
    NO_SAME_ALBUM = 'No other track of the same album has been found on the server.'

    ## Some user tried to delete an admin user.
    USER_DELETE_ERROR = 'You tried to delete an admin user.'

    ## No stats for the given user.
    NO_STATS = 'No stats for the given user'

    ## Bad filename for the upload.
    BAD_FILENAME = 'The filename isn\'t correct.'

    ## The file didn't exists.
    FILE_EXISTS = 'The file doesn\'t exists.'

    ## Wrong format of input inside the JSON response.
    VALUE_ERROR = 'A unexpected type was found inside the json.'

    ## Error during the file uplaod.
    DND_ERROR = 'Error during the file upload'

    ## Wrong format of audio file.
    FORMAT_ERROR = 'Wrong audio format'

    ## Limit for download has been reached.
    DOWNLOAD_LIMIT = 'The user reached the download limit.'

    ## Cannot create a directory.
    DIR_CREATION_ERROR = 'The directory cannot be created.'

    ## Cannot find the user invite code
    INVITE_CODE_NOT_FOUND = 'The invite code provided doesn\'t exists.'

    ## Cannot find the user settings
    UNKNOWN_USER_SETTINGS = 'The user given has no settings.'

    ## The application is in a unexpected state
    UNEXPECTED_STATE = 'The application is in a unexpected state.'

    ## Suspicious operation for a user.
    SUSPICIOUS_OPERATION = 'The user did a suspicious operation (hacking?)'
