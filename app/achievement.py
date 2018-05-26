from enum import Enum, unique

from django.db.models import Sum, Count

from app.models import Achievement, Stats, UserHistory, Playlist


# Iterate over all achiev and check if some of the are completed
from app.wallet import rewardAchievement


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


def checkLeet(user):
    sumCounter = Stats.objects.filter(user=user).aggregate(Sum('playCounter'))
    if 'playCounter__sum' in sumCounter:
        if sumCounter['playCounter__sum'] is not None:
            return sumCounter['playCounter__sum'] > 1337
    return False


def checkInstinctAchiev(user):
    userHistory = UserHistory.objects.get(user=user)
    histories = userHistory.histories.all().filter(track__bitRateMode__lt=320).count()
    return histories > 1


# TODO : check if this really works
def checkGuruAchiev(user):
    userPlaylist = Playlist.objects.filter(user=user).values('track__uploader', counter=Count('track'))
    for info in userPlaylist:
        if 'counter' in info:
            if info['counter'] > 10:
                return True
    return False


# Function for checking if the achievement in teh database is up to date
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
class AchievementEnum(Enum):
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
