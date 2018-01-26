from django.conf.urls import url

from app import player, history, library, playlist, adminTools, wish, userSettings, fileUpload
from app.stats import stats, suggestion
from app.track import track, editor
from . import views

app_name = 'app'

urlpatterns = [
    # Main page
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^signup/$', views.createUser, name='signup'),
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),
    url(r'^logout/$', views.logoutView, name='logout'),

    # Collection actions
    url(r'^collection/delete/$', adminTools.deleteCollection, name='deleteCollection'),

    # Library actions
    url(r'^library/initialScan/$', library.initialScan, name='initialScan'),
    url(r'^library/new/$', library.newLibrary, name='setLibrary'),
    url(r'^library/checkScanStatus/$', library.checkLibraryScanStatus, name='checkLibraryScan'),
    url(r'^library/rescan/$', library.rescanLibraryRequest, name='rescanLibrary'),
    url(r'^library/rescanAll/$', library.rescanAllLibraries, name='rescanAllLibraries'),
    url(r'^library/deleteAll/$', library.deleteAllLibrary, name='deleteAllLibrary'),

    # Playlist actions
    url(r'^playlist/new/$', playlist.newPlaylist, name='newPlaylist'),
    url(r'^playlist/addTracks/$', playlist.addTracksToPlaylist, name='addTracksToPlaylist'),
    url(r'^playlist/removeTracks/$', playlist.removeTracksFromPlaylist, name='removeTrackFromPlaylist'),
    url(r'^playlist/rename/$', playlist.renamePlaylist, name='renamePlaylist'),
    url(r'^playlist/fetchAll/$', playlist.getUserPlaylists, name='getPlaylists'),
    url(r'^playlist/simplifiedLazyLoading/$', playlist.simplifiedLazyLoadingPlaylist, name='lazyLoading'),
    url(r'^playlist/getInfo/$', playlist.getPlaylistInfo, name='getPlaylistInfo'),  # Use this in front

    # Player actions
    url(r'^player/shuffleNext/$', player.shuffleNextTrack, name='shuffleNextTrack'),
    url(r'^player/randomNext/$', player.randomNextTrack, name='randomNextTrack'),
    url(r'^player/toggleRandomMode/$', player.toggleRandom, name='toggleRandom'),

    # Track actions
    url(r'^track/getPath/$', track.getTrackPath, name='getTrackPathByID'),
    url(r'^track/getMoodbar/$', track.getMoodbar, name='getMoodbarByID'),
    url(r'^track/getDetailedInfo/$', track.getTracksDetailedInfo, name='getTracksDetailedInfo'),
    url(r'^track/changeMetadata/$', editor.changeTracksMetadata, name='changeTracksMetadata'),
    url(r'^track/download/$', track.getDownloadLocation, name='getDownloadLocation'),
    url(r'^track/multiDownload/$', track.multiTrackDownload, name='multiTrackDownload'),

    # Stats actions
    url(r'^stats/adminGetUserStats/$', stats.adminGetUserStats, name='adminGetUserStats'),  # TODO : Implement in front
    url(r'^stats/getUserPrefArtists/$', stats.getUserPrefArtists, name='getUserPrefArtists'),
    url(r'^stats/getUserPrefGenres/$', stats.getUserPrefGenres, name='getUserPrefGenres'),
    url(r'^stats/getUserPrefTracks/$', stats.getUserPrefTracks, name='getUserPrefTracks'),

    # History actions
    url(r'^history/getLastSongPlayed/$', history.getLastSongPlayed, name='getLastSongPlayed'),

    # Suggestions actions
    url(r'^suggestions/getSimilarTrack/$', suggestion.getSimilarTrack, name='getSimilarTrack'),

    # Wish actions
    url(r'^wish/submit/$', wish.createWish, name='createWish'),
    url(r'^wish/get/$', wish.getWishes, name='getWishes'),
    url(r'^wish/setStatus/$', wish.setWishStatus, name='setWishStatus'),

    # USER actions
    url(r'^user/getSettings/$', userSettings.getUserSettings, name='getUserSettings'),

    # ADMIN actions
    url(r'^admin/isAdmin/$', adminTools.isAdmin, name='isAdmin'),  # TODO : remove in front
    url(r'^admin/getView/$', adminTools.getAdminView, name='getAdminView'),
    url(r'^admin/removeAllMoods/$', adminTools.removeAllMoods, name='removeAllMoods'),
    url(r'^admin/removeUser/$', adminTools.removeUser, name='removeUserById'),
    url(r'^admin/changeSyncthingAPIKey/$', adminTools.changeSyncthingAPIKey, name='changeAdminOptions'),
    url(r'^admin/syncthingRescan/$', adminTools.syncthingRescan, name='syncthingRescan'),
    url(r'^admin/regenerateCovers/$', adminTools.regenerateCovers, name='regenerateCovers'),
    url(r'^admin/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/$', adminTools.dropAllDB, name='drop'),
    url(r'^admin/changeBufferPath/$', adminTools.changeBufferPath, name='changeBufferPath'),

    # InviteCode section
    url(r'^admin/isInviteEnabled/$', adminTools.isInviteEnabled, name='isInviteEnabled'),
    url(r'^admin/toggleInvite/$', adminTools.toggleInvite, name='toggleInvite'),

    # File upload
    url(r'^file/upload/$', fileUpload.handleUploadedFile, name='handleUploadedFile'),
]
