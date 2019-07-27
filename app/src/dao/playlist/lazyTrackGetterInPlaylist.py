import logging
from contextlib import closing

from django.db import connection

from app.src.dto.collection.lazyPlaylist import LazyPlaylist

logger = logging.getLogger('django')


## This class fetch the tracks for the load of a library.
class LazyTrackGetterInPlaylist(object):

    ## Return a piece of the tracks of the database.
    #   @param limit the number of object returned by a request.
    #   @param offset the number of item to skip.
    #   @param playlistId the id of the playlist.
    def getLazyFragment(self, limit, offset, playlistId):
        # Getting the sql request
        with closing(connection.cursor()) as cursor:
            # Getting the last track id of the request
            sql = self._getLastIdRequest()
            cursor.execute(sql, [playlistId, offset, limit])
            idToIgnore = cursor.fetchone()[0]
            # Executing the query and creating the objects.
            sql = self._getTrackRequest()
            cursor.execute(sql, [playlistId, offset, limit])
            # Returning the results of the request
            lazyFragment = self._convertRowToObjects(cursor.fetchall(), idToIgnore)
        return lazyFragment

    @staticmethod
    ## Convert a SQL row into an object for generating the json.
    def _convertRowToObjects(rows, idToIgnore):
        lazyFragment = LazyPlaylist()
        # If all the data were retrieved except the last track id.
        lastRequest = False
        # Count the lines processed by the algorithm for the offset.
        counter = 0
        # Iterating through the rows returned.
        for row in rows:
            # If the first row of the query is the ignored track id, we add the track to the response.
            if counter == 0 and row[5] == idToIgnore:
                lastRequest = True
            # The track reached is the last of the request, it's possible the track is not complete. skipping.
            if row[5] == idToIgnore and lastRequest is False:
                break
            # Adding the row to the array.
            lazyFragment.addArtistFromRow(row)
            counter += 1
        lazyFragment.offset = counter
        return lazyFragment

    @staticmethod
    ## Returns the request for this DAO
    def _getTrackRequest():
        return '''
            SELECT album_art.id album_art_id,
                   album_art.name album_art_name,
                   album.id album_id,
                   album.title album_title,
                   album.year album_year,
                   track.id track_id,
                   track.title track_title,
                   track.year track_year,
                   track."bitRate" track_bitrate,
                   track.duration track_duration,
                   cover.location track_cover,
                   track.mood track_moodbar,
                   genre.name track_genre,
                   artist.id artist_id,
                   artist.name artist_name,
                   composer.name composer_name,
                   composer.id composer_id,
                   performer.id performer_id,
                   performer.name performer_name
            FROM app_track track
            JOIN app_playlist_tracks apt on track.id = apt.track_id
            JOIN app_track_artists ata on track.id = ata.track_id
            LEFT JOIN app_track_composers atc on track.id = atc.track_id
            LEFT JOIN app_artist composer on atc.artist_id = composer.id
            LEFT JOIN app_track_performers atp on track.id = atp.track_id
            LEFT JOIN app_artist performer on atp.artist_id = performer.id
            JOIN app_artist artist on ata.artist_id = artist.id
            LEFT JOIN app_track_genres atg on track.id = atg.track_id
            LEFT JOIN app_genre genre on atg.genre_id = genre.id
            JOIN app_album album on track.album_id = album.id
            LEFT JOIN app_artist album_art on album."releaseArtist_id" = album_art.id
            LEFT JOIN app_cover cover on track.cover_id = cover.id
            WHERE playlist_id = %s
            ORDER BY album_art.name, album.year, track."discNumber", track."trackNumber",
                artist.name, composer.name, performer.name
            OFFSET %s
            LIMIT %s
        '''

    @staticmethod
    ## Return the request for getting the last id of the
    def _getLastIdRequest():
        return '''
            SELECT MAX(track_id) FROM (
                SELECT track.id track_id
                FROM app_track track
                JOIN app_playlist_tracks apt on track.id = apt.track_id
                JOIN app_track_artists ata on track.id = ata.track_id
                LEFT JOIN app_track_composers atc on track.id = atc.track_id
                LEFT JOIN app_artist composer on atc.artist_id = composer.id
                LEFT JOIN app_track_performers atp on track.id = atp.track_id
                LEFT JOIN app_artist performer on atp.artist_id = performer.id
                JOIN app_artist artist on ata.artist_id = artist.id
                LEFT JOIN app_track_genres atg on track.id = atg.track_id
                LEFT JOIN app_genre genre on atg.genre_id = genre.id
                JOIN app_album album on track.album_id = album.id
                LEFT JOIN app_artist album_art on album."releaseArtist_id" = album_art.id
                LEFT JOIN app_cover cover on track.cover_id = cover.id
                WHERE playlist_id = %s
                ORDER BY album_art.name, album.year, track."discNumber", track."trackNumber",
                    artist.name, composer.name, performer.name
                OFFSET %s
                LIMIT %s) sub_request
        '''
