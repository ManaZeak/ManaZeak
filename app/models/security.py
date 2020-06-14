from django.contrib.auth.models import User
from django.db import models


## This class is the permission of the application.
class Permissions(models.Model):
    ## The name of the permission.
    name = models.CharField(max_length=1000)
    ## The code name of the permission.
    code = models.CharField(max_length=4, db_index=True)


## This class define the groups inside the app.
class Group(models.Model):
    ## The name of the group.
    name = models.CharField(max_length=1000, default="Default")
    ## The rank of the group (for display purpose).
    rank = models.IntegerField(default=0)
    ## The permissions associated to the group.
    permissions = models.ManyToManyField(Permissions)


## This class describes the invite codes used to create an account.
class InviteCode(models.Model):
    ## The user associated with the code
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ## The invite code.
    code = models.CharField(max_length=33, unique=True)
    ## If the invite code has been used by a user or not
    used = models.BooleanField(default=False)
