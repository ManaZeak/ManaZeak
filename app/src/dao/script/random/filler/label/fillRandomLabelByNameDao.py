from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


class FillRandomLabelByNameDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
        INSERT INTO app_randomlabelsortedbyname (id, "hashIndex", label_id, playlist_id)
        SELECT id_seq, NEXTVAL('random_temp_labels'), id, playlist_id FROM (
            SELECT NEXTVAL('app_randomlabelsortedbyname_id_seq') id_seq,
                    app_label.id,
                    playlist_id
            FROM app_label
            JOIN app_track a on app_label.id = a.label_id
            JOIN app_playlist_tracks apt on a.id = apt.track_id
            WHERE playlist_id = %s
            GROUP BY  app_label.id, playlist_id, name
            ORDER BY name
        ) tmp
        '''