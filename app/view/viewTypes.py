from enum import unique, Enum


@unique
## The enumeration containing all the possible views.
class ViewEnum(Enum):
    ## The list view.
    LIST = 1
    ## The album view
    ALBUM = 2


def chooseViewMode(viewMode):
    if viewMode == 'LIST':
        return ViewEnum.LIST
    elif viewMode == 'ALBUM':
        return ViewEnum.ALBUM
    else:
        return False
