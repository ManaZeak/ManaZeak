from django.core.management import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):
        with open("/Manazeak/Output.txt", "a") as text_file:
            text_file.write('scopare el cron')
