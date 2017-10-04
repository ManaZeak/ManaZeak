from django.conf.urls import url

from app import components, utils, controller
from . import views

app_name = 'app'

urlpatterns = [
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^ajax/rescan/$', views.initialScan, name='rescan'),
    url(r'^ajax/getPlaylists/$', views.getUserPlaylists, name='getPlaylists'),
    url(r'^DEBUG/drop/$', views.dropAllDB, name='drop'),
    url(r'^signup/$', views.createUser, name='signup'),
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),
    url(r'^logout/$', views.logoutView, name='logout'),
    url(r'^ajax/loadAllLibrary/$', views.loadAllLibrary, name='loadAllLibrary'),
    url(r'^ajax/getPlaylistTracks/$', views.loadTracksFromPlaylist, name='loadTracksFromPlaylist'),
    url(r'^ajax/newLibrary/$', views.newLibrary, name='setLibrary'),
    url(r'^components/newLibrary/$', components.NewLibrary.as_view(), name='newLibraryComponent'),
    url(r'^utils/modal/scan/$', utils.ScanModal.as_view(), name='scanModal'),
    url(r'^utils/modal/editMetadata/$', utils.EditMetadataModal.as_view(), name='editMetadataModal'),
]
