import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.models import Wish
from app.utils import errorCheckMessage, checkPermission


# Create a wish in the database
from app.wallet import rewardWish


@login_required(redirect_field_name='login.html', login_url='app:login')
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
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Get all wishes or get only those of the user
@login_required(redirect_field_name='login.html', login_url='app:login')
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

                data = {**dict({'RESULT': data}), **errorCheckMessage(True, None)}
            else:
                data = errorCheckMessage(False, "badFormat")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)


# Change a wish status
@login_required(redirect_field_name='login.html', login_url='app:login')
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
                        return JsonResponse(errorCheckMessage(False, "valueError"))

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
                            data = errorCheckMessage(True, None)
                            # TODO : Add notification logging for user
                        else:
                            data = errorCheckMessage(False, "valueError")
                    else:
                        data = errorCheckMessage(False, "valueError")
                else:
                    data = errorCheckMessage(False, "dbError")
            else:
                data = errorCheckMessage(False, "badRequest")
        else:
            data = errorCheckMessage(False, "permissionError")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
