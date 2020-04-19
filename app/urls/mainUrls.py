from django.urls import path, include

from app.src.services.collections.library.libraryService import LibraryService
from app.src.services.invite.InviteCodeService import InviteCodeService
from app.src.services.user.languageService import LanguageService
from app.src.services.user.userInformationService import UserInformationService
from app.src.views import loginView
from app.src.views import MainView
from app.src.views.genericViews import GenericViews
from app.src.views.signupView import SignupView

## The name of the app linked to the urls

app_name = 'app'

## The different pattern of the urls of the application.
#   This list links the urls of the application and the function called
urlpatterns = [
    ############################# Views #############################
    path('login/', loginView.LoginView.as_view(), name='login'),
    path('signup/', SignupView.signup, name='signup'),
    path('logout/', GenericViews.logoutView, name='logout'),
    path('', MainView.MainView.as_view(), name='index'),

    ########################### Libraries ###########################
    # FIXME : change to library
    path('lib/', include('app.urls.collection.library.libraryUrls', namespace='library')),

    ########################### Playlists ###########################
    path('playlist/', include('app.urls.collection.playlist.playlistUrls', namespace='playlist')),

    ############################# Tracks #############################
    path('track/', include('app.urls.track.trackUrls', namespace='track')),

    ########################### Suggestion ###########################
    path('suggestion/', include('app.urls.suggestion.suggestionUrls', namespace='suggestion')),

    ############################# Modals #############################
    # FIXME: remove the 's'
    path('modal/', include('app.urls.modal.modalUrls', namespace='modal')),

    ############################ Language ############################
    path('language/', LanguageService.selectLanguage, name='language'),

    ########################## User Settings ##########################
    path('user/getInformation/', UserInformationService.getUserInformation, name='getUserInformation'),
    path('user/getInviteCode/', InviteCodeService.getInviteCode, name='getInviteCode'),

    ############################ Contexts #############################
    # FIXME : remove the 's'
    path('context/', include('app.urls.context.contextUrls', namespace='context')),

    path('view/', include('app.urls.view.viewUrls', namespace='sceneviews')),

    ########################### Admin Tools ###########################
    path('admin/', include('app.urls.admin.adminUrls', namespace='admin')),
    path('dump/', include('app.urls.dump.dumpUrls', namespace='dump')),
]