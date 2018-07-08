from datetime import timedelta
from django.utils import timezone

from app.consts import BUBBLE_PERCENTAGE
from app.models import UserHistory, UserPreferences, TransactionHistory, TransactionType

## @package app.wallet
#   This package is used for managing all the manacoin operations.
#   This package can create transactions need for giving or removing coin to the users. \n
#   Any movement of manacoin must be handled by this package


## Calculate the available cash for a user
#   @param wallet the wallet object of a user
#   @return the available cash for a user
def calculateCurrentAvailableCash(wallet):
    return wallet.miningGain - wallet.miningLoss + wallet.globalGain - wallet.globalLoss


## Check if the user must be rewarded for listening an hour of sound
#   @param track a track object
#   @param user the user logged in
def checkListeningGain(track, user):
    userHistory = UserHistory.objects.get(user=user)
    userPref = UserPreferences.objects.get(user=user)
    if userHistory is not None:
        lastDate = userHistory.histories.last().date
        if timezone.now() - lastDate >= timedelta(seconds=track.duration):
            if userPref is not None:
                userPref.totalListeningTime += track.duration
                if userPref.totalListeningTime / 3600 > (userPref.totalListeningTime - track.duration) / 3600:
                    count = int(round((userPref.totalListeningTime / 3600))) \
                            - int(round(((userPref.totalListeningTime - track.duration) / 3600)))
                    userPref.save()
                    for _ in range(0, int(round(count))):
                        createTransaction("PLAY", user, True, 1)


## Create the transaction for a wish
#   @param user user that created the wish
#   @param isGain boolean for knowing if we have to give mana
def rewardWish(user, isGain):
    createTransaction("WISH", user, isGain, 1)


## Calculate the streak of win or loss of a user
#   @param user the user
#   @param transaction the information about a transaction
def calculateStreak(user, transaction):
    userPref = UserPreferences.objects.get(user=user)
    if transaction.isGain:
        userPref.streak = transaction.transactionType.streakGain + userPref.streak
        userPref.save()
    else:
        userPref.streak += transaction.transactionType.streakLoss
        userPref.save()


## Giving a percentage of manacoin to the user's godfather
#   @param amount the total amount of manacoin of the transaction
#   @param isGain boolean for knowing if it adds or remove coins
#   @param user the user that generated the manacoin
def bubbleTransaction(amount, isGain, user):
    if user is not None:
        userPref = UserPreferences.objects.get(user=user)
        if userPref is not None:
            user = userPref.user
            amount = int(round(amount / BUBBLE_PERCENTAGE))
            if amount >= 1:
                createBubbleTransaction(isGain, user, amount)
                if userPref.inviteCode is not None:
                    bubbleTransaction(amount, isGain, userPref.inviteCode.user)


## Save a bubble transaction into the database
#   @param isGain boolean for know if it adds or remove manacoin
#   @param amount the amount of manacoin to give to the user
#   @param user the user that receive the manacoin
def createBubbleTransaction(isGain, user, amount):
    userPref = UserPreferences.objects.get(user=user)
    wallet = userPref.wallet
    transaction = TransactionHistory()
    transaction.transactionType = TransactionType.objects.get(code="BUBL")
    transaction.isGain = isGain
    transaction.user = user
    transaction.baseMultiplier = 1
    if isGain:
        wallet.miningGain += amount
    else:
        wallet.miningLoss += amount
    transaction.save()
    wallet.save()


## Create a manacoin transaction of any type into the database
#   @param code the string code of the transaction
#   @param user the user of the transaction
#   @param isGain boolean for knowing if it adds or remove manacoin
#   @param multiplier the number to ponderate the gain or loss
def createTransaction(code, user, isGain, multiplier):
    userPref = UserPreferences.objects.get(user=user)
    wallet = userPref.wallet
    transaction = TransactionHistory()
    transaction.transactionType = TransactionType.objects.get(code=code)
    transaction.isGain = isGain
    transaction.user = user
    transaction.baseMultiplier = multiplier
    if isGain:
        if userPref.streak < 100:
            transaction.streak = 100
        else:
            transaction.streak = userPref.streak
        amount = int(round((transaction.transactionType.coinGain * multiplier) * transaction.streak / 100))
        wallet.miningGain += amount
    else:
        if userPref.streak > 100:
            transaction.streak = 100
        else:
            transaction.streak = userPref.streak
        amount = int(round((transaction.transactionType.coinLoss * multiplier) * transaction.streak / 100))
        wallet.miningLoss += amount
    transaction.save()
    wallet.save()
    if transaction.transactionType.bubbles:
        if userPref.inviteCode is not None:
            if userPref.inviteCode.user is not None:
                bubbleTransaction(amount, isGain, userPref.inviteCode.user)
    calculateStreak(user, transaction)


## Give manacoin to a user if he has completed an achievement
#   @param user the user that has completed the achievement
#   @param achievement the achievement completed by the user
def rewardAchievement(user, achievement):
    achievement.user.add(user)
    userPref = UserPreferences.objects.get(user=user)
    wallet = userPref.wallet
    wallet.globalGain += achievement.reward
