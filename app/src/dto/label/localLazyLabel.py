## The label in local object.
class LocalLazyLabel(object):

    def __init__(self):
        self.name = None
        self.id = None

    @staticmethod
    def createLabelFromOrm(album):
        pass

    ## Generate the JSON object of a album.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
        }
