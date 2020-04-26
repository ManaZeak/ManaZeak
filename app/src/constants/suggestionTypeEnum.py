from enum import unique, Enum


@unique
## This enum represents the status of wishes in the database.
class SuggestionTypeEnum(Enum):
    ## The id of the submitted status
    GENERAL = 1
    ## The id of the accepted status
    ARTIST = 2
