from enum import unique, Enum

@unique
## This enum represents the types of the track in the database.
class TrackFileTypeEnum(Enum):
    # The id of the MP3
    MP3 = 1
    # The id of the flac
    FLAC = 2
