from django.contrib.auth.models import User
from django.core.management import BaseCommand

from app.achievement import checkAchievement
from app.models import Wish


class Command(BaseCommand):

    def handle(self, *args, **options):
        for user in User.objects.all():
            checkAchievement(user)
