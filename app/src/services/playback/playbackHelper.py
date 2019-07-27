from app.models import Playlist
from app.src.dao.track.randomTrackGetter import RandomTrackGetter
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


class PlaybackHelper(object):

    @staticmethod
    ## Get a random track in a playlist.
    #   @return the id of the track selected.
    def getRandomTrack(playlistId):
        if Playlist.objects.filter(id=playlistId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR)
        return RandomTrackGetter.getRandomTrack(playlistId)[0]
