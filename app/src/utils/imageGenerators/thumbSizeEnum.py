from enum import Enum, unique


@unique
## This enum describes the different formats of the thumbnails.
class ThumbSizeEnum(Enum):
    ## A tiny thumbnail (80x80). Used on the track preview for example.
    TINY = (80, 80)
    ## A small thumbnail (120x120). Used on the main page for example.
    SMALL = (120, 120)
    ## A normal thumbnail (285x285). Used on the detail views.
    MEDIUM = (285, 285)
    ## A large thumbnail (400x400). Used on the detail views.
    LARGE = (400, 400)
