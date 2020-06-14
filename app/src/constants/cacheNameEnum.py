from enum import unique, Enum


@unique
## This enum represents the base name of the cache
class CacheNameEnum(Enum):
    ## The name for the cache of the single artist object.
    SINGLE_ARTIST = 'SG_ART_'
    ## The name for the cache of all the release artists object.
    ALL_RELEASE_ARTISTS = 'ALL_RL_ART'
    ## The name for the cache of all the artists object.
    ALL_ARTISTS = 'ALL_ART'
