from app.src.dao.script.abstractScript import AbstractScript


## Fill the table random artist sorted by name
class DeleteRandomAlbumByArtistDao(AbstractScript):

    def _generateRequest(self):
        return '''
                TRUNCATE app_randomalbumsortedbyartist
            '''