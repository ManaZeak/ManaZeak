from django.urls import path

from app.src.services.collections.library.libraryService import LibraryService

app_name = 'app'

## The library URLS.
urlpatterns = [
    path('new/', LibraryService.createLibrary, name='createLibrary'),
    path('initialScan/', LibraryService.initialScan, name='initialScan'),

    path('delete/<int:libraryId>/', LibraryService.deleteLibrary, name='deleteLibrary'),
    path('checkScanStatus/', LibraryService.getLibraryScanStatus, name='libraryScanStatus'),
    path('rescan/', LibraryService.rescanLibrary, name='rescanLibrary'),
]