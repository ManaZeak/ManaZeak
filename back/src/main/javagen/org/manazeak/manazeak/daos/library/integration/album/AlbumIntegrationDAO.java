package org.manazeak.manazeak.daos.library.integration.album;

import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Allows to insert the information about the album into the database.
 */
@Repository
public class AlbumIntegrationDAO {

    private static final String MERGE_ALBUM_SQL = "INSERT INTO album (album_id, title, total_track, release_year, release_date, catalog_number, ean_upn, duration, " +
            "                   disk_total, compilation_type_id, label_id, artist_id, start_recording_date, end_recording_date) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
            "ON CONFLICT (album_id) DO UPDATE SET title                = excluded.title, " +
            "                                     total_track          = excluded.total_track, " +
            "                                     release_year         = excluded.release_year, " +
            "                                     release_date         = excluded.release_date, " +
            "                                     catalog_number       = excluded.catalog_number, " +
            "                                     ean_upn              = excluded.ean_upn, " +
            "                                     duration             = excluded.duration, " +
            "                                     disk_total           = excluded.disk_total, " +
            "                                     compilation_type_id  = excluded.compilation_type_id, " +
            "                                     label_id             = excluded.label_id, " +
            "                                     artist_id            = excluded.artist_id, " +
            "                                     start_recording_date = excluded.start_recording_date, " +
            "                                     end_recording_date   = excluded.end_recording_date";
    private final JdbcTemplate jdbcTemplate;
    private final CacheAccessManager cacheAccessManager;


    public AlbumIntegrationDAO(JdbcTemplate jdbcTemplate, CacheAccessManager cacheAccessManager) {
        this.jdbcTemplate = jdbcTemplate;
        this.cacheAccessManager = cacheAccessManager;
    }

    public void mergeAlbums(List<AlbumIntegrationDto> albums) {
        jdbcTemplate.batchUpdate(MERGE_ALBUM_SQL, new AlbumIntegrationUpsertSetter(albums, cacheAccessManager));
    }

}
