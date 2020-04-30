from multiprocessing import Process

from django import db
from django.contrib.auth.decorators import login_required
from django.core.cache import cache

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.thumbs.artistThumbnailService import ArtistThumbnailService
from app.src.services.thumbs.coverThumbnailService import CoverThumbnailService
from app.src.services.thumbs.labelThumbnailService import LabelThumbnailService
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This service manages all the thumbnail generation.
class ThumbnailService(object):

    @staticmethod
    ## Start the process that will generate the thumbnails of the library.
    def startProcessRegenThumbnails():
        scanThread = Process(
            target=ThumbnailService.regenerateAllThumbnails
        )
        # Closing all connection to the database for avoiding to use the same connection between processes.
        db.connections.close_all()
        # Closing the connection to the cache for avoiding errors.
        cache.cache.disconnect_all()
        # Launching the process of integrating the track into the database.
        scanThread.start()

    @staticmethod
    ## Delete all the available thumbnails and recreate all of them.
    def regenerateAllThumbnails():
        # Launch the artists thumbnail generation
        artistThumbnailService = ArtistThumbnailService()
        artistThumbnailService.regenerateThumbnailsForAllDbArtists()
        # Launch the label thumbnail generation
        labelThumbnailService = LabelThumbnailService()
        labelThumbnailService.regenerateThumbnailForAllDbLabels()
        # Launch the cover thumbnail generation
        coverThumbnailService = CoverThumbnailService()
        coverThumbnailService.regenerateThumbnailForAllDbCovers()

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def regeneratesAllThumbnailsAdmin(request):
        # Getting the user.
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
        # Check the request of the user.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Launch the thread for regenerating thumbnails.
        ThumbnailService.startProcessRegenThumbnails()
