from app.models import Playlist, Track
from app.models.settings import PlaylistOrder


## This class permit to externalize some process of playlistService
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


class PlayListHelper(object):

    @staticmethod
    ## Fill the given table with playlist infos
    #   @param playlists the table contains playlists
    def getPlaylistsInformation(playlists, playlistsInfo):
        for playlist in playlists:
            playlistsInfo.append(PlayListHelper.getPlaylistInformation(playlist))

    @staticmethod
    ## This class send the order of the playlist set by the user
    #   @param user the user asking for his playlist
    #   @return the playlists ordered in a array by the position
    def getOrderedPlaylist(user):
        playlists = []
        # Getting the information about the order of the playlist
        playlistOrders = PlaylistOrder.objects.filter(user=user).order_by('position')
        for playlistOrder in playlistOrders:
            playlists.append(playlistOrder.playlist)
        return playlists

    @staticmethod
    ## This method return all the information about a playlist in a dict
    #   @param playlist a playlist
    #   @return a dict with the information about the playlist
    def getPlaylistInformation(playlist):
        totalTracks = Track.objects.filter(playlist=playlist).count()
        return {
            'ID': playlist.id,
            'NAME': playlist.name,
            'DESCRIPTION': playlist.description,
            'IS_PUBLIC': playlist.isPublic,
            'IS_LIBRARY': playlist.isLibrary,
            'TOTAL_TRACK': totalTracks,
            'TOTAL_DURATION': playlist.listeningTime,
            # 'AVERAGE_BITRATE': playlist.averageBitRate,
            'OWNER': playlist.owner.username,
        }

    @staticmethod
    ## Creates an empty playlist
    def createPlaylist(owner, name, isLibrary, isPublic, description=None):
        playlist = Playlist()
        playlist.owner = owner
        playlist.isLibrary = isLibrary
        playlist.name = name
        playlist.isPublic = isPublic
        playlist.description = description
        playlist.totalTracks = 0
        playlist.listeningTime = 0
        playlist.averageBitRate = 0
        playlist.save()
        return playlist

    @staticmethod
    ## Delete a playlist and the linked objects.
    #   @param playlist
    def deletePlaylist(playlist):
        # If the playlist isn't present do nothing
        if playlist is None:
            return
        # Deleting the linked tracks
        playlist.tracks.all().delete()
        # Deleting all the user order linked to this playlist
        PlaylistOrder.objects.filter(playlist=playlist).delete()
        # Deleting the playlist
        playlist.delete()

    @staticmethod
    ## Check if a playlist exist in the database and returns it.
    #   @playlistId the playlist id.
    def getPlaylistFromId(playlistId):
        if Playlist.objects.filter(id=playlistId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR)
        return Playlist.objects.get(id=playlistId)
