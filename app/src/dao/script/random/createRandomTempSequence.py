from app.src.dao.script.abstractScriptWithParam import AbstractScriptWithParam


## Create a sequence
class CreateRandomTempSequence(AbstractScriptWithParam):

    ## Generate a SQL request containing the name of the sequence.
    def _generateRequest(self, param):
        return 'CREATE TEMP SEQUENCE ' + param
