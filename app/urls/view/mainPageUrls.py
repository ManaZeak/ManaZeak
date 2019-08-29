from django.urls import path

from app.src.services.views.mainPage.mainPageService import MainPageService
from app.src.views.genericViews import GenericViews

app_name = 'app'

urlpatterns = [
    path('library/layout/', GenericViews.getLibraryPage, name='getLibraryPage'),
    path('mainPage/layout/', GenericViews.getMainPage, name='getMainPage'),
    path('mainPage/roll/', MainPageService.getRandomObjects, name='getTrack'),
    path('mainPage/collection/', MainPageService.getLibrariesAndPlaylistForUser, name='getCollections')
]
