from app.models.settings import PlaylistOrder


## This class permit to externalize some process of playlistService
class PlayListHelper(object):

    @staticmethod
    ## This class send the order of the playlist set by the user
    #   @param user the user asking for his playlist
    #   @return the playlists ordered in a array by the rank
    def getOrderedPlaylist(user):
        playlists = []
        # Getting the information about the order of the playlist
        playlistOrders = PlaylistOrder.objects.filter(user=user).order_by('rank')
        for playlistOrder in playlistOrders:
            playlists.append(playlistOrder.playlist)
        return playlists

    @staticmethod
    ## This method return all the information about a playlist in a dict
    #   @param playlist a playlist
    #   @return a dict with the information about the playlist
    def getPlaylistInformation(playlist):
        return {
            'ID': playlist.id,
            'NAME': playlist.name,
            'DESCRIPTION': playlist.description,
            'IS_PUBLIC': playlist.isPublic,
            'IS_LIBRARY': playlist.isLibrary,
            'TOTAL_TRACK': playlist.totalTracks,
            'AVERAGE_BITRATE': playlist.averageBitRate,
            'OWNER': playlist.owner,
        }

