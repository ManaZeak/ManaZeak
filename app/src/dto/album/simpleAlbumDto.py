## A simplified album object.
class SimpleAlbumDto(object):

    def __init__(self):
        self.id = None
        self.title = ''
        self.year = None
        self.cover = ''
        self.numberOfTracks = None
        self.duration = None

    def getJsonObject(self):
        return {
            'ID': self.id,
            'TITLE': self.title,
            'YEAR': self.year,
            'COVER': self.cover,
            'NUMBER_OF_TRACKS': self.numberOfTracks,
            'DURATION': self.duration,
        }
