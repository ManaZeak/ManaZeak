from django.conf.urls import url

from app import player, history, adminTools, wish, userSettings, fileUpload, user, utils, language
from app.collection import playlist, library
from app.stats import stats, suggestion
from app.track import track, editor
from . import views

## @package app.urls
#   zobi zoba


## The name of the app linked to the urls
app_name = 'app'


## The different pattern of the urls of the application.
#   This list links the urls of the application and the function called
urlpatterns = [
    ############################# Main page #############################
    url(r'^$', views.mainView.as_view(), name='index'),  # display the main page
    url(r'^signup/$', views.createUser, name='signup'),  # display the signup page
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),  # display the login page
    url(r'^logout/$', views.logoutView, name='logout'),  # logout the user

    ####################### Collection actions ##########################
    url(r'^collection/delete/$', adminTools.deleteCollection, name='deleteCol'),  # delete a playlist or a library

    ########################## Library actions ##########################
    url(r'^library/initialScan/$', library.initialScan, name='initialScan'),  # launch the first scan of a library
    url(r'^library/new/$', library.newLibrary, name='setLibrary'),  # create a new library
    url(r'^library/checkScanStatus/$', library.checkLibraryScanStatus, name='checkLibraryScan'),  # check if the library has been scanned
    url(r'^library/rescan/$', library.rescanLibraryRequest, name='rescanLibrary'),  # launch the rescan of a library
    url(r'^library/rescanAll/$', library.rescanAllLibraries, name='rescanAllLibraries'),  # launch the rescan of all libraries
    url(r'^library/deleteAll/$', library.deleteAllLibrary, name='deleteAllLibrary'),  # delete all libraries

    ######################### Playlist actions ##########################
    url(r'^playlist/new/$', playlist.newPlaylist, name='newPlaylist'),  # create a new playlist
    url(r'^playlist/addTracks/$', playlist.addTracksToPlaylist, name='addTracksToPlaylist'),  # add a track to a playlist
    url(r'^playlist/removeTracks/$', playlist.removeTracksFromPlaylist, name='removeTrackFromPlaylist'),  # remove a track from a playlist
    url(r'^playlist/rename/$', playlist.renamePlaylist, name='renamePlaylist'),  # rename a playlist
    url(r'^playlist/fetchAll/$', playlist.getUserPlaylists, name='getPlaylists'),  # get all the user's playlist
    url(r'^playlist/simplifiedLazyLoading/$', playlist.simplifiedLazyLoadingPlaylist, name='lazyLoading'),  # get the tracks in simplified form of a playlist
    url(r'^playlist/getInfo/$', playlist.getPlaylistInfo, name='getPlaylistInfo'),  # Use this in front
    url(r'^playlist/setDescription/$', playlist.setPlaylistDescription, name='setPlaylistDescription'),  # set a new descritption to a playlist
    url(r'^playlist/getDescription/$', playlist.getPlaylistDescription, name='getPlaylistDescription'),  # get the playlist description

    ########################## Player actions ###########################
    url(r'^player/shuffleNext/$', player.shuffleNextTrack, name='shuffleNextTrack'),  # get the next track while in shuffle mode
    url(r'^player/randomNext/$', player.randomNextTrack, name='randomNextTrack'),  # get the random next track
    url(r'^player/toggleRandomMode/$', player.toggleRandom, name='toggleRandom'),  # change the random mode

    ########################### Track actions ###########################
    url(r'^track/getPath/$', track.getTrackPath, name='getTrackPathByID'),  # get a track path
    url(r'^track/getMoodbar/$', track.getMoodbar, name='getMoodbarByID'),  # get the moodbar of a track
    url(r'^track/getDetailedInfo/$', track.getTracksDetailedInfo, name='getTracksDetailedInfo'),  # get all the information about a track
    url(r'^track/changeMetadata/$', editor.changeTracksMetadata, name='changeTracksMetadata'),  # change the track metadata
    url(r'^track/download/$', track.getDownloadLocation, name='getDownloadLocation'),  # download the given track
    url(r'^track/multiDownload/$', track.multiTrackDownload, name='multiTrackDownload'),  # download multiple tracks

    ########################### Stats actions ###########################
    url(r'^stats/adminGetUserStats/$', stats.adminGetUserStats, name='adminGetUserStats'),  # TODO : Implement in front
    url(r'^stats/getUserPrefArtists/$', stats.getUserPrefArtists, name='getUserPrefArtists'),  # get the user preferred artists
    url(r'^stats/getUserPrefGenres/$', stats.getUserPrefGenres, name='getUserPrefGenres'),  # get the user preferred genre
    url(r'^stats/getUserPrefTracks/$', stats.getUserPrefTracks, name='getUserPrefTracks'),  # get the user preferred tracks

    ########################## History actions ##########################
    url(r'^history/getLastSongPlayed/$', history.getLastSongPlayed, name='getLastSongPlayed'),  # get the last song played by the user

    ######################## Suggestions actions ########################
    url(r'^suggestions/getSimilarTrack/$', suggestion.getSimilarTrack, name='getSimilarTrack'),
    url(r'^suggestions/getTracksFromSameAlbum/$', suggestion.getTracksFromSameAlbum, name='getTracksFromSameAlbum'),

    ############################ Wish actions ###########################
    url(r'^wish/submit/$', wish.createWish, name='createWish'),
    url(r'^wish/get/$', wish.getWishes, name='getWishes'),
    url(r'^wish/setStatus/$', wish.setWishStatus, name='setWishStatus'),

    ########################### User actions ############################
    url(r'^user/getInformation/$', user.getUserInformation, name='getUserInformation'),
    url(r'^user/getSettings/$', userSettings.getUserSettings, name='getUserSettings'),
    url(r'^user/delete/$', user.deleteUser, name='deleteUser'),
    url(r'^user/editAvatar/$', userSettings.changeAvatar, name='changeAvatar'),

    ########################### Group actions ###########################
    url(r'^admin/editGroup/$', adminTools.editGroup, name='editGroup'),
    url(r'^admin/editUserGroup/$', adminTools.editUserGroup, name='editUserGroup'),

    ########################### Admin actions ###########################
    url(r'^admin/isAdmin/$', adminTools.isAdmin, name='isAdmin'),  # TODO : remove in front
    url(r'^admin/getView/$', adminTools.getAdminView, name='getAdminView'),
    url(r'^admin/removeAllMoods/$', adminTools.removeAllMoods, name='removeAllMoods'),
    url(r'^admin/removeUser/$', adminTools.removeUser, name='removeUserById'),
    url(r'^admin/changeSyncthingAPIKey/$', adminTools.changeSyncthingAPIKey, name='changeAdminOptions'),
    url(r'^admin/syncthingRescan/$', adminTools.syncthingRescan, name='syncthingRescan'),
    url(r'^admin/regenerateCovers/$', adminTools.regenerateCovers, name='regenerateCovers'),
    url(r'^admin/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/$', adminTools.dropAllDB, name='drop'),
    url(r'^admin/changeBufferPath/$', adminTools.changeBufferPath, name='changeBufferPath'),
    url(r'^admin/refreshCrontab/$', utils.refreshCrontab, name='setCronJob'),

    ######################### InviteCode section #########################
    url(r'^admin/isInviteEnabled/$', adminTools.isInviteEnabled, name='isInviteEnabled'),
    url(r'^admin/toggleInvite/$', adminTools.toggleInvite, name='toggleInvite'),

    ############################# File upload ############################
    url(r'^file/upload/$', fileUpload.handleUploadedFile, name='handleUploadedFile'),

    ############################## Language ##############################
    url(r'^language/', language.loadLanguage, name='loadLanguage'),
]
