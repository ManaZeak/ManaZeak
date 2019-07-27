from enum import Enum, unique


@unique
## The enum containing the different configuration key of the application
class ConfigEnum(Enum):
    ## The number of tracks returned by the lazy loading.
    TRACK_IN_LAZY = 'TRACK_IN_LAZY'
