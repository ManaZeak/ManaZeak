## This class fetch the tracks for the load of a library.
class PlaylistDao(object):

    @staticmethod
    ## Return a piece of the tracks of the database.
    def getTracks(lastId, tracksToGet, playlistId):


    @staticmethod
    def getSqlRequest(limit, offset):
        # FIXME: prendre en compte limit et offset
        sql = '''
        SELECT album_art.id album_art_id,
               album_art.name album_art_name,
               album.id album_id,
               album.title album_title,
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
        JOIN app_track_genres atg on track.id = atg.track_id
        JOIN app_genre genre on atg.genre_id = genre.id
        JOIN app_album album on track.album_id = album.id
        JOIN app_artist album_art on album."releaseArtist_id" = album_art.id
        JOIN app_cover cover on track.cover_id = cover.id
        ORDER BY track_id
        OFFSET 0
        LIMIT 300
        '''
