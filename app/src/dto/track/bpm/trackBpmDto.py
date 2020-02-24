from app.src.dto.abstractDto import AbstractDto

## Contains the information about a track and it's BPM.
class TrackBpmDto(AbstractDto):

    def __init__(self):
        self.artistName = None
        self.bpm = None
        self.trackTitle = None

    def generateJson(self):
        return {
            'TRACK_ARTIST': self.artistName,
            'TRACK_BPM': self.bpm,
            'TRACK_TITLE': self.trackTitle,
        }