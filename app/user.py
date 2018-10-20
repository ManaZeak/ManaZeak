from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.errors.errors import ErrorEnum, errorCheckMessage
from app.models import Playlist, UserPreferences, UserHistory, InviteCode

## @package app.user
#   This package manage the users.


@login_required(redirect_field_name='login.html', login_url='app:login')
## Function for deleting a user in the database
#   @param request a GET request send by the front. Delete the user sending the request.
#   @return a default json response with error or success
def deleteUser(request):
    if request.method == 'GET':
        user = request.user
        deleteLinkedEntities(user)
        user.delete()
        data = errorCheckMessage(True, None, deleteUser)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, deleteUser)
    return JsonResponse(data)


# Gives the information about a user
@login_required(redirect_field_name='login.html', login_url='app:login')
## Function for getting the user information
#   Send all the user information.
#   @param request a GET request from the front.
#   @return a json response containing a default response and the following information :
#   - the id of the user (USER_ID)
#   - the username of the user (USERNAME)
#   - if the user is an admin (IS_ADMIN)
#   - the name of the group of the user (GROUP_NAME)
#   - the invite code of the user (INVITE_CODE)
#   - the user avatar path (AVATAR_PATH)
#   - the user's godfather invite code (GODFATHER_CODE)
#   - the user's godfather username (GODFATHER_NAME)
#   - the list of the user permissions (PERMISSIONS)
def getUserInformation(request):
    if request.method == 'GET':
        user = request.user
        userPref = UserPreferences.objects.get(user=user)
        inviteCode = InviteCode.objects.get(user=user).code
        data = {
            'USER_ID': user.id,
            'USERNAME': user.username,
            'IS_ADMIN': user.is_superuser,
            'GROUP_NAME': userPref.group.name,
            'GROUP_ID': userPref.group.id,
            'INVITE_CODE': inviteCode,
            'AVATAR_PATH': userPref.avatar,
        }
        if userPref.inviteCode is not None:
            data = {**data, **{
                'GODFATHER_CODE': userPref.inviteCode.code,
                'GODFATHER_NAME': userPref.inviteCode.user.username,
            }}
        else:
            data = {**data, **{
                'GODFATHER_CODE': "Christ",
                'GODFATHER_NAME': "Jesus",
            }}
        permissions = []
        for permission in userPref.group.permissions.all():
            permissions.append(permission.code)
        data = {**data, **{'PERMISSIONS': permissions}}
        data = {**data, **errorCheckMessage(True, None, getUserInformation)}
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, getUserInformation)
    return JsonResponse(data)


## Delete the linked entities of the user.
#   The linked enties are :
#   - playlists
#   - preferences
#   - history
def deleteLinkedEntities(user):
    Playlist.objects.filter(user=user).delete()
    UserPreferences.objects.filter(user=user).delete()
    UserHistory.objects.filter(user=user).delete()

