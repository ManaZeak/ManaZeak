import csv
import hashlib
import io
from contextlib import closing
from datetime import datetime

from django.db import connection

from app.models import Album, Artist, Genre


# Import album into the database in bulk mode
def addAlbumBulk(albums, artists, totalTrack, totalDisc):
    albumReference = {"": Album.objects.get(title=None)}
    newAlbums = {}
    albumSet = set()

    # Transforming the dict into a set for the query
    for album in albums:
        albumSet.add(album)

    # Get all the existing artists in the table from our set
    albumInBase = Album.objects.filter(title__in=albumSet)
    albumToAdd = len(albumSet) - len(albumInBase)

    # Get the sequence value
    cursor = connection.cursor()
    cursor.execute("SELECT nextval('app_album_id_seq')")
    firstId = cursor.fetchone()
    # Offset the sequence value
    cursor.execute('ALTER SEQUENCE app_album_id_seq RESTART WITH {0};'.format(str(firstId[0] + albumToAdd)))

    # Add the known artists to the dict and remove the artist in the set
    for album in albumInBase:
        albumReference[album.title] = album.id
        del albums[album.title]

    # Creating the csv
    counter = 0
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for album in albums:
        newAlbums[album] = firstId[0] + counter
        writer.writerow([firstId[0] + counter, album, totalTrack[album], totalDisc[album]])
        counter += 1

    virtualFile.seek(0)
    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='"app_album"',
            sep='\t',
            columns=('id', 'title', '"totalTrack"', '"totalDisc"'),
        )

    # Creating the csv for the link between artist and album
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for album in newAlbums:
        artistsAdded = albums[album].split(",")
        for artist in artistsAdded:
            writer.writerow([newAlbums[album], artists[artist]])

    virtualFile.seek(0)
    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='"app_album_artist"',
            sep='\t',
            columns=('album_id', 'artist_id'),
        )
    virtualFile.close()

    return {**albumReference, **newAlbums}


# Import track into the database in bulk mode
def addTrackBulk(tracks, artists, albums, genres, playlistId):
    referenceTracks = {}

    # Moving the sequence before insert
    cursor = connection.cursor()
    cursor.execute("SELECT nextval('app_track_id_seq')")
    firstId = cursor.fetchone()
    # Offset the sequence value
    cursor.execute('ALTER SEQUENCE app_track_id_seq RESTART WITH {0};'.format(str(firstId[0] + len(tracks))))

    # Creating the csv
    counter = firstId[0]
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for track in tracks:
        writer.writerow([counter, track.location, track.title.replace('\n', '\\n').replace('\r', ''), track.year,
                         track.composer.replace('\n', '\\n').replace('\r', ''),
                         track.performer.replace('\n', '\\n').replace('\r', ''),
                         track.number, track.bpm, track.lyrics.replace('\n', "\\n").replace('\r', ''),
                         track.comment.replace('\n', '\\n').replace('\r', ''), track.bitRate, track.bitRateMode,
                         track.sampleRate, track.duration, track.discNumber, track.size, albums[track.album],
                         track.fileType, genres[track.genre],
                         track.coverLocation.replace('\n', '\\n').replace('\r', ''),
                         track.moodbar.replace('\n', '\\n').replace('\r', ''), track.scanned, track.playCounter,
                         datetime.now(), track.downloadCounter])
        referenceTracks[track] = counter
        counter += 1

    virtualFile.seek(0)
    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='"app_track"',
            sep='\t',
            columns=('id', 'location', 'title', 'year', 'composer', 'performer', 'number', 'bpm', 'lyrics', 'comment',
                     '"bitRate"', '"bitRateMode"', '"sampleRate"', 'duration', '"discNumber"', 'size', 'album_id',
                     '"fileType_id"', 'genre_id', '"coverLocation"', 'moodbar', 'scanned', '"playCounter"',
                     '"lastModified"', '"downloadCounter"'),
        )

    # Creating the csv for the link between tracks and artists
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for track in tracks:
        for artist in track.artist:
            writer.writerow([referenceTracks[track], artists[artist]])

    virtualFile.seek(0)
    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='"app_track_artist"',
            sep='\t',
            columns=('track_id', 'artist_id'),
        )

    # Creating csv for the link between tracks and playlist
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for track in tracks:
        writer.writerow([playlistId, referenceTracks[track]])

    virtualFile.seek(0)
    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='"app_playlist_track"',
            sep='\t',
            columns=('playlist_id', 'track_id'),
        )
    virtualFile.close()


def addArtistBulk(artists):
    artistReference = {"": Artist.objects.get(name=None).id}
    newArtist = {}

    # Get all existing artist
    artistsInBase = Artist.objects.filter(name__in=artists)
    artistsToAdd = len(artists) - len(artistsInBase)

    # Get the sequence value
    cursor = connection.cursor()
    cursor.execute("SELECT nextval('app_artist_id_seq')")
    firstId = cursor.fetchone()
    # Offset the sequence value
    cursor.execute('ALTER SEQUENCE app_artist_id_seq RESTART WITH {0};'.format(str(firstId[0] + artistsToAdd)))

    # Add the known artists to the dict and remove the artist in the set
    for artist in artistsInBase:
        artistReference[artist.name] = artist.id
        artists.remove(artist.name)

    # Creating the structure for csv creation
    counter = 0
    for artist in artists:
        newArtist[artist] = firstId[0] + counter
        counter += 1

    # Creating the csv file from the information for DB import
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for artist in newArtist:
        writer.writerow([newArtist[artist], artist.rstrip()])

    virtualFile.seek(0)

    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='"app_artist"',
            sep='\t',
            columns=('id', 'name'),
        )
    virtualFile.close()

    return {**artistReference, **newArtist}


# With a given set add the missing genre to the database and return a dict with name:id
def addGenreBulk(genres):
    genreReference = {"": Genre.objects.get(name=None).id}
    newGenre = {}

    # Get all existing genre
    genreInBase = Genre.objects.filter(name__in=genres)
    genreToAdd = len(genres) - len(genreInBase)

    # Get the sequence value
    cursor = connection.cursor()
    cursor.execute("SELECT nextval('app_genre_id_seq')")
    firstId = cursor.fetchone()
    # Offset the sequence value
    cursor.execute('ALTER SEQUENCE app_genre_id_seq RESTART WITH {0};'.format(str(firstId[0] + genreToAdd)))

    # Add known genre into the dict and remove the genre known in database in the set
    for genre in genreInBase:
        genreReference[genre.name] = genre.id
        genres.remove(genre.name)

    # Creating the structure for DB import
    counter = 0
    for genre in genres:
        newGenre[genre] = firstId[0] + counter
        counter += 1

    # Creating a CSV file in memory for faster import in the database
    virtualFile = io.StringIO()
    writer = csv.writer(virtualFile, delimiter='\t')
    for genre in newGenre:
        writer.writerow([newGenre[genre], genre.rstrip()])

    virtualFile.seek(0)

    # Import the csv into the database
    with closing(connection.cursor()) as cursor:
        cursor.copy_from(
            file=virtualFile,
            table='app_genre',
            sep='\t',
            columns=('id', 'name'),
        )
    virtualFile.close()

    return {**genreReference, **newGenre}


# Delete index and view after finished using it
def deleteView(userId, playlistId):
    viewName = hashlib.md5(str(userId).encode("ascii", "ignore")+str(playlistId).encode("ascii", "ignore")).hexdigest()
    indexName = "index"+viewName
    sql = """DROP INDEX IF EXISTS "%s";""" % indexName
    with connection.cursor() as cursor:
        cursor.execute(sql)
    sql = """DROP MATERIALIZED VIEW IF EXISTS "%s" RESTRICT;""" % viewName
    with connection.cursor() as cursor:
        cursor.execute(sql)


# Creation of a view for each playlist with an index
def createViewForLazy(userId, playlistId):
    # Creating the hash for the view name
    viewName = hashlib.md5(str(userId).encode("ascii", "ignore")+str(playlistId).encode("ascii", "ignore")).hexdigest()
    sql = "DROP MATERIALIZED VIEW IF EXISTS public.\"%s\" RESTRICT;" % viewName
    with connection.cursor() as cursor:
        cursor.execute(sql)
    sql = """
            CREATE MATERIALIZED VIEW "%s" (track_id, track_location, track_title, track_year, track_composer,
            track_performer, track_number, track_bpm, track_lyrics, track_comment, track_bitRate, track_bitRateMode,
            track_sampleRate, track_duration, track_discNumber, track_size, track_lastModified, track_cover,
            track_fileType_id, track_mood, track_download_counter, album_title, genre_id, genre_name, album_id,
             artist_name, artist_id, album_artist_id, album_artist_name)
              AS SELECT *, row_number() OVER() AS local_id FROM (SELECT trck_id, trk_loc, trck_tit, trck_year,
              trck_comp, trk_perf, trck_num, trk_bpm, trck_lyr, trck_com,
              track_bit_rate, trck_bitmode,trck_sampRate, trck_dur, trck_dnum, trck_siz, trck_lastM, trck_cov,
              trck_play, trck_mood, trck_dl, albumTitle,gen_id, genreName, alb_id,
              string_agg(DISTINCT artistName, ',') AS art_name,
              string_agg(DISTINCT art_id::TEXT, ',') AS art_id,
              string_agg(DISTINCT album_artist_id::TEXT, ',') AS alb_art,
              string_agg(DISTINCT album_artist_name, ',') AS alb_art_name
            FROM (
                  SELECT * FROM
                    (
                      SELECT
                        app_track.id                AS trck_id,
                        app_track.location          AS trk_loc,
                        app_track.title             AS trck_tit,
                        app_track.year              AS trck_year,
                        app_track.composer          AS trck_comp,
                        app_track.performer         AS trk_perf,
                        app_track.number            AS trck_num,
                        app_track.bpm               AS trk_bpm,
                        app_track.lyrics            AS trck_lyr,
                        app_track.comment           AS trck_com,
                        app_track."bitRate"         AS track_bit_rate,
                        app_track."bitRateMode"     AS trck_bitmode,
                        app_track."sampleRate"      AS trck_sampRate,
                        app_track.duration          AS trck_dur,
                        app_track."discNumber"      AS trck_dnum,
                        app_track.size              AS trck_siz,
                        app_track."lastModified"    AS trck_lastM,
                        app_track."coverLocation"   AS trck_cov,
                        app_track."playCounter"     AS trck_play,
                        app_track.moodbar           AS trck_mood,
                        app_track."downloadCounter" AS trck_dl,
                        *
                      FROM app_track
                        INNER JOIN (SELECT name AS album_artist_name, a3.id AS album_artist_id, title AS albumTitle, 
                        app_album.id AS alb_id FROM app_album INNER JOIN app_album_artist a ON app_album.id = a.album_id
                        INNER JOIN app_artist a3 ON a.artist_id = a3."id") a ON app_track.album_id = alb_id
                        INNER JOIN (SELECT
                                      name AS genreName,
                                      id   AS gen_id
                                    FROM app_genre) a2 ON app_track.genre_id = gen_id
                        INNER JOIN (SELECT
                                      name          AS artistName,
                                      app_artist.id AS art_id
                                    FROM app_artist) a4 INNER JOIN app_track_artist a3 ON art_id = a3.artist_id
                          ON app_track.id = a3.track_id
                    ) test
                  INNER JOIN (SELECT * FROM app_playlist 
                  INNER JOIN app_playlist_track t ON app_playlist.id = t.playlist_id
                  WHERE app_playlist.id = %s) playlists ON trck_id = playlists.track_id
            ) request
        GROUP BY trck_id, trk_loc, trck_tit, trck_year, genreName, trck_comp, trk_perf, trck_num, trk_bpm, trck_lyr,
         trck_com, track_bit_rate, trck_bitmode,trck_sampRate, trck_dur, trck_siz, trck_lastM, trck_cov, trck_play,
          trck_mood, trck_dl, albumTitle, gen_id, trck_dnum, alb_id ORDER BY art_name, albumTitle,trck_num) AS result;
        """ % (viewName, '%s')
    with connection.cursor() as cursor:
        cursor.execute(sql, [str(playlistId)])
    sql = """
        CREATE INDEX "%s" ON "%s" (local_id);
        """ % ("index"+viewName, viewName)
    with connection.cursor() as cursor:
        cursor.execute(sql)


# Parse the raw sql query
def lazyJsonGenerator(row):
    splicedArtistName = row[25].split(",")
    splicedArtistId = row[26].split(",")
    artists = []

    for artistId, artist in zip(splicedArtistId, splicedArtistName):
        artists.append({
            'ID': artistId,
            'NAME': artist,
        })

    data = {
        'ID': row[0],
        'TITLE': row[2],
        'YEAR': row[3],
        'COMPOSER': row[4],
        'PERFORMER': row[5],
        'BITRATE': row[10],
        'DURATION': row[13],
        'COVER': row[17],
        'ARTISTS': artists,
        'GENRE': row[23],
        'ALBUM': {
            'ID': row[24],
            'TITLE': row[21],
        },
    }
    return data


# Return a queryset of tracks from a view
def getPlaylistTracks(playlistId, userId, limit, offset):
    viewName = hashlib.md5(str(userId).encode("ascii", "ignore") + str(playlistId).encode("ascii", "ignore")).hexdigest()
    sql = """SELECT * FROM "%s" WHERE local_id > %s LIMIT %s;""" % (viewName, '%s', '%s')
    with connection.cursor() as cursor:
        cursor.execute(sql, (offset, limit))
        return cursor.fetchall()
