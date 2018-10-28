import hashlib

from app.models.security import InviteCode


## @package app.security.inviteCodeManager
# This package is used for managing the invite code of the users

## Generate a new invite code for the new user and update the godfather invite code
#   @param newUser the user that has been created
#   @param godfatherUser the user that has invited the new user
def generateInviteCode(newUser, godfatherInviteCode):
    # Creating the invite code for the new user
    _createUserInviteCode(newUser)
    # Updating the godfather invite code to be used and creates another one
    _updateInviteCode(godfatherInviteCode)


## Get the object invite code of the database from a string invite code
#   @return the invite code object
def getInviteCodeByCode(code):
    if InviteCode.objects.filter(code=code, used=False).count() != 1:
        return None
    return InviteCode.objects.get(code=code, used=False)


## Create a new invite code and invalidate the used one
def _updateInviteCode(godfatherInviteCode):
    # Invalidating the old invite code
    godfatherInviteCode.used = True
    godfatherInviteCode.save()
    user = godfatherInviteCode.user

    # Creating the new invite code
    newInviteCode = InviteCode()
    newInviteCode.user = user
    newInviteCode.code = _generateCode(user, godfatherInviteCode.code)
    newInviteCode.save()


## Create the user invite code for inviting other users.
#   @param user to be associated with the invite code
def _createUserInviteCode(user):
    inviteCode = InviteCode()
    inviteCode.user = user
    inviteCode.code = _generateCode(user)
    inviteCode.save()


## Generate an code for an invite
#   @return a code in md5
def _generateCode(user, oldCode=''):
    return hashlib.md5(
        str(user.id).encode("ascii", "ignore") +
        str(user.username).encode("ascii", "ignore") +
        str(user.date_joined).encode("ascii", "ignore") +
        oldCode.encode("ascii", "ignore")
    ).hexdigest().upper()
