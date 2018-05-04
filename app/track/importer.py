import hashlib
import os

import math
from django.utils.html import strip_tags
from mutagen.flac import FLAC
from mutagen.id3 import ID3, ID3NoHeaderError
from mutagen.mp3 import MP3, BitrateMode
from mutagen.oggvorbis import OggVorbis

from app.models import FileType
from app.utils import processVorbisTag


# Read a file and put the metadata information into memory
def createMP3Track(filePath, convert, fileTypeId, coverPath):
    track = LocalTrack()

    # --- FILE INFORMATION ---
    audioFile = MP3(filePath)
    track.location = filePath
    track.size = os.path.getsize(filePath)
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
    track.fileType = fileTypeId.id

    # Generating moodbar hash
    path = track.location.encode("ascii", "ignore")
    md5 = hashlib.md5(path).hexdigest()
    track.moodbar = "../static/mood/" + md5 + ".mood"

    # Check if the file has a tag header
    try:
        audioTag = ID3(filePath)
    except ID3NoHeaderError:
        audioTag = ID3()
    # --- FILE TAG ---
    if convert:
        audioTag.update_to_v24()
        audioTag.save()

    # --- COVER ---
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
        if not os.path.isfile(coverPath + md5Name.hexdigest() + extension):
            with open(coverPath + md5Name.hexdigest() + extension, 'wb') as img:
                img.write(front)
        track.coverLocation = md5Name.hexdigest() + extension
    if 'TIT2' in audioTag:
        if not audioTag['TIT2'].text[0] == "":
            track.title = strip_tags(audioTag['TIT2'].text[0]).rstrip()

    if 'TDRC' in audioTag:
        if not audioTag['TDRC'].text[0].get_text() == "":
            track.year = strip_tags(audioTag['TDRC'].text[0].get_text()[:4]).rstrip()  # Date of Recording

    if 'TRCK' in audioTag:
        if not audioTag['TRCK'].text[0] == "":
            if "/" in audioTag['TRCK'].text[0]:  # Contains info about the album number of track
                tags = strip_tags(audioTag['TRCK'].text[0]).rstrip().split('/')
                track.number = tags[0]
                track.totalTrack = tags[1]
            else:
                track.number = strip_tags(audioTag['TRCK'].text[0]).rstrip()

    if 'TCOM' in audioTag:
        if not audioTag['TCOM'].text[0] == "":
            track.composer = strip_tags(audioTag['TCOM'].text[0]).rstrip()

    if 'TOPE' in audioTag:
        if not audioTag['TOPE'].text[0] == "":
            track.performer = strip_tags(audioTag['TOPE'].text[0]).rstrip()

    if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(strip_tags(audioTag['TBPM'].text[0]).rstrip()))

    if 'COMM' in audioTag:
        if not audioTag['COMM'].text == "":
            track.comment = strip_tags(audioTag['COMM'].text).rstrip()
    elif 'COMM::XXX' in audioTag:
        if not audioTag['COMM::XXX'].text == "":
            track.comment = strip_tags(audioTag['COMM::XXX'].text[0]).rstrip()

    if 'USLT' in audioTag:
        if not audioTag['USLT'].text == "":
            track.lyrics = strip_tags(audioTag['USLT'].text).rstrip()

    if 'USLT::XXX' in audioTag:
        if not audioTag['USLT::XXX'].text == "":
            track.lyrics = strip_tags(audioTag['USLT::XXX'].text).rstrip()

    if len(audioTag.getall('TXXX')) != 0:
        for txxx in audioTag.getall('TXXX'):
            if txxx.desc == 'TOTALDISCS':
                track.totalDisc = strip_tags(txxx.text[0]).rstrip()
            elif txxx.desc == 'USLT' or txxx.desc == 'USLT::XXX':
                track.lyrics = strip_tags(txxx.text[0]).rstrip()

    if 'TPOS' in audioTag:
        if not audioTag['TPOS'].text[0] == "":
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
        artists = strip_tags(audioTag['TPE1'].text[0]).split(",")
        for artistName in artists:
            artistName = artistName.lstrip().rstrip()  # Remove useless spaces at the beginning
            track.artist.append(artistName)

    # --- Adding album to structure ---
    if 'TALB' in audioTag:
        albumTitle = strip_tags(audioTag['TALB'].text[0]).rstrip()
        track.album = albumTitle.replace('\n', '')

    return track


# Read a file and put the metadata information into memory
def createVorbisTrack(filePath, fileTypeId, coverPath):
    track = LocalTrack()
    ogg = False

    if filePath.endswith('.flac'):
        audioFile = FLAC(filePath)
    else:
        audioFile = OggVorbis(filePath)
        ogg = True

    # --- FILE INFORMATION ---
    track.location = filePath
    track.size = os.path.getsize(filePath)
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    track.fileType = fileTypeId.id

    # Generating moodbar hash
    path = track.location.encode("ascii", "ignore")
    md5 = hashlib.md5(path).hexdigest()
    track.moodbar = "../static/mood/" + md5 + ".mood"

    # --- COVER ---
    if not ogg:
        picture = audioFile.pictures
        if len(picture) > 0:
            picture = picture[0].data
        pictureName = picture
    else:
        picture = None
        # TODO : fix cover import for ogg files.
        pass
        if 'METADATA_BLOCK_PICTURE' in audioFile:
            picture = audioFile['METADATA_BLOCK_PICTURE'][0]
            pictureName = str(audioFile['METADATA_BLOCK_PICTURE']).encode("ascii", "ignore")
        else:
            picture = pictureName = ""
    if len(picture) != 0:
        # Creating md5 hash for the cover
        md5Name = hashlib.md5()
        md5Name.update(pictureName)
        # Check if the cover already exists and save it
        if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
            with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                img.write(picture)
        track.coverLocation = md5Name.hexdigest() + ".jpg"

    if 'TITLE' in audioFile:
        trackTitle = processVorbisTag(audioFile['TITLE'])
        if not trackTitle == "":
            track.title = trackTitle

    if 'DATE' in audioFile:
        trackDate = processVorbisTag(audioFile['DATE'])
        if not trackDate == "":
            track.year = trackDate  # Date of Recording

    if 'TRACKNUMBER' in audioFile:
        trackNumber = processVorbisTag(audioFile['TRACKNUMBER'])
        if not trackNumber == "":
            track.number = trackNumber

    if 'DISCNUMBER' in audioFile:
        discNumber = processVorbisTag(audioFile['DISCNUMBER'])
        if not discNumber == "":
            try:
                discNumber = int(discNumber)
            except ValueError:
                discNumber = 0
            track.discNumber = discNumber

    if 'COMMENT' in audioFile:
        trackComment = processVorbisTag(audioFile['COMMENT'])
        track.comment = trackComment

    if 'TOTALDISC' in audioFile:
        albumTotalDisc = processVorbisTag(audioFile['TOTALDISC'])
        if not albumTotalDisc == "":
            track.totalDisc = albumTotalDisc

    if 'TOTALTRACK' in audioFile:
        track.totalTrack = processVorbisTag(audioFile['TOTALTRACK'])

    if 'BPM' in audioFile:
        track.bpm = processVorbisTag(audioFile['BPM'])

    if 'LYRICS' in audioFile:
        track.lyrics = processVorbisTag(audioFile['LYRICS'])

    if 'COMPOSER' in audioFile:
        trackComposer = processVorbisTag(audioFile['COMPOSER'])
        if not trackComposer == "":
            track.composer = trackComposer

    if 'PERFORMER' in audioFile:
        trackPerformer = processVorbisTag(audioFile['PERFORMER'])
        if not trackPerformer == "":
            track.performer = trackPerformer

    if 'GENRE' in audioFile:
        genreName = processVorbisTag(audioFile['GENRE'])
        track.genre = genreName.rstrip()

    if 'ARTIST' in audioFile:  # Check if artist exists
        artists = processVorbisTag(audioFile['ARTIST']).split(",")
        for artist in artists:
            track.artist.append(artist.lstrip().rstrip())

    if 'ALBUM' in audioFile:
        albumTitle = processVorbisTag(audioFile['ALBUM'])
        track.album = albumTitle.replace('\n', '')

    if ogg:
        pass
    return track


# Generate only the cover from a track
def regenerateCover(track):
    if FileType.objects.filter(name="mp3").count() == 1 and FileType.objects.filter(name="flac").count() == 1:
        mp3Type = FileType.objects.get(name="mp3")
        flacType = FileType.objects.get(name="flac")
        coverPath = "/ManaZeak/static/img/covers/"
        track.coverLocation = ""
        if track.fileType == mp3Type:
            try:
                audioTag = ID3(track.location)
            except ID3NoHeaderError:
                audioTag = ID3()
            if 'APIC:' in audioTag:
                front = audioTag['APIC:'].data
                # Creating md5 hash for the cover
                md5Name = hashlib.md5()
                md5Name.update(front)
                # Check if the cover already exists and save it
                if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
                    with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                        img.write(front)
                track.coverLocation = md5Name.hexdigest() + ".jpg"
        elif track.fileType == flacType:
            audioFile = FLAC(track.location)
            pictures = audioFile.pictures
            if len(pictures) != 0:
                # Creating md5 hash for the cover
                md5Name = hashlib.md5()
                md5Name.update(pictures[0].data)
                # Check if the cover already exists and save it
                if not os.path.isfile(coverPath + md5Name.hexdigest() + ".jpg"):
                    with open(coverPath + md5Name.hexdigest() + ".jpg", 'wb') as img:
                        img.write(pictures[0].data)
                track.coverLocation = md5Name.hexdigest() + ".jpg"
        track.save()


# Tag a file in the comment section with the uploader name
def setUploader(path, userName):
    # Saving uploader for mp3 file since flac has no comment field
    if path.endswith('.mp3'):
        # Check if the file has a tag header
        try:
            audioTag = ID3(path)
        except ID3NoHeaderError:
            audioTag = ID3()
        if 'COMM' not in audioTag:
            audioTag.add('COMM')
        audioTag['COMM'].text[0] = "Uploaded by : " + userName
        audioTag.save()
    if path.endswith('.flac'):
        audioTag = FLAC(path)
        audioTag['COMMENT'] = "Uploaded by : " + userName
        audioTag.save()


class LocalTrack:
    def __init__(self):
        self.location = self.coverLocation = self.title = self.composer = self.performer = self.lyrics = self.comment \
            = self.album = self.genre = self.moodbar = ""
        self.year = self.fileType = self.number = self.bpm = self.bitRate = self.bitRateMode = self.sampleRate \
            = self.duration = self.discNumber = self.size = self.playCounter = self.downloadCounter = self.totalDisc = \
            self.totalTrack = 0
        self.artist = []
        self.scanned = False
