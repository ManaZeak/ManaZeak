from django.conf.urls import url

from app import player, history, library, playlist, adminTools, wish, userSettings
from app.stats import stats, suggestion
from app.track import track
from . import views

app_name = 'app'

urlpatterns = [
    # Main page
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^signup/$', views.createUser, name='signup'),
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),
    url(r'^logout/$', views.logoutView, name='logout'),

    # Library actions
    url(r'^ajax/initialScan/$', library.initialScan, name='rescan'),
    url(r'^ajax/newLibrary/$', library.newLibrary, name='setLibrary'),
    url(r'^ajax/checkLibraryScanStatus/$', library.checkLibraryScanStatus, name='checkLibraryScan'),
    url(r'^ajax/rescanLibrary/$', library.rescanLibrary, name='rescanLibrary'),
    url(r'^ajax/deleteLibrary/$', library.deleteLibrary, name='deleteLibrary'),
    url(r'^ajax/deleteAllLibrary/$', library.deleteAllLibrary, name='deleteAllLibrary'),

    # Playlist actions
    url(r'^ajax/newPlaylist/$', playlist.newPlaylist, name='newPlaylist'),
    url(r'^ajax/addTracksToPlaylist/$', playlist.addTracksToPlaylist, name='addTracksToPlaylist'),
    url(r'^ajax/removeTrackFromPlaylist/$', playlist.removeTrackFromPlaylist, name='removeTrackFromPlaylist'),
    url(r'^ajax/deletePlaylist/$', playlist.deletePlaylist, name='deletePlaylist'),
    url(r'^ajax/renamePlaylist/$', playlist.renamePlaylist, name='renamePlaylist'),
    url(r'^ajax/getPlaylists/$', playlist.getUserPlaylists, name='getPlaylists'),
    url(r'^ajax/getSimplifiedTracks/$', playlist.loadSimplifiedPlaylist, name='simplifiedJson'),
    url(r'^ajax/getPlaylistInfo/$', playlist.getPlaylistInfo, name='getPlaylistInfo'),

    # Player actions
    url(r'^ajax/getTrackPathByID/$', player.getTrackPathByID, name='getTrackPathByID'),
    url(r'^ajax/getMoodbarByID/$', player.getMoodbarByID, name='getMoodbarByID'),
    url(r'^ajax/shuffleNextTrack/$', player.shuffleNextTrack, name='shuffleNextTrack'),
    url(r'^ajax/randomNextTrack/$', player.randomNextTrack, name='randomNextTrack'),
    url(r'^ajax/toggleRandom/$', player.toggleRandom, name='toggleRandom'),

    # Track actions
    url(r'^ajax/getTrackDetailedInfo/$', track.getTrackDetailedInfo, name='getTrackDetailedInfo'),
    url(r'^ajax/download/$', track.getDownloadLocation, name='getDownloadLocation'),

    # Stats actions
    url(r'^ajax/getUserStats/$', stats.getUserStats, name='getUserStats'),
    url(r'^ajax/adminGetUserStats/$', stats.adminGetUserStats, name='adminGetUserStats'),

    # History actions
    url(r'^ajax/getLastSongPlayed/$', history.getLastSongPlayed, name='getLastSongPlayed'),

    # Suggestions actions
    url(r'^ajax/getSimilarTrack/$', suggestion.getSimilarTrack, name='getSimilarTrack'),

    # Wish actions
    url(r'^ajax/submitWish/$', wish.createWish, name='createWish'),
    url(r'^ajax/getWishes/$', wish.getWishes, name='getWishes'),

    # USER actions
    url(r'^ajax/getUserSettings/$', userSettings.getUserSettings, name='getUserSettings'),

    # ADMIN actions
    url(r'^ajax/isAdmin/$', adminTools.isAdmin, name='isAdmin'),
    url(r'^ajax/getAdminView/$', adminTools.getAdminView, name='getAdminView'),
    url(r'^ajax/removeAllMoods/$', adminTools.removeAllMoods, name='removeAllMoods'),
    url(r'^ajax/removeUserById/$', adminTools.removeUserById, name='removeUserById'),
    url(r'^ajax/changeSyncthingAPIKey/$', adminTools.changeSyncthingAPIKey, name='changeAdminOptions'),
    url(r'^ajax/syncthingRescan/$', adminTools.syncthingRescan, name='syncthingRescan'),
    url(r'^ajax/regenerateCovers/$', adminTools.regenerateCovers, name='regenerateCovers'),
    url(r'^ajax/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/$', adminTools.dropAllDB, name='drop'),

    # InviteCode section
    url(r'^ajax/isInviteEnabled/$', adminTools.isInviteEnabled, name='isInviteEnabled'),
    url(r'^ajax/toggleInvite/$', adminTools.toggleInvite, name='toggleInvite'),
]
