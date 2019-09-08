from django.urls import path

from app.src.services.views.mainPage.mainPageService import MainPageService
from app.src.views.genericViews import GenericViews

app_name = 'app'

urlpatterns = [
# New url to process, see genericViews aswell
    path('layout/', GenericViews.getMainPage, name='getMainPage'),
    path('roll/', MainPageService.getRandomObjects, name='getTrack'),
    path('collection/', MainPageService.getLibrariesAndPlaylistForUser, name='getCollections')
]
