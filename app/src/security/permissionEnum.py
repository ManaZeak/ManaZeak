from enum import Enum, unique


@unique
## The enum containing the different permission key of the application
class PermissionEnum(Enum):
    ## Login permission
    LOGIN = 'LOGI'
    ## Play music permission
    PLAY = 'PLAY'
    ## Playlist management (create, alter, delete)
    PLAYLISTS = 'PLST'
    ## Download songs
    DOWNLOAD = 'DOWN'
    ## Wish submit
    WISH = 'WISH'
    ## Tag submission
    TAG_SUBMISSION = 'TAGS'
    ## Upload a track
    UPLOAD_TRACK = 'UPLD'
    ## Can invite new users
    INVITE = 'SPON'
    ## Access to self stats
    SELF_STATS = 'STAT'
    ## Access to children stats
    CHILD_STATS = 'STCH'
    ## Family stat access
    FAMILY_STATS = 'STFA'
    ## Access to library stats
    LIB_STATS = 'STAL'
    ## Access to all stats
    ALL_STATS = 'STAA'
    ## Can review wishes
    WISH_REVIEW = 'WISR'
    ## Change genre or album description
    CHANGE_DESCRIPTION = 'DESC'
    ## Edit tags of tracks
    EDIT_TAGS = 'TAGE'
    ## Can approve uploaded tracks
    UPLOAD_APPROVE = 'UPAP'
    ## Acces to the admin view
    ADMIN_VIEW = 'ADMV'
    ## Can edit the groups
    EDIT_GROUPS = 'GRPE'
    ## Library management
    LIBRARY_MANAGEMENT = 'LIBR'
    ## Grant admin privileges
    GRANT_ADMIN = 'GAPR'
    ## Coin gift
    COIN_GIFT = 'COIN'
