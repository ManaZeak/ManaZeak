import hashlib
import os
import re

from pathlib import Path

from django.utils.html import strip_tags

from app.src.dto.artist.localArtist import LocalArtist


## Helper for extracting the tag tracks.
from app.src.dto.country.localCountry import LocalCountry


class TrackExtractorHelper(object):

    @staticmethod
    ## Get the information about a file, same for MP3 and FLAC.
    #   @param track the track object to be filled
    def getBaseInfo(track, audioTag, trackPath):
        track.location = trackPath
        track.fileName = Path(trackPath).name
        track.moodbar = TrackExtractorHelper._computeMoodbarPath(track)
        track.artistFolderName = TrackExtractorHelper._extractNameArtistFolder(trackPath)
        track.album.folderName = TrackExtractorHelper._extractNameAlbumFolder(trackPath)
        track.size = os.path.getsize(trackPath)
        track.bitRate = audioTag.info.bitrate
        track.duration = audioTag.info.length
        track.sampleRate = audioTag.info.sample_rate
        track.album.location = TrackExtractorHelper._extractPathAlbum(trackPath)
        track.albumArtist.location = TrackExtractorHelper._extractPathArtist(trackPath)

    @staticmethod
    ## Process a Vorbis tag to remove the useless info.
    #   @param tag the vorbis tag.
    #   @return the cleaned tag.
    def trimVorbisTag(tag):
        tag = strip_tags(tag)
        tag = tag[2:]
        tag = tag[:-2]
        return tag

    @staticmethod
    ## Construct a table of local artists for a given string.
    #   @param tagString the tag string to transform into a table of local artists
    #   @return the list of the local artists
    def getLocalArtistsFromTrack(tagString, isPerformer=False):
        localArtists = []
        # The performer uses ; instead of ,
        if isPerformer:
            splitArtists = TrackExtractorHelper._extractComposerFromList(tagString)
        else:
            splitArtists = TrackExtractorHelper._extractArtistsFromList(tagString)
        for artist in splitArtists:
            localArtist = LocalArtist()
            localArtist.addArtist(artist)
            localArtists.append(localArtist)
        return localArtists

    @staticmethod
    ## Construct a table of local country with a list of countries.
    #   @param tagString the string containing the countries
    #   @return a table of local countries.
    def getLocalCountriesFromTrack(tagString):
        countries = []
        countriesTag = tagString.split('; ')
        for country in countriesTag:
            localCountry = LocalCountry()
            localCountry.name = country
            countries.append(localCountry)
        return countries

    @staticmethod
    ## Compute the moodbar path with the location of the track and assign it to the track.
    #   @param track the track to compute.
    #   @return the track moodbar path.
    def _computeMoodbarPath(track):
        # Generating moodbar hash
        path = track.location.encode("ascii", "ignore")
        md5 = hashlib.md5(path).hexdigest()
        return "../static/mood/" + md5 + ".mood"

    @staticmethod
    def _extractPathAlbum(trackPath):
        path = Path(trackPath)
        return str(path.parent)

    @staticmethod
    def _extractPathArtist(trackPath):
        path = Path(trackPath)
        return str(path.parent.parent)

    @staticmethod
    ## Split a string containing multiple artist names without splitting the ',' in parentheses
    #   @param toSplit the string to split.
    #   @return the artists in a table.
    def _extractArtistsFromList(toSplit):
        # Splitting the string
        artists = re.split(r';\s*(?![^()]*\))', toSplit)
        # Cleaning it
        for i in range(len(artists)):
            artists[i] = artists[i].lstrip().rstrip()
        return artists

    @staticmethod
    ## Split a string containing multiple artist names without splitting the ';' in parentheses
    #   @param toSplit the string to split.
    #   @return the artists in a table.
    def _extractComposerFromList(toSplit):
        # Splitting the string
        artists = re.split(r';\s*(?![^()]*\))', toSplit)
        # Cleaning it
        for i in range(len(artists)):
            artists[i] = artists[i].lstrip().rstrip()
        return artists

    @staticmethod
    ## Extract the artist folder name. Used later in the integration process.
    #   @param path the path of the track.
    #   @return the folder name of the artist.
    def _extractNameArtistFolder(path):
        path = Path(path)
        # If the path is long enough
        if len(path.parts) > 2:
            return path.parts[len(path.parts) - 3]
        return ''

    @staticmethod
    ## Extract the artist folder name. Used later in the integration process.
    #   @param path the path of the track.
    #   @return the folder name of the artist.
    def _extractNameAlbumFolder(path):
        path = Path(path)
        # If the path is long enough
        if len(path.parts) > 1:
            return path.parts[len(path.parts) - 2]
        return ''
