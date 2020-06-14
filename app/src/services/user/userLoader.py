from django.contrib.auth.models import User

from app.models import Permissions
from app.src.dto.permission.permissionDto import PermissionDto
from app.src.dto.user.userDto import UserDto


## Loads a user from the database.
class UserLoader(object):

    @staticmethod
    ## Loads all the users from the database.
    def loadAllUserFromOrm():
        users = User.objects.all()
        userList = []
        for user in users:
            userDto = UserDto()
            userDto.id = user.id
            userDto.name = user.username
            permissions = Permissions.objects.filter(group__usersetting__user_id=user.id).order_by('name').distinct()
            for permission in permissions:
                permissionDto = PermissionDto()
                permissionDto.name = permission.name
                permissionDto.code = permission.code
                userDto.permissions.append(permissionDto)
            userList.append(userDto)
        return userList
