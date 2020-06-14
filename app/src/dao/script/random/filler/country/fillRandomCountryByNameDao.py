from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


class FillRandomCountryByNameDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
                INSERT INTO app_randomcountrysortedbyname (id, "hashIndex", country_id, playlist_id)
                SELECT id_seq, NEXTVAL('random_temp_country'), id, pl_id FROM (
                    SELECT NEXTVAL('app_randomcountrysortedbyname_id_seq') id_seq,
                            c.id,
                            apt.playlist_id pl_id
                    FROM app_country c
                        JOIN app_track_countries atc on c.id = atc.country_id
                        JOIN app_track a on atc.track_id = a.id
                        JOIN app_playlist_tracks apt on a.id = apt.track_id
                    WHERE apt.playlist_id = %s
                    GROUP BY c.id, apt.playlist_id, name
                    ORDER BY name) tmp
            '''