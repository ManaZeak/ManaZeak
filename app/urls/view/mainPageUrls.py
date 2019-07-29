from django.urls import path

from app.src.services.track.trackService import TrackService
from app.src.services.views.mainPage.mainPageService import MainPageService
from app.src.views.genericViews import GenericViews

app_name = 'app'

## The modals URLS.
urlpatterns = [
    path('mainPage/layout/', GenericViews.getMainPage, name='getMainPage'),
    path('mainPage/roll/', MainPageService.getRandomObjects, name='getTrack'),
]