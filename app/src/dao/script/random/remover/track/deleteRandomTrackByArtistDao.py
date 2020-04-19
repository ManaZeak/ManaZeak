from app.src.dao.script.abstractScript import AbstractScript


## Fill the table of track sorted by name for the random.
class DeleteRandomTrackByArtistDao(AbstractScript):

    def _generateRequest(self):
        return '''
            TRUNCATE app_randomtracksortedbyartist
        '''