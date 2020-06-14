from app.src.dto.abstractDto import AbstractDto


class SuggestionDto(AbstractDto):

    def __init__(self):
        self.id = None
        self.status = None
        self.type = None
        self.text = None
        self.creationDate = None
        self.user = None

    def generateJson(self):
        return {
            'ID': self.id,
            'TEXT': self.text,
            'CREATION_DATE': self.creationDate,
            'STATUS': {
                'ID': self.status.id,
                'LABEL': self.status.label,
            },
            'TYPE': {
                'ID': self.type.id,
                'LABEL': self.type.label,
            },
            'USER': {
                'ID': self.user.id,
                'NAME': self.user.username,
            },
        }
