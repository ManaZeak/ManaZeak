import logging

loggerScan = logging.getLogger('scan')


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
        self.albumId = None

    ## Fill the ids of the artists into the album.
    #   @param artistRef the reference of the artists inserted.
    def fillArtistIdWithRef(self, artistRef):
        if self.artist in artistRef:
            self.artistId = artistRef[self.artist]

    ## Fill the ids of the producer into the album.
    #   @param producerRef the reference of the producer inserted.
    def fillProducerIdWithRef(self, producerRef):
        if self.producer in producerRef:
            self.producerId = producerRef[self.producer]

    ## Find it's id into the data inserted into the database.
    #   @param albumRef the reference of the album inserted.
    def findId(self, albumRef):
        if self.location in albumRef:
            self.albumId = albumRef[self.location]
