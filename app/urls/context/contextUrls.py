from django.urls import path

from app.src.views.genericViews import GenericViews

app_name = 'app'

## The contexts URLS.
urlpatterns = [
    # FIXME: remove the S
    path('queuecontext/', GenericViews.queueContext, name='queueContext'),  # send the new library template
    path('trackcontext/', GenericViews.trackContext, name='trackContext'),  # FIXME : make the URL camelCase.
    path('userMenu/', GenericViews.userMenuContext, name='userMenu'),
    path('changeview/', GenericViews.changeViewContext, name='changeView'),  # FIXME : make the URL camelCase.
    path('PlaybackRateContext/', GenericViews.playbackRateContext, name='playbackRateContext'), # FIXME : make the URL camelCase.
]