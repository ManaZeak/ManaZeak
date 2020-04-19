from app.src.dao.script.abstractScript import AbstractScript


class DeleteRandomCountryByNameDao(AbstractScript):

    def _generateRequest(self):
        return '''
                TRUNCATE app_randomcountrysortedbyname
            '''