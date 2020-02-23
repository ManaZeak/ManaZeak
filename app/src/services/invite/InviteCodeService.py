from django.contrib.auth.decorators import login_required

from app.src.security.inviteCodeManager import InviteCodeManager
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators.frontRequest import FrontRequest


## The service for invite codes.
class InviteCodeService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getInviteCode(request):
        # Getting the user
        user = request.user
        # Checking the permission
        PermissionHandler.checkPermission(PermissionEnum.INVITE, user)
        # Getting the invite code
        inviteCode = InviteCodeManager.getInviteCodeForUser(user)
        return {
            'INVITE_CODE': inviteCode.code
        }
