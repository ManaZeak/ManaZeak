from django.conf.urls import url

from app import components, utils
from . import views

app_name = 'app'

urlpatterns = [
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^ajax/initialScan/$', views.initialScan, name='rescan'),
    url(r'^ajax/getPlaylists/$', views.getUserPlaylists, name='getPlaylists'),
    url(r'^ajax/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/$', views.dropAllDB, name='drop'),
    url(r'^signup/$', views.createUser, name='signup'),
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),
    url(r'^logout/$', views.logoutView, name='logout'),
    url(r'^ajax/getAdminView/$', views.getAdminView, name='getAdminView'),
    url(r'^ajax/getPlaylistTracks/$', views.loadTracksFromPlaylist, name='loadTracksFromPlaylist'),
    url(r'^ajax/newLibrary/$', views.newLibrary, name='setLibrary'),
    url(r'^ajax/newPlaylist/$', views.newPlaylist, name='newPlaylist'),
    url(r'^ajax/getSimplifiedTracks/$', views.loadSimplifiedLibrary, name='simplifiedJson'),
    url(r'^ajax/checkLibraryScanStatus/$', views.checkLibraryScanStatus, name='checkLibraryScan'),
    url(r'^ajax/getTrackPathByID/$', views.getTrackPathByID, name='getTrackPathByID'),
    url(r'^ajax/getMoodbarByID/$', views.getMoodbarByID, name='getMoodbarByID'),
    url(r'^ajax/shuffleNextTrack/$', views.shuffleNextTrack, name='shuffleNextTrack'),
    url(r'^ajax/randomNextTrack/$', views.randomNextTrack, name='randomNextTrack'),
    url(r'^ajax/rescanLibrary/$', views.rescanLibrary, name='rescanLibrary'),
    url(r'^ajax/toggleRandom/$', views.toggleRandom, name='toogleRandom'),
    url(r'^ajax/getPlaylistInfo/$', views.getPlaylistInfo, name='getPlaylistInfo'),
    url(r'^ajax/getUserStats/$', views.getUserStats, name='getUserStats'),
    url(r'^ajax/adminGetUserStats/$', views.adminGetUserStats, name='adminGetUserStats'),
    url(r'^ajax/getTrackDetailedInfo/$', views.getTrackDetailedInfo, name='getTrackDetailedInfo'),
    url(r'^ajax/getLastSongPlayed/$', views.getLastSongPlayed, name='getLastSongPlayed'),
    url(r'^ajax/getSimilarTrack/$', views.getSimilarTrack, name='getSimilarTrack'),
    url(r'^ajax/download/$', views.getDownloadLocation, name='getDownloadLocation'),
    url(r'^ajax/submitWish/$', views.createWish, name='createWish'),
    url(r'^components/newLibrary/$', components.NewLibrary.as_view(), name='newLibraryComponent'),
    url(r'^debug/$', utils.artistViewJsonGenerator),
]
