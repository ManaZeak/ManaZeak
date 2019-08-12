from django.urls import path

from app.src.services.collections.library.libraryService import LibraryService

app_name = 'app'

## The library URLS.
urlpatterns = [
    path('new/', LibraryService.createLibrary, name='createLibrary'),
    path('initialScan/', LibraryService.initialScan, name='initialScan'),
    # FIXME : to be moved into the new library action.
    path('delete/<int:libraryId>/', LibraryService.deleteLibrary, name='deleteLibrary'),
    path('checkScanStatus/', LibraryService.getLibraryScanStatus, name='libraryScanStatus'),
]