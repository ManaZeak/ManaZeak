from django.urls import path, include

from app.src.views.genericViews import GenericViews

app_name = 'app'

urlpatterns = [
    ## The urls related to the main page.
    path('mainPage/', include('app.urls.view.mainPageUrls', namespace='mainPage')),
    ## The urls related to view of single elements (album, artist, genre...).
    path('single/', include('app.urls.view.singleObjectPageUrls', namespace='singleObject')),
    ## The urls related to view of all elements (album, artist, genre...).
    path('all/', include('app.urls.view.allObjectsPageUrls', namespace='allObjects')),

    ## Layout for the library.
    path('library/layout/', GenericViews.getLibraryPage, name='getLibraryPage'),
    ## Layout for the party view.
    path('party/layout/', GenericViews.getPartyPage, name='getPartyPage'),
    # TODO je pense qu'on peux se faire un set d'url /plugins/
    ## Layout and overlay for MzkWorldMap plugin
    path('mzkworldmap/layout/', GenericViews.getMzkWorldMapPage, name='getMzkWorldMapPage'),
    path('mzkvisualizer/layout/', GenericViews.getMzkVisualizerPage, name='getMzkVisualizerPage'),
    # Layout for admin view
    path('admin/layout/', GenericViews.getAdminPage, name='reset'),
    path('admin/overview/layout/', GenericViews.getAdminOverviewPage, name='reset'),
    path('admin/database/layout/', GenericViews.getAdminDatabasePage, name='reset'),
    path('admin/user/layout/', GenericViews.getAdminUserPage, name='reset'),
    path('admin/suggestion/layout/', GenericViews.getAdminSuggestionPage, name='reset'),
    # Layout for community view
    path('community/layout/', GenericViews.getCommunityPage, name='reset'),
    path('community/userhub/layout', GenericViews.getUserHubPage, name='userHub'),
]