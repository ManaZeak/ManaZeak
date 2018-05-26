from django.contrib.auth.models import User
from django.core.management import BaseCommand

from app.models import Wish


class Command(BaseCommand):

    def handle(self, *args, **options):
        wish = Wish()
        wish.status = 1
        wish.text = "test cron"
        wish.user = User.objects.get(id=1)
        wish.save()
        return
