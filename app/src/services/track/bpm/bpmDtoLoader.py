from app.models import Track
from app.src.dto.track.bpm.trackBpmDto import TrackBpmDto


## Allows to get a BpmDto from the database from a track id.
class BpmDtoLoader(object):

    @staticmethod
    def loadDtoFromTrackId(trackId):
        track = Track.objects.get(id=trackId)
        bpmDto = TrackBpmDto()
        bpmDto.trackTitle = track.title
        bpmDto.artistName = track.album.releaseArtist.name
        bpmDto.bpm = track.bpm
        return bpmDto

