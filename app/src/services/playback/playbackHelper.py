from builtins import staticmethod

from app.models import Playlist, Track, AlbumShuffle
from app.src.dao.track.randomTrackGetter import RandomTrackGetter
from app.src.dao.track.shuffleFirstAlbumTrackGetter import ShuffleFirstAlbumTrackGetter
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


class PlaybackHelper(object):

    @staticmethod
    ## Get a random track in a playlist.
    #   @return the id of the track selected.
    def getRandomTrack(playlistId, user):
        if Playlist.objects.filter(id=playlistId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR, user)
        return RandomTrackGetter.getRandomTrack(playlistId)[0]

    @staticmethod
    ## Get a shuffled first album track.
    #   @return the id of the track selected.
    def getShuffledFirstAlbumTrack(playlistId, user):
        if Playlist.objects.filter(id=playlistId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR, user)
        return ShuffleFirstAlbumTrackGetter.getShuffledFirstAlbumTrack(playlistId)[0]

    @staticmethod
    ## Add a track to the album shuffle history.
    def addTrackToAlbumShuffle(playlistId, trackId, user):
        playlist = Playlist.objects.get(id=playlistId)
        track = Track.objects.get(id=trackId)
        albumShuffle = AlbumShuffle()
        albumShuffle.userId = user
        albumShuffle.trackId = track
        albumShuffle.playlistId = playlist
        albumShuffle.save()

    @staticmethod
    def checkIfAlbumShuffleIsFinished(playlistId, user):
        playlist = Playlist.objects.get(id=playlistId)
        trackInPlaylist = Track.objects.filter(playlist=playlist, trackNumber=1)
        trackInAlbumShuffle = AlbumShuffle.objects.filter(playlistId=playlist, userId=user)
        # If all the first track are in the shuffle, reset the shuffle.
        if trackInPlaylist == trackInAlbumShuffle:
            AlbumShuffle.objects.filter(playlistId=playlist, userId=user).delete()
