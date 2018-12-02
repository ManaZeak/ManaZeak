from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from app.src.security.inviteCodeManager import InviteCodeManager
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.applicationConfigurationManager import ApplicationConfigurationManager
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


## This class handles the user signup.
from app.src.utils.userSettingsManager import UserSettingsManager


class UserSignupService:

    ## This method insert a user and all the linked objects into the database.
    def createUser(self, form):
        # Getting the form from the post request
        if not form.is_valid():
            return None
        # Checking if the invite code provided is correct
        inviteCodeUsed = self._checkInviteCode(form)
        # Saving the user into the database
        form.save()
        # Authenticating the user into the app and granting him super user right if its te first user to log in
        user = self._authenticatingAndAlteringUser(form)
        # Creating the user invite code and updating the godfather invite code
        inviteCodeManager = InviteCodeManager()
        inviteCode = inviteCodeManager.generateInviteCode(user, inviteCodeUsed)
        # Generating the user setting
        UserSettingsManager.createUserSettings(user, inviteCodeUsed, inviteCode)
        return user

    ## Authenticate and transform the user as a superuser if it's the first one.
    #   @param form the form given by the front.
    def _authenticatingAndAlteringUser(self, form):
        username = form.cleaned_data.get('username')
        rawPassword = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=rawPassword)
        user.is_superuser = self._checkIfFirstUser()
        user.save()
        return user

    @staticmethod
    ## Check if the provided invite code in the form is correct and if the user has permissions
    def _checkInviteCode(form):
        inviteCode = None
        # Checking if the application requires an invite code for creating an account
        if ApplicationConfigurationManager.getApplicationConfiguration().inviteCodeEnabled:
            inviteCode = form.data.get('godFather')
            # Getting the invite code
            inviteCode = InviteCodeManager.getInviteCodeByCode(inviteCode)
            # If no invite code has been found into the database throw an error
            if inviteCode is None:
                raise UserException(ErrorEnum.INVITE_CODE_NOT_FOUND)
            # Checking if the invite code given is linked to a user that can invite
            if not PermissionHandler.checkPermission(PermissionEnum.INVITE, inviteCode.user):
                raise UserException(ErrorEnum.PERMISSION_ERROR)
        return inviteCode

    @staticmethod
    ## Checking if the user is the first to create an account
    #   @return True if the user is the first one. False otherwise.
    def _checkIfFirstUser():
        return User.objects.all().count() == 1
