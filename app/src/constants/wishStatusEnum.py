from enum import unique, Enum

@unique
## This enum represents the status of wishes in the database.
class WishStatusEnum(Enum):
    ## The id of the submitted status
    SUBMITTED = 1
    ## The id of the accepted status
    ACCEPTED = 2
    ## The id of the refused status
    REFUSED = 3
