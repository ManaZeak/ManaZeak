from django.utils.html import strip_tags

from app.models import FileType, Genre, Album, Artist, Permissions, Groups, UserPreferences, Playlist, TransactionType


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
def errorCheckMessage(isDone, error):
    errorTitle = ""
    errorMessage = ""

    if error is None:
        errorTitle = "null"
        errorMessage = "null"

    elif error == "badFormat":
        errorTitle = "Wrong format"
        errorMessage = "The server didn't understood what you said."

    elif error == "badRequest":
        errorTitle = "Bad request"
        errorMessage = "The server didn't expected this request."

    elif error == "dbError":
        errorTitle = "Database error"
        errorMessage = "Something went wrong with the database."

    elif error == "fileNotFound":
        errorTitle = "No such file"
        errorMessage = "The server didn't find the file you asked."

    elif error == "dirNotFound":
        errorTitle = "No such directory"
        errorMessage = "The server didn't find the directory you asked."

    elif error == "emptyLibrary":
        errorTitle = "The library is empty"
        errorMessage = "There is no file to add in the library"

    elif error == "coverError":
        errorTitle = "Can't create file"
        errorMessage = "The server cannot generate the file for the covers, check the permissions."

    elif error == "permissionError":
        errorTitle = "Not permitted"
        errorMessage = "You are not allowed to do this."

    elif error == "rescanError":
        errorTitle = "Library isn't ready"
        errorMessage = "Another scan is running in background, be a little more patient"

    elif error == "noHistory":
        errorTitle = "Your history is empty"
        errorMessage = "Can't go backward if you never played any song!"

    elif error == "noSameArtist":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track by the same artist"

    elif error == "noSameGenre":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same genre"

    elif error == "noSameAlbum":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same album"

    elif error == "syncthingError":
        errorTitle = "Fail to communicate with syncthing"
        errorMessage = "Check if syncthing is running correctly"

    elif error == "userDeleteError":
        errorTitle = "Can't delete this user"
        errorMessage = "You can't delete your own account if you are admin"

    elif error == "noStats":
        errorTitle = "Can't display stats"
        errorMessage = "Use the application for generating stats"

    elif error == "badFileName":
        errorTitle = "The filename is invalid"
        errorMessage = "Change the filename if you want to upload it"

    elif error == "fileExists":
        errorTitle = "File already exists"
        errorMessage = "The file you want to upload exists already"

    elif error == "valueError":
        errorTitle = "Wrong value"
        errorMessage = "The value wasn't expected"

    elif error == "dNdError":
        errorTitle = "The drag and drop hasn't been setup"
        errorMessage = "The administrator didn't configured correctly the buffer folder"

    elif error == "formatError":
        errorTitle = "The format provided doesn't have support"
        errorMessage = "We don't supports this extension"

    elif error == "downloadLimit":
        errorTitle = "You maximum download limit reached"
        errorMessage = "Select less tracks and try again"

    elif error == "dirCreationError":
        errorTitle = "Can't create a folder"
        errorMessage = "The application can't create a folder contact the administrator"

    return {
        'DONE': isDone,
        'ERROR_H1': "" + errorTitle + "",
        'ERROR_MSG': "" + errorMessage + "",
    }


def checkPermission(requirements, user):
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
        TransactionType(name="Listening", code="PLAY", coinGain=100, coinLoss=0, streakGain=0, streakLoss=0, bubbles=False).save()
        TransactionType(name="Edit tag", code="TAGE", coinGain=100, coinLoss=300, streakGain=2, streakLoss=10, bubbles=True).save()
        TransactionType(name="Upload", code="UPLD", coinGain=300, coinLoss=100, streakGain=5, streakLoss=6 , bubbles=True).save()
        TransactionType(name="Wish", code="WISH", coinGain=50, coinLoss=20, streakGain=1, streakLoss=10, bubbles=True).save()
        TransactionType(name="Gift", code="GIFT", coinGain=1, coinLoss=0, streakGain=0, streakLoss=0, bubbles=False).save()

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
