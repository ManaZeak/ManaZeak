import hashlib
import math
import os
import re
from pathlib import Path

from django.utils.html import strip_tags
from mutagen.flac import FLAC
from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3, BitrateMode

from app.models import FileType
from app.src.services.track.localTrack import LocalTrack, LocalArtist


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
        track.artistFolderName = self._extractNameArtistFolder(trackPath)
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
            genres = strip_tags(audioTag['TCON'].text[0]).rstrip().split(',')
            track.genres = genres

        # --- Adding artist to structure ---
        if 'TPE1' in audioTag:  # Check if artist exists
            artists = strip_tags(audioTag['TPE1'].text[0])
            track.artists = self._getLocalArtistsFromTrack(artists)

        # Extracting composers
        if 'TCOM' in audioTag and audioTag['TCOM'].text[0] != "":
            composers = strip_tags(audioTag['TCOM'].text[0])
            track.composers = self._getLocalArtistsFromTrack(composers)

        # Extracting performers
        if 'TOPE' in audioTag and audioTag['TOPE'].text[0] != "":
            performers = strip_tags(audioTag['TOPE'].text[0])
            track.performers = self._getLocalArtistsFromTrack(performers)

        # --- Adding album to structure ---
        if 'TALB' in audioTag:
            albumTitle = strip_tags(audioTag['TALB'].text[0]).rstrip()
            track.album = albumTitle.replace('\n', '')

        return track

    ## Extract the metadata contained in a flac file
    def extractFlacFile(self, trackPath):
        track = LocalTrack()

        audioTag = FLAC(trackPath)

        # --- FILE INFORMATION ---
        track.location = trackPath
        track.artistFolderName = self._extractNameArtistFolder(trackPath)
        track.size = os.path.getsize(trackPath)
        track.bitRate = audioTag.info.bitrate
        track.duration = audioTag.info.length
        track.sampleRate = audioTag.info.sample_rate
        track.fileType = self.flacFormatId

        # Generating moodbar hash
        path = track.location.encode("ascii", "ignore")
        md5 = hashlib.md5(path).hexdigest()
        track.moodbar = "../static/mood/" + md5 + ".mood"

        # --- COVER ---
        self._extractCoverFromFlac(audioTag, track)

        if 'TITLE' in audioTag:
            trackTitle = self._trimVorbisTag(audioTag['TITLE'])
            if not trackTitle == "":
                track.title = trackTitle

        if 'DATE' in audioTag:
            trackDate = self._trimVorbisTag(audioTag['DATE'])
            if not trackDate == "":
                track.year = trackDate  # Date of Recording

        if 'TRACKNUMBER' in audioTag:
            trackNumber = self._trimVorbisTag(audioTag['TRACKNUMBER'])
            if not trackNumber == "":
                track.number = trackNumber

        if 'DISCNUMBER' in audioTag:
            discNumber = self._trimVorbisTag(audioTag['DISCNUMBER'])
            if not discNumber == "":
                try:
                    discNumber = int(discNumber)
                except ValueError:
                    discNumber = 0
                track.discNumber = discNumber

        if 'COMMENT' in audioTag:
            trackComment = self._trimVorbisTag(audioTag['COMMENT'])
            track.comment = trackComment

        if 'TOTALDISC' in audioTag:
            albumTotalDisc = self._trimVorbisTag(audioTag['TOTALDISC'])
            if not albumTotalDisc == "":
                track.totalDisc = albumTotalDisc

        if 'TOTALTRACK' in audioTag:
            track.totalTrack = self._trimVorbisTag(audioTag['TOTALTRACK'])

        if 'BPM' in audioTag:
            track.bpm = self._trimVorbisTag(audioTag['BPM'])

        if 'LYRICS' in audioTag:
            track.lyrics = self._trimVorbisTag(audioTag['LYRICS'])

        if 'COMPOSER' in audioTag:
            composers = self._trimVorbisTag(audioTag['COMPOSER'])
            if not composers == "":
                track.composers = self._getLocalArtistsFromTrack(composers)

        if 'PERFORMER' in audioTag:
            performers = self._trimVorbisTag(audioTag['PERFORMER'])
            if not performers == "":
                track.performers = self._getLocalArtistsFromTrack(performers)

        if 'GENRE' in audioTag:
            genres = self._trimVorbisTag(audioTag['GENRE']).rstrip().split(',')
            track.genres = genres

        if 'ARTIST' in audioTag:  # Check if artist exists
            artists = self._trimVorbisTag(audioTag['ARTIST'])
            track.artists = self._getLocalArtistsFromTrack(artists)

        if 'ALBUM' in audioTag:
            albumTitle = self._trimVorbisTag(audioTag['ALBUM'])
            track.album = albumTitle.replace('\n', '')

        return track

    ## Extract the cover from a mp3 file
    #   @param audioTag the mutagen object containing the metadata.
    #   @param track the local track object.
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

    ## Extract the cover from a flac file
    #   @param audioTag the mutagen object containing the metadata.
    #   @param track the local track object.
    def _extractCoverFromFlac(self, audioTag, track):
        # Getting the image
        picture = audioTag.pictures
        if len(picture) > 0:
            picture = picture[0].data
        pictureName = picture

        if len(picture) != 0:
            # Creating md5 hash for the cover
            md5Name = hashlib.md5()
            md5Name.update(pictureName)
            # Check if the cover already exists and save it
            if not os.path.isdir(self.coverPath):
                os.mkdir(self.coverPath)  # Create the folder
            if not os.path.isfile(self.coverPath + md5Name.hexdigest() + ".jpg"):
                with open(self.coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                    img.write(picture)
            track.coverLocation = md5Name.hexdigest() + ".jpg"

    @staticmethod
    ## Extract the artist folder name. Used later in the integration process.
    #   @param path the path of the track.
    #   @return the folder name of the artist.
    def _extractNameArtistFolder(path):
        path = Path(path)
        # If the path is long enough
        if len(path.parts) > 2:
            return path.parts[len(path.parts)-3]
        return ''

    @staticmethod
    ## Process a Vorbis tag to remove the useless info.
    #   @param tag the vorbis tag.
    #   @return the cleaned tag.
    def _trimVorbisTag(tag):
        tag = strip_tags(tag)
        tag = tag[2:]
        tag = tag[:-2]
        return tag

    @staticmethod
    ## Split a string containing multiple artist names without splitting the ',' in parentheses
    #   @param toSplit the string to split.
    #   @return the artists in a table.
    def _extractArtistsFromList(toSplit):
        # Splitting the string
        artists = re.split(r',\s*(?![^()]*\))', toSplit)
        # Cleaning it
        for i in range(len(artists)):
            artists[i] = artists[i].lstrip().rstrip()
        return artists

    @staticmethod
    ## Construct a table of local artists for a given string.
    #   @param tagString the tag string to transform into a table of local artists
    #   @return the list of the local artists
    def _getLocalArtistsFromTrack(tagString):
        localArtists = []
        splitArtists = TrackExtractorService._extractArtistsFromList(tagString)
        for artist in splitArtists:
            splitArtist = artist.split('(')
            artist = LocalArtist()
            artist.name = splitArtist[0].strip()
            # If the artist has a real name
            if len(splitArtist) > 1:
                # Removing the last ')'
                artist.realName = splitArtist[1].strip()[:-1]
        return localArtists
