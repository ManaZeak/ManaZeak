from enum import unique, Enum


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
