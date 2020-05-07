from enum import Enum, unique


@unique
## This enum describes the different formats of the thumbnails.
class ThumbSizeEnum(Enum):
    ## A tiny thumbnail (80x80). Used on the track preview for example.
    TINY = (100, 100)
    ## A small thumbnail (140x140). Used on the main page for example.
    SMALL = (140, 140)
    ## A normal thumbnail (285x285). Used on the detail sceneviews.
    MEDIUM = (300, 300)
    ## A large thumbnail (400x400). Used on the detail sceneviews.
    LARGE = (425, 425)
