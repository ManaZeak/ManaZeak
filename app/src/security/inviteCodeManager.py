import hashlib

from app.models.security import InviteCode


## This class is used for managing the invite code of the users
class InviteCodeManager:

    @staticmethod
    ## Get the object invite code of the database from a string invite code
    #   @return the invite code object
    def getInviteCodeByCode(code):
        if InviteCode.objects.filter(code=code, used=False).count() != 1:
            return None
        return InviteCode.objects.get(code=code, used=False)

    ## Generate a new invite code for the new user and update the godfather invite code
    #   @param newUser the user that has been created
    #   @param godfatherUser the user that has invited the new user
    def generateInviteCode(self, newUser, godfatherInviteCode):
        # Creating the invite code for the new user
        inviteCode = self._createUserInviteCode(newUser)
        # If the invite code mode is not enabled there is no godfather
        if godfatherInviteCode is not None:
            # Updating the godfather invite code to be used and creates another one
            self._updateInviteCode(godfatherInviteCode)
        return inviteCode

    ## Create a new invite code and invalidate the used one
    #   @param godfatherInviteCode the invite code object of the god father
    def _updateInviteCode(self, godfatherInviteCode):
        # Invalidating the old invite code
        godfatherInviteCode.used = True
        godfatherInviteCode.save()
        user = godfatherInviteCode.user

        # Creating the new invite code
        newInviteCode = InviteCode()
        newInviteCode.user = user
        newInviteCode.code = self._generateCode(user, godfatherInviteCode.code)
        newInviteCode.save()

    ## Create the user invite code for inviting other users.
    #   @param user to be associated with the invite code
    def _createUserInviteCode(self, user):
        inviteCode = InviteCode()
        inviteCode.user = user
        inviteCode.code = self._generateCode(user)
        inviteCode.save()
        return inviteCode

    ## Generate an code for an invite
    #   @return a code in md5
    @staticmethod
    def _generateCode(user, oldCode=''):
        return hashlib.md5(
            str(user.id).encode("ascii", "ignore") +
            str(user.username).encode("ascii", "ignore") +
            str(user.date_joined).encode("ascii", "ignore") +
            oldCode.encode("ascii", "ignore")
        ).hexdigest().upper()
