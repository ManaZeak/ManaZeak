import logging

from app.errors.exceptions import CreationException
from app.models import PlaylistViewOptions
from app.view.view import createDefaultListView
from app.view.viewTypes import ViewEnum, chooseViewMode

logger = logging.getLogger('django')


## Get all the information need for the front to display a playlist
#   @param playlist the playlist to get the information
#   @param user the user accessing the playlist
#   @return a dict with all the information
def getPlaylistInfo(playlist, user):
    # Checking if the playlist has been used before
    if PlaylistViewOptions.objects.filter(user=user, playlist=playlist, isActive=True).count() == 0:
        try:
            # Creating a default option for the playlist
            _createDefaultViewOptions(user, playlist, None)
        except CreationException:
            # Fail to create the options for the playlist, raising a exception
            logger.error('Fail to create the playlist option for the user: ' + user)
            raise CreationException('Fail to create the playlist option')

    # Getting the view option
    options = PlaylistViewOptions.objects.filter(user=user, playlist=playlist)
    return {
        'INFO': _getPlaylistDetailedInformation(playlist),
        'VIEW': _getPlaylistViewInformation(options),
    }


## Create a dict containing the playlist information
#   @param playlist the playlist object to detail
#   @return a dict containing the playlist information
def _getPlaylistDetailedInformation(playlist):
    data = {
        'ID': playlist.id,
        'NAME': playlist.name,
        'DESCRIPTION': playlist.description,
        'IS_PUBLIC': playlist.isPublic,
        'IS_LIBRARY': playlist.isLibrary,
        'TOTAL_TRACK': "TO BE IMPLEMENTED",
        'TOTAL_DURATION': "TO BE IMPLEMENTED",
        'AVERAGE_BITRATE': "TO BE IMPLEMENTED",
        'OWNER': playlist.user.username,
    }
    return data


## Get the view information and return it. Creates the playlist settings if it doesn't exist.
#   @param playlist the playlist of the view
#   @param user the user requesting the view
def _getPlaylistViewInformation(options):
    columns = []
    data = {}
    for option in options:
        if ViewEnum.LIST == chooseViewMode(option.viewType.name):
            for col in option.columns.all():
                columns.append({
                    'NAME': col.name,
                    'ORDER': 0, # TODO store in db
                    'WIDTH': col.width,
                })
            data = {
                'LISTVIEW': {'COLS': columns},
                'VIEW': option.viewType.name,
            }
        else:
            data = {'NOT': 'IMPLEMENTED'}
    return data


## Create a default view option for the given user, view type and playlist
#   @param user the user linked to the options
#   @param playlist the playlist linked to the options
#   @param viewType the type of view linked to the options
def _createDefaultViewOptions(user, playlist, viewType):
    # If the viewType isn't specified, take the default one
    if viewType is None:
        viewType = ViewEnum.LIST

    # Creating the default options for the selected view mode
    if viewType == ViewEnum.LIST:
        logger.info("Creating default list view for the user: " + user.username)
        createDefaultListView(user, playlist)
    elif viewType == ViewEnum.ALBUM:
        pass  # TODO : create default album view
    else:
        raise CreationException('Fail to create the playlist option')
