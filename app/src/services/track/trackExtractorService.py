import hashlib
import math
import os
import re

from django.utils.html import strip_tags
from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3, BitrateMode

from app.models import FileType
from app.src.utils.localTrack import LocalTrack


## This class allows to extract teh metadata contained in a file and put it in a local track.
class TrackExtractorService(object):

    def __init__(self):
        self.mp3formatId = FileType.objects.get(name="mp3").id
        self.flacFormatId = FileType.objects.get(name="flac").id
        self.coverPath = "static/covers/"

    ## Extract the metadata contained in a mp3 file
    def extractMp3File(self, trackPath):
        track = LocalTrack()

        # --- FILE INFORMATION ---
        track.fileType = self.mp3formatId
        audioFile = MP3(trackPath)
        track.location = trackPath
        track.size = os.path.getsize(trackPath)
        track.bitRate = audioFile.info.bitrate
        track.duration = audioFile.info.length
        track.sampleRate = audioFile.info.sample_rate

        if audioFile.info.bitrate_mode == BitrateMode.UNKNOWN:
            track.bitRateMode = 0
        elif audioFile.info.bitrate_mode == BitrateMode.CBR:
            track.bitRateMode = 1
        elif audioFile.info.bitrate_mode == BitrateMode.VBR:
            track.bitRateMode = 2
        else:
            track.bitRateMode = 3

        # Generating moodbar hash
        path = track.location.encode("ascii", "ignore")
        md5 = hashlib.md5(path).hexdigest()
        track.moodbar = "../static/mood/" + md5 + ".mood"

        # Check if the file has a tag header
        try:
            audioTag = ID3(trackPath)
        except ID3NoHeaderError:
            audioTag = ID3()

        # --- COVER ---
        self._extractCoverFromMp3(audioTag, track)

        # Extracting title
        if 'TIT2' in audioTag and audioTag['TIT2'].text[0] != "":
            track.title = strip_tags(audioTag['TIT2'].text[0]).rstrip()

        # Extracting track year
        if 'TDRC' in audioTag and audioTag['TDRC'].text[0].get_text() != "":
            track.year = strip_tags(audioTag['TDRC'].text[0].get_text()[:4]).rstrip()  # Date of Recording

        # Extracting track number and total track
        if 'TRCK' in audioTag and audioTag['TRCK'].text[0] != "":
            if "/" in audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = strip_tags(audioTag['TRCK'].text[0]).rstrip().split('/')
                track.number = tags[0]
                track.totalTrack = tags[1]
            else:
                track.number = strip_tags(audioTag['TRCK'].text[0]).rstrip()

        # Extracting track bpm
        if 'TBPM' in audioTag and audioTag['TBPM'].text[0] != "":
                track.bpm = math.floor(float(strip_tags(audioTag['TBPM'].text[0]).rstrip()))

        # Extracting track comment
        if 'COMM' in audioTag and audioTag['COMM'].text != "":
                track.comment = strip_tags(audioTag['COMM'].text).rstrip()

        # Extracting track comment (other possible placement)
        elif 'COMM::XXX' in audioTag and audioTag['COMM::XXX'].text != "":
                track.comment = strip_tags(audioTag['COMM::XXX'].text[0]).rstrip()

        # Extracting track lyrics
        if 'USLT' in audioTag and audioTag['USLT'].text != "":
                track.lyrics = strip_tags(audioTag['USLT'].text).rstrip()

        # Extracting track lyrics (other possible placement)
        if 'USLT::XXX' in audioTag and audioTag['USLT::XXX'].text != "":
                track.lyrics = strip_tags(audioTag['USLT::XXX'].text).rstrip()

        # Extracting track total disc and lyrics (other possible placement)
        if len(audioTag.getall('TXXX')) != 0:
            for txxx in audioTag.getall('TXXX'):
                if txxx.desc == 'TOTALDISCS':
                    track.totalDisc = strip_tags(txxx.text[0]).rstrip()
                elif txxx.desc == 'USLT' or txxx.desc == 'USLT::XXX':
                    track.lyrics = strip_tags(txxx.text[0]).rstrip()

        # Extracting the disc number of the track
        if 'TPOS' in audioTag and audioTag['TPOS'].text[0] != "":
                discNumber = strip_tags(audioTag['TPOS'].text[0]).rstrip()
                try:
                    discNumber = int(discNumber)
                except ValueError:
                    discNumber = 0
                track.discNumber = discNumber

        # --- Adding genre to structure ---
        if 'TCON' in audioTag:
            genreName = strip_tags(audioTag['TCON'].text[0]).rstrip()
            track.genre = genreName

        # --- Adding artist to structure ---
        if 'TPE1' in audioTag:  # Check if artist exists
            artists = strip_tags(audioTag['TPE1'].text[0])
            track.artists = self._extractArtistsFromList(artists)

        # Extracting composers
        if 'TCOM' in audioTag and audioTag['TCOM'].text[0] != "":
            composers = strip_tags(audioTag['TCOM'].text[0])
            track.composer = self._extractArtistsFromList(composers)

        # Extracting performers
        if 'TOPE' in audioTag and audioTag['TOPE'].text[0] != "":
            performers = strip_tags(audioTag['TOPE'].text[0])
            track.performers = self._extractArtistsFromList(performers)

        # --- Adding album to structure ---
        if 'TALB' in audioTag:
            albumTitle = strip_tags(audioTag['TALB'].text[0]).rstrip()
            track.album = albumTitle.replace('\n', '')

        return track

    ## Extract the metadata contained in a flac file
    def extractFlacFile(self, trackPath):
        pass

    ## Extract the cover from a mp3 file
    def _extractCoverFromMp3(self, audioTag, track):
        if 'APIC:' in audioTag:
            front = audioTag['APIC:'].data
            # Creating md5 hash for the cover
            md5Name = hashlib.md5()
            md5Name.update(front)
            # Extracting cover type
            if audioTag['APIC:'].mime == "image/png":
                extension = ".png"
            else:
                extension = ".jpg"
            # Check if the cover already exists and save it
            if not os.path.isfile(self.coverPath + md5Name.hexdigest() + extension):
                with open(self.coverPath + md5Name.hexdigest() + extension, 'wb') as img:
                    img.write(front)
            track.coverLocation = md5Name.hexdigest() + extension

    @staticmethod
    ## Split a string containing multiple artist names without splitting the ',' in parentheses
    def _extractArtistsFromList(toSplit):
        # Splitting the string
        artists = re.split(r',\s*(?![^()]*\))', toSplit)
        # Cleaning it
        for i in range(len(artists)):
            artists[i] = artists[i].lstrip().rstrip()
        return artists
