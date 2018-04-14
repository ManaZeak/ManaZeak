from datetime import timedelta
from time import timezone


from app.consts import BUBBLE_PERCENTAGE
from app.models import UserHistory, UserPreferences, TransactionHistory, TransactionType


# Calculate the available cash
def calculateCurrentAvailableCash(wallet):
    return wallet.miningGain - wallet.miningLoss + wallet.globalGain - wallet.globalLoss


def checkListeningGain(track, user):
    userHistory = UserHistory.objects.get(user=user)
    userPref = UserPreferences.objects.get(user=user)
    if userHistory is not None:
        lastDate = userHistory.histories.last().date
        if timezone.now() - lastDate >= timedelta(seconds=track.duration):
            if userPref is not None:
                userPref.totalListeningTime += track.duration
                if userPref.totalListeningTime/3600 > (userPref.totalListeningTime - track.duration)/3600:
                    count = int(round((userPref.totalListeningTime/3600))) \
                            - int(round(((userPref.totalListeningTime - track.duration)/3600)))
                    userPref.save()
                    for _ in range(0, int(round(count))):
                        createTransaction("PLAY", user, True, 1)


def calculateStreak(user, transaction):
    userPref = UserPreferences.objects.get(user=user)
    if transaction.isGain:
        userPref.streak = transaction.transactionType.streakGain + userPref.streak
        userPref.save()
    else:
        userPref.streak += transaction.transactionType.streakLoss
        userPref.save()


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
