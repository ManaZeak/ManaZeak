from django.contrib.auth.decorators import login_required

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.user.userLoader import UserLoader
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This class is used to interact with the users.
class UserService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the users of the application.
    def getAllUsers(request):
        # Getting the user
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
        # Checking the user request.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Loads the users from the database.
        users = UserLoader.loadAllUserFromOrm()
        return {
            'USERS': [user.generateJson() for user in users]
        }
