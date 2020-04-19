from django.urls import path

from app.src.services.admin.adminService import AdminService
from app.src.services.admin.adminTools import AdminTools
from app.src.services.config.configService import ConfigService
from app.src.services.thumbs.thumbnailService import ThumbnailService
from app.src.services.user.userService import UserService

app_name = 'app'

## The admin URLS.
urlpatterns = [
    path('reset/', AdminTools.resetInstance, name='reset'),
    path('toggleInvite/', AdminService.toggleInviteMode, name='toggleInvite'),

    path('regenerateThumbnails/', ThumbnailService.regeneratesAllThumbnailsAdmin, name='regenerateThumbs'),

    path('getAllUsers/', UserService.getAllUsers, name='getAllUsers'),
    # FIXME: to be moved into confs
    path('isInviteEnabled/', ConfigService.isInviteCodeEnabled, name='inviteEnabled'),
    # Page for logging the performance of the application.
]