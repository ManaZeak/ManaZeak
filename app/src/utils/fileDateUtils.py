import subprocess

import pytz
from django.utils.datetime_safe import datetime


## Utils for manipulating files dates.
class FileDateUtils(object):

    def __init__(self, lastScanDate):
        # Get the time zone of the date we are comparing to.
        self.timeZone = pytz.timezone("Europe/Paris")
        # Removing the time zone of the last date.
        self.lastScanDate = self.timeZone.normalize(lastScanDate)

    ## If the file was modified after the last scan.
    #   @param filePath the path of the file to check.
    def isFileModifiedAfterScan(self, filePath):
        fileDate = self._getModificationDate(filePath)
        # Comparing the date with the last scan date.
        return self.lastScanDate < fileDate

    ## If the file was created after the last scan.
    #   @param filePath the path of the file to check.
    def isFileCreatedAfterScan(self, filePath):
        fileDate = self._getChangeDate(filePath)
        # Comparing the date with the last scan date
        return self.lastScanDate < fileDate

    ## Get the change date of the file.
    #   @param filePath the path of the file to check.
    def _getChangeDate(self, filePath):
        # Launch the command line for getting the last modification date.
        command = subprocess.Popen(['stat', '-c %z', filePath], stdout=subprocess.PIPE)
        # Getting the output of the command.
        stdout, _ = command.communicate()
        return self._decodeCommandResult(stdout)

    ## Get the modification date of the file.
    #   @param filePath the path of the file to check.
    def _getModificationDate(self, filePath):
        # Launch the command line for getting the last modification date.
        command = subprocess.Popen(['stat', '-c %y', filePath], stdout=subprocess.PIPE)
        # Getting the output of the command.
        stdout, _ = command.communicate()
        return self._decodeCommandResult(stdout)

    ## Decode the result of the command to a date.
    #   @param stdout the output of the command line.
    def _decodeCommandResult(self, stdout):
        # Getting the date from the command line.
        stdout = stdout.decode('utf-8')[0:27]
        # Parsing the date.
        date = datetime.strptime(stdout, ' %Y-%m-%d %H:%M:%S.%f')
        return self.timeZone.localize(date)
