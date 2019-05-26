from django.urls import path

from app.src.services.collections.library.libraryService import LibraryService

app_name = 'app'

## The library URLS.
urlpatterns = [
    path('lib/new/', LibraryService.createLibrary, name='createLibrary'),
    path('lib/initialScan/', LibraryService.initialScan, name='initialScan'),
    # FIXME : to be moved into the new library action.
    path('lib/delete/<int:libraryId>/', LibraryService.deleteLibrary, name='deleteLibrary'),
]