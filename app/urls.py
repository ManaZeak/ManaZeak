from django.urls import path

from app.src.services.collections.library.libraryService import LibraryService
from app.src.services.collections.playlist.playlistService import PlaylistService
from app.src.services.user.languageService import LanguageService
from app.src.services.user.userInformationService import UserInformationService
from app.src.views import loginView
from app.src.views import MainView, signupView
from app.src.views.genericViews import GenericViews

## The name of the app linked to the urls
app_name = 'app'

## The different pattern of the urls of the application.
#   This list links the urls of the application and the function called
urlpatterns = [
    ############################# Views #############################
    path('login/', loginView.Login.as_view(), name='login'),
    path('signup/', signupView.signup, name='signup'),
    path('logout/', GenericViews.logoutView, name='logout'),
    path('', MainView.MainView.as_view(), name='index'),

    ########################### Libraries ###########################
    path('lib/new/', LibraryService.createLibrary, name='createLibrary'),
    path('lib/initialScan/', LibraryService.initialScan, name='initialScan'),  # FIXME : to be moved into the new library action.
    path('lib/delete/<int:libraryId>/', LibraryService.deleteLibrary, name='deleteLibrary'),

    ########################### Playlists ###########################
    path('playlist/getUserPlaylists/', PlaylistService.getUserPlaylists, name='getUserPlaylists'),
    path('playlist/getTrack/<path:path>/', PlaylistService.getTrack, name='getTrack'),

    ############################# Modals #############################
    path('modals/userMenu/', GenericViews.userMenuContext, name='userMenu'),
    path('modals/changeView/', GenericViews.changeViewContext, name='userMenu'),
    path('modals/newLibrary/', GenericViews.newLibraryModal, name='newLibraryModal'),

    ############################ Language ############################
    path('language/', LanguageService.selectLanguage, name='language'),

    ########################## User Settings ##########################
    path('user/getInformation/', UserInformationService.getUserInformation, name='getUserInformation'),

    ############################ Contexts #############################
    path('contexts/queuecontext/', GenericViews.queueContext, name='queueContext'),  # send the new library template
]
