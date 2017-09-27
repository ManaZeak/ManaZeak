from django.conf.urls import url
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import RedirectView, CreateView

from app import components
from . import views

app_name = 'app'

urlpatterns = [
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^ajax/rescan/$', views.initialScan, name='rescan'),
    url(r'^ajax/getPlaylists/$', views.getUserPlaylists, name='getPlaylists'),
    url(r'^DEBUG/drop/$', views.dropAllDB, name='drop'),
    url(r'^db/$', views.viewDB.as_view(), name='db'),
    url(r'^signup/$', views.createUser, name='signup'),
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),
    url(r'^logout/$', views.logoutView, name='logout'),
    url(r'^ajax/loadAllLibrary/$', views.loadAllLibrary, name='loadAllLibrary'),
    url(r'^ajax/getPlaylistTracks/$', views.loadTrackFromPlaylist, name='loadTrackFromPlaylist'),
    url(r'^ajax/setLibraryPath/$', views.setLibraryPath, name='setLibrary'),
    url(r'^ajax/getTracksArtists/$', views.getTracksArtists, name='getTracksArtists'),
    url(r'^components/newLibrary/$', components.newLibrary.as_view(), name='newLibraryComponent')
]
