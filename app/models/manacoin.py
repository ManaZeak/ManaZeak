from django.contrib.auth.models import User
from django.db import models


## This class describe the manacoin wallet of a user.
class Wallet(models.Model):
    ## The gain in manacoin the user has with mining.
    miningGain = models.IntegerField(default=0)
    ## The coin loss the user has.
    miningLoss = models.IntegerField(default=0)
    ## The gain the user has with mining + other gain (achievements).
    globalGain = models.IntegerField(default=0)
    ## The loss the user has with mining + other loss (buy hints).
    globalLoss = models.IntegerField(default=0)


## This class describe the transactions that are possibles.
class TransactionType(models.Model):
    ## The name of the transaction.
    name = models.CharField(max_length=100)
    ## The code of the transaction.
    code = models.CharField(max_length=5)
    ## The number of coin reward for this type of transaction.
    coinGain = models.IntegerField(default=0)
    ## The number of coin loss for this type of transaction.
    coinLoss = models.IntegerField(default=0)
    ## How much the streak is increased in case of success.
    streakGain = models.IntegerField(default=0)
    ## How much the streak is reduced in case of fail.
    streakLoss = models.IntegerField(default=0)
    ## If the transaction give money to the user's godfather.
    bubbles = models.BooleanField(default=False)


## This class is the history of all transaction in manazeak.
class TransactionHistory(models.Model):
    ## The type of transaction created.
    transactionType = models.ForeignKey(TransactionType)
    ## The streak of the user at this time.
    streak = models.FloatField(default=0)
    ## If it was a gain or a loss
    isGain = models.BooleanField(default=False)
    ## If a multiplier was applied to the transaction.
    baseMultiplier = models.FloatField(default=0)
    ## The user associated with the transacation.
    user = models.ForeignKey(User)


## This class define the achievements in the app.
class Achievement(models.Model):
    ## The reward given for the achievement
    reward = models.IntegerField()
    ## If the description of the achievement is hidden.
    isHidden = models.BooleanField(default=True)
    ## The code of the achievement
    code = models.CharField(max_length=10, unique=True)
    ## The user that posses the achievement.
    user = models.ManyToManyField(User)


## The class describes the wish system.
class Wish(models.Model):
    ## The user that created a wish.
    user = models.ForeignKey(User)
    ## The date when the wish has been created (the date is auto set)
    date = models.DateField(auto_now=True, null=True)
    ## The text body of the wish.
    text = models.CharField(max_length=1000)
    ## The status of the wish
    status = models.IntegerField()