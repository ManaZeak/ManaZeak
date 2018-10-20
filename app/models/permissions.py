from django.db import models


## This class is the permission of the application.
class Permissions(models.Model):
    ## The name of the permission.
    name = models.CharField(max_length=1000)
    ## The code name of the permission.
    code = models.CharField(max_length=4)


## This class define the groups inside the app.
class Groups(models.Model):
    ## The name of the group.
    name = models.CharField(max_length=1000, default="Default")
    ## The rank of the group (for display purpose).
    rank = models.IntegerField(default=0)
    ## The permissions associated to the group.
    permissions = models.ManyToManyField(Permissions)
