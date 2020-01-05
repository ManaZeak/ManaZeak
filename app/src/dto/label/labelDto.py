## Stores a label to be display into the UI.
class LabelDto(object):

    def __init__(self):
        self.id = None
        self.name = ''
        self.artists = []

    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
            'ARTISTS': [artist.generateJson() for artist in self.artists],
        }
