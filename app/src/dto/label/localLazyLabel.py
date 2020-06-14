## The label in local object.
class LocalLazyLabel(object):

    def __init__(self):
        self.name = None
        self.id = None

    def loadLabelFromOrm(self, track):
        label = track.label
        if label is not None:
            self.id = label.id
            self.name = label.name

    ## Generate the JSON object of a album.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
        }
