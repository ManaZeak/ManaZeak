from app.src.dao.script.abstractScript import AbstractScript

## Fill the random table containing all the artists sorted by name.
class DeleteRandomArtistByNameDao(AbstractScript):

    def _generateRequest(self):
        return '''
            TRUNCATE app_randomartistsortedbyname
        '''