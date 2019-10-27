import hashlib
import logging
import os

from app.src.services.track.trackExtractorHelper import TrackExtractorHelper
from app.src.utils.tagExtractor.abstractTagExtractor import AbstractTagExtractor

loggerScan = logging.getLogger('scan')

## Extract the tag of a flac file.
class FlacTagExtractor(AbstractTagExtractor):

    def __init__(self, track, audioTag):
        self.track = track
        self.audioTag = audioTag

    def extractTitle(self):
        if 'TITLE' in self.audioTag:
            trackTitle = TrackExtractorHelper.trimVorbisTag(self.audioTag['TITLE'])
            if trackTitle != "":
                self.track.title = trackTitle

    def extractYear(self):
        if 'DATE' in self.audioTag:
            trackDate = TrackExtractorHelper.trimVorbisTag(self.audioTag['DATE'])
            if trackDate != "":
                self.track.year = trackDate  # Date of Recording
                self.track.album.year = self.track.year

    def extractTrackNumber(self):
        if 'TRACKNUMBER' in self.audioTag:
            trackNumber = TrackExtractorHelper.trimVorbisTag(self.audioTag['TRACKNUMBER'])
            if trackNumber != "":
                self.track.number = trackNumber

    def extractBpm(self):
        if 'BPM' in self.audioTag:
            self.track.bpm = TrackExtractorHelper.trimVorbisTag(self.audioTag['BPM'])

    def extractComment(self):
        if 'COMMENT' in self.audioTag:
            trackComment = TrackExtractorHelper.trimVorbisTag(self.audioTag['COMMENT'])
            self.track.comment = trackComment

    def extractLyrics(self):
        if 'LYRICS' in self.audioTag:
            self.track.lyrics = TrackExtractorHelper.trimVorbisTag(self.audioTag['LYRICS'])

    def extractDiscNumber(self):
        if 'DISCNUMBER' in self.audioTag:
            discNumber = TrackExtractorHelper.trimVorbisTag(self.audioTag['DISCNUMBER'])
            if discNumber != "":
                try:
                    discNumber = int(discNumber)
                except ValueError:
                    discNumber = 0
                self.track.discNumber = discNumber

    def extractGenre(self):
        if 'GENRE' in self.audioTag:
            genres = TrackExtractorHelper.trimVorbisTag(self.audioTag['GENRE']).rstrip().split('; ')
            self.track.genres = genres

    def extractArtist(self):
        if 'ARTIST' in self.audioTag:  # Check if artist exists
            artists = TrackExtractorHelper.trimVorbisTag(self.audioTag['ARTIST'])
            self.track.artists = TrackExtractorHelper.getLocalArtistsFromTrack(artists)

    def extractComposer(self):
        if 'COMPOSER' in self.audioTag:
            composers = TrackExtractorHelper.trimVorbisTag(self.audioTag['COMPOSER'])
            if composers != "":
                self.track.composers = TrackExtractorHelper.getLocalArtistsFromTrack(composers, True)

    def extractPerformer(self):
        if 'PERFORMER' in self.audioTag:
            performers = TrackExtractorHelper.trimVorbisTag(self.audioTag['PERFORMER'])
            if performers != "":
                self.track.performers = TrackExtractorHelper.getLocalArtistsFromTrack(performers, True)

    def extractProducer(self):
        if 'PRODUCER' in self.audioTag:
            producer = TrackExtractorHelper.trimVorbisTag(self.audioTag['PRODUCER'])
            if producer != "":
                self.track.producer = producer
                self.track.album.producer = producer

    def extractAlbum(self):
        if 'ALBUM' in self.audioTag:
            albumTitle = TrackExtractorHelper.trimVorbisTag(self.audioTag['ALBUM'])
            self.track.album.title = albumTitle.replace('\n', '')

    def extractAlbumArtist(self):
        if 'ALBUMARTIST' in self.audioTag:
            albumArtist = TrackExtractorHelper.trimVorbisTag(self.audioTag['ALBUMARTIST'])
            self.track.albumArtist.addAlbumArtist(albumArtist, self.track.artistFolderName, 0)
            self.track.album.artist = albumArtist

    def extractLabel(self):
        if 'LABEL' in self.audioTag:
            self.track.label.name = TrackExtractorHelper.trimVorbisTag(self.audioTag['LABEL'])

    def extractCountry(self):
        if 'LANGUAGE' in self.audioTag:
            countries = TrackExtractorHelper.trimVorbisTag(self.audioTag['LANGUAGE'])
            self.track.countries = TrackExtractorHelper.getLocalCountriesFromTrack(countries)

    def extractCover(self, coverPath):
        # Getting the image
        picture = self.audioTag.pictures
        if len(picture) > 0:
            picture = picture[0].data
        pictureName = picture

        if len(picture) != 0:
            # Creating md5 hash for the cover
            md5Name = hashlib.md5()
            md5Name.update(pictureName)
            # Check if the cover already exists and save it
            if not os.path.isdir(coverPath):
                os.mkdir(coverPath)  # Create the folder
            if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
                with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                    img.write(picture)
            self.track.coverLocation = md5Name.hexdigest() + ".jpg"
