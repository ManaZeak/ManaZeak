import math
from mutagen.id3 import ID3
from mutagen.mp3 import MP3

from app.models import Track, Artist, Album


def addTrackMP3(root, file):
    track = Track()
    # --- FILE INFORMATION ---
    audioFile = MP3(root + "/" + file)
    track.location = root + "/" + file
    track.bitRate = audioFile.info.bitrate
    track.duration = audioFile.info.length
    track.sampleRate = audioFile.info.sample_rate
    track.bitRateMode = audioFile.info.bitrate_mode

    # --- FILE TAG ---
    audioTag = ID3(root + "/" + file)
    print(audioTag.pprint())
    if 'TIT2' in audioTag:
        if not audioTag['TIT2'].text[0] == "":
            track.title = audioTag['TIT2'].text[0]
    if 'TDRC' in audioTag:
        if not audioTag['TDRC'].text[0].get_text() == "":
            track.year = audioTag['TDRC'].text[0].get_text()[:4]  # Date of Recording
    totalTrack = 0
    if 'TRCK' in audioTag:
        if not audioTag['TRCK'].text[0] == "":
            if audioTag['TRCK'].text[0].contains("/"):
                tags = audioTag['TRCK'].text[0].split('/')
                track.number = tags[0]
                totalTrack = tags[1]
            else:
                track.number = audioTag['TRCK'].text[0]
    if 'TCOM' in audioTag:
        if not audioTag['TCOM'].text[0] == "":
            track.composer = audioTag['TCOM'].text[0]
    if 'TOPE' in audioTag:
        if not audioTag['TOPE'].text[0] == "":
            track.performer = audioTag['TOPE'].text[0]
    if 'TBPM' in audioTag:
        if not audioTag['TBPM'].text[0] == "":
            track.bpm = math.floor(float(audioTag['TBPM'].text[0]))
    if 'COMM' in audioTag:
        if not audioTag['COMM'].text[0] == "":
            track.comment = audioTag['COMM'].text[0]
    if 'USLT' in audioTag:
        if not audioTag['USLT'].text[0] == "":
            track.lyrics = audioTag['USLT'].text[0]
    if 'TSIZ' in audioTag:
        if not audioTag['TSIZ'].text[0] == "":
            track.size = audioTag['TSIZ'].text[0]

    # --- Save data for many-to-many relationship ---
    track.save()
    # print(track.title)

    # --- Adding artist to DB ---
    # Check if artist exists
    if 'TPE1' in audioTag:
        # print(audioTag['TPE1'])
        artists = audioTag['TPE1'].text[0].split(",")
        for artistName in artists:
            artistName = artistName.lstrip()  # Remove useless spaces at the beginning
            num_results = Artist.objects.filter(name=artistName).count()
            if num_results == 0:  # The artist doesn't exist
                artist = Artist()
                artist.name = artistName
                artist.save()
            artist = Artist.objects.get(name=artistName)
            track.artist.add(artist)
    else:
        pass
        # TODO default value of artist (see if it's possible)
        # tracks.append(track)

    # --- Adding album to DB ---
    if 'TALB' in audioTag:
        albumTitle = audioTag['TPE1'].text[0]
        if Album.objects.filter(title=albumTitle).count() == 0:  # If the album doesn't exist
            album = Album()
            album.title = albumTitle
            album.save()
            album.artist.add(track.artist)
        album = Album.objects.get(title=albumTitle)
        if album.artist.filter(name=track.artist.name).count() == 0:  # The Artist wasn't added
            album.artist.add(track.artist)
            album.save()
        track.album = album
    else:
        pass
        # TODO default value of artist (see if it's possible)
