## Represents an album before it's inserted into the database.
class LocalAlbum(object):

    def __init__(self):
        self.title = None
        self.producer = None
        self.producerId = None
        self.artist = None
        self.artistId = None
        self.year = None
        self.folderName = None
        self.location = None

    ## Fill the id of the artists into the album.
    #   @param artistRef the reference of the artists inserted.
    def fillArtistIdWithRef(self, artistRef):
        self.artistId = artistRef[self.artist]

    def fillProducerIdWithRef(self, producerRef):
        self.producerId = producerRef[self.producer]
