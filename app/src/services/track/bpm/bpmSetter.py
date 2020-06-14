from mutagen.flac import FLAC
from mutagen.mp3 import MP3

from app.src.constants.trackFileTypeEnum import TrackFileTypeEnum

## Allows to set a BPM of a track.
class BpmSetter(object):

    @staticmethod
    def setBpmOnTrack(trackLocation, trackType, bpm):
        if TrackFileTypeEnum.FLAC.value == trackType:
            track = FLAC(trackLocation)
            BpmSetter._setBpmOnFlac(track, bpm)
            track.save()
        if TrackFileTypeEnum.MP3.value == trackType:
            track = MP3(trackLocation)
            BpmSetter._setBpmOnMp3(track, bpm)

    @staticmethod
    def _setBpmOnMp3(track, bpm):
        raise NotImplementedError()

    @staticmethod
    def _setBpmOnFlac(track, bpm):
        track['BPM'] = str(bpm)
