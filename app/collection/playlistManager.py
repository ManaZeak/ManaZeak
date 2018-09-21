from app.models.views import PlaylistView


## Create a dict containing the playlist information
#   @param playlist the playlist object to detail
#   @return a dict containing the playlist information
def getPlaylistInformation(playlist):
    data = {
        'NAME': playlist.name,
        'DESC': playlist.description,
        'IS_PUBLIC': playlist.isPublic,
        'TOTAL_TRK': "TO BE IMPLEMENTED",
        'TOTAL_DUR': "TO BE IMPLEMENTED",
        'AVG_BITRATE': "TO BE IMPLEMENTED",
        'OWNER': playlist.user.username,
    }
    return data


## Get the view information and return it. Creates the playlist settings if it doesn't exist.
#   @param playlist the playlist of the view
#   @param user the user requesting the view
def getPlaylistViewInformation(playlist, user):
    if PlaylistView.objects.filter(user=user, playlist=playlist).count() == 0:
        # FIXME: faire le cas par defaut pour les colonnes
        pass
    playlistView = PlaylistView.objects.get(user=user, playlist=playlist, )
    for

    data = {
        'COLS': 'AZ'
    }
    return data
