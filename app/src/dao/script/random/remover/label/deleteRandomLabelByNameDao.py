from app.src.dao.script.abstractScript import AbstractScript


class DeleteRandomLabelByNameDao(AbstractScript):

    def _generateRequest(self):
        return '''
            TRUNCATE app_randomlabelsortedbyname
        '''