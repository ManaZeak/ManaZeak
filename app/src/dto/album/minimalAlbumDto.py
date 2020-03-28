from app.src.dto.abstractDto import AbstractDto


## The minimal information needed to display an album.
class MinimalAlbumDto(AbstractDto):

    def __init__(self):
        self.id = None
        self.name = None
        self.picture = None
        self.year = None

    def generateJson(self):
        return {
            'ALBUM_ID': self.id,
            'ALBUM_NAME': self.name,
            'ALBUM_YEAR': self.year,
            'ALBUM_PP': self.picture
        }