from django.urls import path

from app.src.collections.library.libraryService import getTrack
from app.src.services.user.languageService import LanguageService
from app.src.views import loginView
from app.src.views import mainView, signupView
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
    path('', mainView.mainView.as_view(), name='index'),

    ############################ Language ############################
    path('language/', LanguageService.selectLanguage, name='language'),

    path('test/<path:path>', getTrack, name='test')
]