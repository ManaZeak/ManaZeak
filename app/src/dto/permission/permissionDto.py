from app.src.dto.abstractDto import AbstractDto

## This class contains a permission.
class PermissionDto(AbstractDto):

    def __init__(self):
        self.code = None
        self.name = None

    def generateJson(self):
        return {
            'CODE': self.code,
            'NAME': self.name,
        }
