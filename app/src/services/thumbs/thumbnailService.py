from multiprocessing import Process

from django import db

from app.src.services.thumbs.artistThumbnailService import ArtistThumbnailService
from app.src.services.thumbs.coverThumbnailService import CoverThumbnailService
from app.src.services.thumbs.labelThumbnailService import LabelThumbnailService


## This service manages all the thumbnail generation.
class ThumbnailService(object):

    @staticmethod
    ## Start the process that will generate the thumbnails of the library.
    def startProcessRegenThumbnails():
        scanThread = Process(
            target=ThumbnailService.regenerateAllThumbnails()
        )
        # Closing all connection to the database for avoiding to use the same connection between processes.
        db.connections.close_all()
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
