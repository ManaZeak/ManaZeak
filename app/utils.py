import logging
from crontab import CronTab
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.achievement import refreshAchievements, checkAchievement
from app.models import FileType, Genre, Album, Artist, Permissions, Groups, UserPreferences, Playlist, TransactionType


logger = logging.getLogger('django')


# Split a table in 4 table of equal size
def splitTable(table):
    if len(table) % 4 == 0:
        chunkSize = int(len(table) / 4)
    else:
        chunkSize = int(len(table) / 4) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]


# Split a table in x tables of equal size
def splitTableCustom(table, number):
    if len(table) % number == 0:
        chunkSize = int(len(table) / number)
    else:
        chunkSize = int(len(table) / number) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]


# Format for vorbis tags
def processVorbisTag(tag):
    tag = strip_tags(tag)
    tag = tag[2:]
    tag = tag[:-2]
    return tag


# Return a readable time code for a time code
def timeCodeToString(timestamp):
    return str(timestamp.day).zfill(2) + "/" + str(timestamp.month).zfill(2) + \
           "/" + str(timestamp.year) + " - " + str(timestamp.hour) + ":" + \
           str(timestamp.minute)


# Generate the base of any status message
# TODO: mettre caller a None
def errorCheckMessage(isDone, error, caller, user=None):
    errorTitle = ""
    errorMessage = ""

    if error is None:
        errorTitle = "null"
        errorMessage = "null"

    elif error == "badFormat":
        errorTitle = "Wrong format"
        errorMessage = "The server didn't understood what you said."
        if user is not None:
            logger.error("Invalid json send to the function " + caller.__name__ + " by the user " + user.username)
        else:
            logger.error("Invalid request from a unlogged user at " + caller.__name__)

    elif error == "badRequest":
        errorTitle = "Bad request"
        errorMessage = "The server didn't expected this request."
        logger.warning("Invalid request type for the function " + caller.__name__)

    elif error == "dbError":
        errorTitle = "Database error"
        errorMessage = "Something went wrong with the database."
        logger.error("A request returned an error in the function " + caller.__name__)

    elif error == "fileNotFound":
        errorTitle = "No such file"
        errorMessage = "The server didn't find the file you asked."
        logger.error("The file required wasn't found by the function " + caller.__name__)

    elif error == "dirNotFound":
        errorTitle = "No such directory"
        errorMessage = "The server didn't find the directory you asked."
        logger.warning("The directory the user asked didn't exists called by " + caller.__name__)

    elif error == "emptyLibrary":
        errorTitle = "The library is empty"
        errorMessage = "There is no file to add in the library"
        logger.warning("The directory scanned by the user was empty called by " + caller.__name__)

    elif error == "coverError":
        errorTitle = "Can't create file"
        errorMessage = "The server cannot generate the file for the covers, check the permissions."
        logger.error("The function " + caller.__name__ + " can't create the file for the cover")

    elif error == "permissionError":
        errorTitle = "Not permitted"
        errorMessage = "You are not allowed to do this."
        if user is not None:
            logger.warning("The user " + user.username + " tried to do something not allowed")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == "rescanError":
        errorTitle = "Library isn't ready"
        errorMessage = "Another scan is running in background, be a little more patient"
        logger.error("A rescan was already in progress called by " + caller.__name__)

    elif error == "noHistory":
        errorTitle = "Your history is empty"
        errorMessage = "Can't go backward if you never played any song!"
        if user is not None:
            logger.info("The user " + user.username + " has finished his history")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == "noSameArtist":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track by the same artist"
        logger.info("No same artist for the given track")

    elif error == "noSameGenre":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same genre"
        logger.info("No same genre for the given track")

    elif error == "noSameAlbum":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same album"
        logger.info("No same album for the given track")

    elif error == "syncthingError":
        errorTitle = "Fail to communicate with syncthing"
        errorMessage = "Check if syncthing is running correctly"
        logger.error("Syncthing couldn't be contacted")

    elif error == "userDeleteError":
        errorTitle = "Can't delete this user"
        errorMessage = "You can't delete your own account if you are admin"
        if user is not None:
            logger.critical("The user " + user.username + " tried to delete an admin user")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == "noStats":
        errorTitle = "Can't display stats"
        errorMessage = "Use the application for generating stats"
        logger.info("No stats were found")

    elif error == "badFileName":
        errorTitle = "The filename is invalid"
        errorMessage = "Change the filename if you want to upload it"
        logger.error("The filename specified was correct call by " + caller.__name__)

    elif error == "fileExists":
        errorTitle = "File already exists"
        errorMessage = "The file you want to upload exists already"
        if user is not None:
            logger.warning("The user " + user.username + " uploaded a song that already exists")
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == "valueError":
        errorTitle = "Wrong value"
        errorMessage = "The value wasn't expected"
        if user is not None:
            logger.critical("The user " + user.username + " put a wrong type of value in a field. Called at "
                            + caller.__name__)
        else:
            logger.error("The user parameter is missing for function " + caller.__name__)

    elif error == "dNdError":
        errorTitle = "The drag and drop hasn't been setup"
        errorMessage = "The administrator didn't configured correctly the buffer folder"
        logger.critical("The configuration is not done correctly")

    elif error == "formatError":
        errorTitle = "The format provided doesn't have support"
        errorMessage = "We don't supports this extension"
        logger.critical("The format of the given track has no support")

    elif error == "downloadLimit":
        errorTitle = "You maximum download limit reached"
        errorMessage = "Select less tracks and try again"
        logger.error("Too much track selected")

    elif error == "dirCreationError":
        errorTitle = "Can't create a folder"
        errorMessage = "The application can't create a folder contact the administrator"
        logger.error("The application can't create a folder for function " + caller.__name__)

    return {
        'DONE': isDone,
        'ERROR_H1': "" + errorTitle + "",
        'ERROR_MSG': "" + errorMessage + "",
    }


def checkPermission(requirements, user):
    checkAchievement(user)
    userPref = UserPreferences.objects.get(user=user)
    permissions = userPref.group.permissions
    if permissions.filter(code__in=requirements).count() == len(requirements):
        return True
    else:
        return False


# Asks to refresh of all views
def refreshAllViews():
    for playlist in Playlist.objects.all():
        if not playlist.refreshView:
            playlist.refreshView = True
            playlist.save()


# Create the default entries into the database
def populateDB():
    if FileType.objects.all().count() == 0:
        print("Created files types")
        FileType(name="mp3").save()
        FileType(name="ogg").save()
        FileType(name="flac").save()
        FileType(name="wav").save()
    if Artist.objects.all().count() == 0:
        print("Created default artist")
        Artist(name=None).save()
    if Album.objects.all().count() == 0:
        print("Created default album")
        Album(title=None).save()
    if Genre.objects.all().count() == 0:
        print("Created default genre")
        Genre(name=None).save()
    if Permissions.objects.all().count() == 0:
        print("Creating default permissions")
        Permissions(name="Login", code="LOGI").save()
        Permissions(name="Music listening", code="PLAY").save()
        Permissions(name="Playlist management", code="PLST").save()
        Permissions(name="Download", code="DOWN").save()
        Permissions(name="Wish creation", code="WISH").save()
        Permissions(name="Tag submission", code="TAGS").save()
        Permissions(name="Upload file", code='UPLD').save()
        Permissions(name="Sponsor right", code='SPON').save()
        Permissions(name="Stats access", code='STAT').save()
        Permissions(name="Child stats access", code="STCH").save()
        Permissions(name="Family stat access", code="STFA").save()
        Permissions(name="Wish review", code="WISR").save()
        Permissions(name="Access to library stats", code="STAL").save()
        Permissions(name="Change genre description", code="DESC").save()
        Permissions(name="Tag edition", code="TAGE").save()
        Permissions(name="Upload aproval", code="UPAP").save()
        Permissions(name="All stats", code="STAA").save()
        Permissions(name="Access to adminView", code="ADMV").save()
        Permissions(name="Edit user group", code="GRPE").save()
        Permissions(name="Access to whole family tree", code="FTAL").save()
        Permissions(name="Library management", code="LIBR").save()
        Permissions(name="Grant admin privileges", code="GAPR").save()
        Permissions(name="Coin gift", code="COIN").save()

    if TransactionType.objects.all().count() == 0:
        print("Creating default transaction types")
        TransactionType(name="Listening", code="PLAY", coinGain=100, coinLoss=0, streakGain=0, streakLoss=0,
                        bubbles=False).save()
        TransactionType(name="Edit tag", code="TAGE", coinGain=100, coinLoss=300, streakGain=2, streakLoss=10,
                        bubbles=True).save()
        TransactionType(name="Upload", code="UPLD", coinGain=300, coinLoss=100, streakGain=5, streakLoss=6,
                        bubbles=True).save()
        TransactionType(name="Wish", code="WISH", coinGain=50, coinLoss=20, streakGain=1, streakLoss=10,
                        bubbles=True).save()
        TransactionType(name="Gift", code="GIFT", coinGain=1, coinLoss=0, streakGain=0, streakLoss=0,
                        bubbles=False).save()
        TransactionType(name="Bubble", code="BUBL", coinGain=0, coinLoss=0, streakGain=0, streakLoss=0,
                        bubbles=False).save()

    if Groups.objects.all().count() == 0:
        Groups(name="Banned", rank=0).save()
        print("Creating the defaults groups")
        Groups(name="Naab", rank=1).save()
        Groups(name="User", rank=2).save()
        Groups(name="Moderator", rank=3).save()
        Groups(name="Admin", rank=4).save()
        Groups(name="Root", rank=5).save()
        for group in Groups.objects.all():
            fillDefaultPermission(group)

    print("zobare")
    # Creating and updating achivements
    setCronJobs()
    refreshAchievements()


def fillDefaultPermission(group):
    if group.rank > 0:
        group.permissions.add(Permissions.objects.get(code="LOGI"))
        group.permissions.add(Permissions.objects.get(code="PLAY"))
        group.permissions.add(Permissions.objects.get(code="PLST"))
        group.permissions.add(Permissions.objects.get(code="DOWN"))
    if group.rank > 1:
        group.permissions.add(Permissions.objects.get(code="WISH"))
        group.permissions.add(Permissions.objects.get(code="TAGS"))
        group.permissions.add(Permissions.objects.get(code="UPLD"))
        group.permissions.add(Permissions.objects.get(code="SPON"))
        group.permissions.add(Permissions.objects.get(code="STAT"))
    if group.rank > 2:
        group.permissions.add(Permissions.objects.get(code="STCH"))
        group.permissions.add(Permissions.objects.get(code="STFA"))
        group.permissions.add(Permissions.objects.get(code="WISR"))
        group.permissions.add(Permissions.objects.get(code="STAL"))
    if group.rank > 3:
        group.permissions.add(Permissions.objects.get(code="DESC"))
        group.permissions.add(Permissions.objects.get(code="TAGE"))
        group.permissions.add(Permissions.objects.get(code="UPAP"))
        group.permissions.add(Permissions.objects.get(code="STAA"))
        group.permissions.add(Permissions.objects.get(code="ADMV"))
        group.permissions.add(Permissions.objects.get(code="GRPE"))
        group.permissions.add(Permissions.objects.get(code="FTAL"))
        group.permissions.add(Permissions.objects.get(code="LIBR"))
    if group.rank > 4:
        group.permissions.add(Permissions.objects.get(code="GAPR"))
        group.permissions.add(Permissions.objects.get(code="COIN"))


def setCronJobs():
    cron = CronTab("root")
    # Checking the job already present
    if checkIfCronJobExists('rescan', cron):
        job = cron.new(command='python /ManaZeak/manage.py rescan', comment='rescan')
        job.hours.on(4)
        job.dow.on('MON')
        cron.write()


@login_required(redirect_field_name='login.html', login_url='app:login')
def refreshCrontab(request):
    if request.method == 'GET':
        user = request.user
        if checkPermission(['LIBR'], user):
            cron = CronTab("root")
            for job in cron:
                cron.remove(job)
            setCronJobs()
            data = errorCheckMessage(True, None, refreshCrontab)
        else:
            data = errorCheckMessage(False, "permissionError", refreshCrontab, user)
    else:
        data = errorCheckMessage(False, "badRequest0")
    return JsonResponse(data)


def checkIfCronJobExists(comment, cron):
    i = 0
    for _ in cron.find_comment(comment):
        i += 1
    return i == 0
