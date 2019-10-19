import hashlib
import math
import os

from django.utils.html import strip_tags

from app.src.services.track.trackExtractorHelper import TrackExtractorHelper
from app.src.utils.tagExtractor.abstractTagExtractor import AbstractTagExtractor


## Extract a mp3 track.
class Mp3TagExtractor(AbstractTagExtractor):

    def __init__(self, track, audioTag):
        self.track = track
        self.audioTag = audioTag

    def extractCover(self, coverPath):
        # If the tracks doesn't have a cover, skip this tag.
        if 'APIC:' not in self.audioTag:
            return
        front = self.audioTag['APIC:'].data
        # Creating md5 hash for the cover
        md5Name = hashlib.md5()
        md5Name.update(front)
        # Extracting cover type
        if self.audioTag['APIC:'].mime == "image/png":
            extension = ".png"
        else:
            extension = ".jpg"
        # Check if the cover already exists and save it
        if not os.path.isfile(coverPath + md5Name.hexdigest() + extension):
            with open(coverPath + md5Name.hexdigest() + extension, 'wb') as img:
                img.write(front)
        self.track.coverLocation = md5Name.hexdigest() + extension

    def extractTitle(self):
        if 'TIT2' in self.audioTag and self.audioTag['TIT2'].text[0] != "":
            self.track.title = strip_tags(self.audioTag['TIT2'].text[0]).rstrip()

    def extractYear(self):
        if 'TDRC' in self.audioTag and self.audioTag['TDRC'].text[0].get_text() != "":
            self.track.year = strip_tags(self.audioTag['TDRC'].text[0].get_text()[:4]).rstrip()  # Date of Recording
            self.track.album.year = self.track.year

    def extractTrackNumber(self):
        if 'TRCK' in self.audioTag and self.audioTag['TRCK'].text[0] != "":
            if "/" in self.audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = strip_tags(self.audioTag['TRCK'].text[0]).rstrip().split('/')
                self.track.number = tags[0]
                self.track.trackTotal = tags[1]
            else:
                self.track.number = strip_tags(self.audioTag['TRCK'].text[0]).rstrip()

    def extractBpm(self):
        if 'TBPM' in self.audioTag and self.audioTag['TBPM'].text[0] != "":
            self.track.bpm = math.floor(float(strip_tags(self.audioTag['TBPM'].text[0]).rstrip()))

    def extractComment(self):
        if 'COMM' in self.audioTag and self.audioTag['COMM'].text != "":
            self.track.comment = strip_tags(self.audioTag['COMM'].text).rstrip()
        elif 'COMM::XXX' in self.audioTag and self.audioTag['COMM::XXX'].text != "":
            self.track.comment = strip_tags(self.audioTag['COMM::XXX'].text[0]).rstrip()

    def extractLyrics(self):
        if 'USLT' in self.audioTag and self.audioTag['USLT'].text != "":
            self.track.lyrics = strip_tags(self.audioTag['USLT'].text).rstrip()
        elif 'USLT::XXX' in self.audioTag and self.audioTag['USLT::XXX'].text != "":
            self.track.lyrics = strip_tags(self.audioTag['USLT::XXX'].text).rstrip()

    def extractDiscNumber(self):
        if 'TPOS' in self.audioTag and self.audioTag['TPOS'].text[0] != "":
            discNumber = strip_tags(self.audioTag['TPOS'].text[0]).rstrip()
            try:
                discNumber = int(discNumber)
            except ValueError:
                discNumber = 0
            self.track.discNumber = discNumber

    def extractGenre(self):
        if 'TCON' in self.audioTag:
            genres = strip_tags(self.audioTag['TCON'].text[0]).rstrip().split(';')
            self.track.genres = genres

    def extractArtist(self):
        if 'TPE1' in self.audioTag:  # Check if artist exists
            artists = strip_tags(self.audioTag['TPE1'].text[0])
            self.track.artists = TrackExtractorHelper.getLocalArtistsFromTrack(artists)

    def extractComposer(self):
        if 'TCOM' in self.audioTag and self.audioTag['TCOM'].text[0] != "":
            composers = strip_tags(self.audioTag['TCOM'].text[0])
            self.track.composers = TrackExtractorHelper.getLocalArtistsFromTrack(composers, True)

    def extractPerformer(self):
        if 'TOPE' in self.audioTag and self.audioTag['TOPE'].text[0] != "":
            performers = strip_tags(self.audioTag['TOPE'].text[0])
            self.track.performers = TrackExtractorHelper.getLocalArtistsFromTrack(performers, True)

    def extractProducer(self):
        if 'TPUB' in self.audioTag and self.audioTag['TPUB'].text[0] != '':
            producer = strip_tags(self.audioTag['TPUB'].text[0])
            self.track.producer = producer
            self.track.album.producer = producer

    def extractAlbumArtist(self):
        if 'TPE2' in self.audioTag:
            albumArtist = strip_tags(self.audioTag['TPE2'].text[0])
            self.track.albumArtist.addAlbumArtist(albumArtist, self.track.artistFolderName, 0)
            self.track.album.artist = albumArtist

    def extractAlbum(self):
        if 'TALB' in self.audioTag:
            albumTitle = strip_tags(self.audioTag['TALB'].text[0]).rstrip()
            self.track.album.title = albumTitle.replace('\n', '')
