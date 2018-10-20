import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.errors.errors import ErrorEnum, errorCheckMessage
from app.models import Wish
from app.utils import checkPermission
from app.wallet import rewardWish

## @package app.wish
#   This package is used for operations about wishes.
#   Wishes are messages to the administrator created by the user the main purpose is to suggest songs.


@login_required(redirect_field_name='login.html', login_url='app:login')
## Create a wish in the database
#   @param request POST request from the front must contains tag:
#   - WISH with the wish message inside
#   @return the status of the request
def createWish(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if checkPermission(["WISH"], user):
            if 'WISH' in response:
                wish = Wish()
                wish.user = user
                wish.text = strip_tags(str(response['WISH']))
                wish.status = 0  # Not done; 1 Refused; 2 Accepted; 3 Read
                wish.save()
                data = errorCheckMessage(True, None, createWish)
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, createWish)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, createWish, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, createWish)
    return JsonResponse(data)


@login_required(redirect_field_name='login.html', login_url='app:login')
## Get all wishes or get only those of the user
#   @param request POST request from the front containing the tag ALL:
#       - true to get all wishes
#       - false to get only the user wishes
#   @return a wish object list in json
def getWishes(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["WISH"], user):
            if 'ALL' in response:
                allWishes = bool(strip_tags(response['ALL']))

                if checkPermission(["WISR"], user) and allWishes:
                    wishes = Wish.objects.all().order_by('-id')
                else:
                    wishes = Wish.objects.filter(user=user).order_by('-id')

                data = []
                for wish in wishes:
                    data.append({
                        'WISH_ID': wish.id,
                        'DATE': wish.date,
                        'TEXT': wish.text,
                        'USERNAME': wish.user.username,
                        'STATUS': wish.status,
                    })

                data = {**dict({'RESULT': data}), **errorCheckMessage(True, None, getWishes)}
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, getWishes, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, getWishes, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, getWishes)
    return JsonResponse(data)


@login_required(redirect_field_name='login.html', login_url='app:login')
## Change a wish status
#   @param request POST request from front contains key:
#   - WISH_ID : the id of the wish
#   - STATUS : the status of the wish
#   @return The status of the request
def setWishStatus(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        user = request.user
        if checkPermission(["WISR"], user):
            if 'WISH_ID' in response and 'STATUS' in response:
                wishId = response['WISH_ID']
                if Wish.objects.filter(id=wishId).count() == 1:
                    wish = Wish.objects.get(id=wishId)
                    status = strip_tags(response['STATUS'])
                    try:
                        status = int(status)
                    except ValueError:
                        return JsonResponse(errorCheckMessage(False, ErrorEnum.VALUE_ERROR, setWishStatus, user))

                    # Wishes' status can be changed only if they are "not read"
                    if wish.status == 0:
                        # Ignoring wishes that are stying in the status "not read"
                        if status in range(1, 4):
                            # Preventing admin to give himself points for wishes
                            if wish.user != user:
                                # Wish is refused
                                if status == 1:
                                    rewardWish(wish.user, False)
                                # Wish is accepted
                                elif status == 2:
                                    rewardWish(wish.user, True)

                            wish.status = status
                            wish.save()
                            data = errorCheckMessage(True, None, setWishStatus)
                        else:
                            data = errorCheckMessage(False, ErrorEnum.VALUE_ERROR, setWishStatus, user)
                    else:
                        data = errorCheckMessage(False, ErrorEnum.VALUE_ERROR, setWishStatus, user)
                else:
                    data = errorCheckMessage(False, ErrorEnum.DB_ERROR, setWishStatus)
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, setWishStatus, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, setWishStatus, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, setWishStatus)
    return JsonResponse(data)
