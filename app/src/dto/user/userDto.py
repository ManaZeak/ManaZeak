from app.src.dto.abstractDto import AbstractDto

## Contains the information about a user.
class UserDto(AbstractDto):

    def __init__(self):
        self.id = None
        self.name = None
        self.permissions = []

    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
            'PERMISSIONS': [perm.generateJson() for perm in self.permissions],
        }