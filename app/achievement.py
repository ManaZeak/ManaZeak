from enum import Enum, unique

from django.db.models import Sum, Count

from app.models import Achievement, Stats, UserHistory, Playlist
from app.wallet import rewardAchievement

## @package app.achievements
#   This package is used for managing the achievements of the user.
#   Some function of this package are called by cron for checking the user achievement progression.


## Iterate over all achievements and check if some of the are completed by the user
#   @param user the user to check the achievement completion
def checkAchievement(user):
    # Getting only achievements the user didn't completed
    achievementNotCompleted = Achievement.objects.exclude(user=user)
    for achiev in achievementNotCompleted:
        if achiev.code == AchievementEnum.LEET.name:
            if checkLeet(user):
                rewardAchievement(user, achiev)

        elif achiev.code == AchievementEnum.INSTINCT:
            if checkInstinctAchiev(user):
                rewardAchievement(user, achiev)

        elif achiev.code == AchievementEnum.GURU:
            # if checkGuruAchiev(user):
            #   rewardAchievement(user, achiev)
            pass

        elif achiev.code == AchievementEnum.MIX:
            if Stats.objects.filter(user=user, track__duration=3600):
                rewardAchievement(user, achiev)

        elif achiev.code == AchievementEnum.BEST_OF:
            pass


## Check the leet achievement. (listen to 1337 tracks)
#   @param user the user to be checked.
def checkLeet(user):
    sumCounter = Stats.objects.filter(user=user).aggregate(Sum('playCounter'))
    if 'playCounter__sum' in sumCounter:
        if sumCounter['playCounter__sum'] is not None:
            return sumCounter['playCounter__sum'] > 1337
    return False


## Check the is instinct. (listen a song that is less than 320 kbps)
#   @param user the user to be checked.
def checkInstinctAchiev(user):
    userHistory = UserHistory.objects.get(user=user)
    histories = userHistory.histories.all().filter(track__bitRateMode__lt=320).count()
    return histories > 1


## Check the guru achievement. (listen to 10 tracks uploaded by the same user).
#   @param user the user to be checked.
def checkGuruAchiev(user):
    # TODO : check if this really works
    userPlaylist = Playlist.objects.filter(user=user).values('track__uploader', counter=Count('track'))
    for info in userPlaylist:
        if 'counter' in info:
            if info['counter'] > 10:
                return True
    return False


## Function for checking if the achievements in the database are up to date
def refreshAchievements():
    for achiev in AchievementEnum:
        if Achievement.objects.filter(code=achiev.name).count() == 1:
            dbAchiev = Achievement.objects.get(code=achiev.name)
        else:
            dbAchiev = Achievement()
        dbAchiev.code = achiev.name
        dbAchiev.reward = achiev.reward
        dbAchiev.isHidden = achiev.isHidden
        dbAchiev.save()


@unique
## Achievement enumeration contains all the achievements
class AchievementEnum(Enum):
    ## Constructor of the enum
    #   @param reward the number of coin reward to the user for the achievement
    #   @param isHidden if the description of teh achievement isHidden
    #   @param code the code of the achievement need for the enum entry to be unique
    def __init__(self, reward, isHidden, code):
        self.reward = reward
        self.isHidden = isHidden
        # This var is for avoiding an error
        self.code = code

    LEET = (100, False, 'LEET')
    INSTINCT = (10, False, 'INSTINCT')
    GURU = (10, False, 'GURU')
    MIX = (10, False, 'MIX')
    BEST_OF = (100, False, 'BEST_OF')
