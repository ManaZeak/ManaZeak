import logging

from django.contrib.auth.models import User
from django.core.management import BaseCommand

from app.achievement import checkAchievement


logger = logging.getLogger('django')


class Command(BaseCommand):

    def handle(self, *args, **options):
        logger.info("Checking achievement for the users")
        for user in User.objects.all():
            checkAchievement(user)
