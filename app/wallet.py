from app.models import UserHistory, UserPreferences, TransactionHistory, TransactionType


# Calculate the available cash
def calculateCurrentAvailableCash(wallet):
    return wallet.miningGain - wallet.miningLoss + wallet.globalGain - wallet.globalLoss


def checkListeningGain(track, user):
    userHistory = UserHistory.objects.get(user=user)
    userPref = UserPreferences.objects.get(user=user)
    if userHistory is not None:
        lastDate = userHistory.histories.last().date
#        if timezone.now() - lastDate >= timedelta(seconds=track.duration):
        if userPref is not None:
            userPref.totalListeningTime += track.duration
            if userPref.totalListeningTime/3600 > (userPref.totalListeningTime - track.duration)/3600:
                count = int(round((userPref.totalListeningTime/3600))) \
                        - int(round(((userPref.totalListeningTime - track.duration)/3600)))
                for _ in range(0, int(round(count))):
                    createTransaction("PLAY", user, True, 1)
            userPref.wallet.save()
            userPref.save()


def calculateStreak(user, transaction):
    userPref = UserPreferences.objects.get(user=user)
    print("zeaz", userPref.streak)
    if transaction.isGain:
        userPref.streak = transaction.transactionType.streakGain + userPref.streak
        print("lel1", userPref.streak)
        userPref.save()
        print("lel", userPref.streak)
    else:
        userPref.streak += transaction.transactionType.streakLoss
        userPref.save()


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
        print("win : ", (transaction.transactionType.coinGain * multiplier) * transaction.streak / 100)
        wallet.miningGain += int(round((transaction.transactionType.coinGain * multiplier) * transaction.streak / 100))
    else:
        if userPref.streak > 100:
            transaction.streak = 100
        else:
            transaction.streak = userPref.streak
        wallet.miningLoss += int(round((transaction.transactionType.coinLoss * multiplier) * transaction.streak / 100))
    transaction.save()
    wallet.save()
    calculateStreak(user, transaction)
