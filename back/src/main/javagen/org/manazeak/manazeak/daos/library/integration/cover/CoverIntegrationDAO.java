package org.manazeak.manazeak.daos.library.integration.cover;

import org.manazeak.manazeak.daos.library.integration.album.AlbumCoverSetter;
import org.manazeak.manazeak.entity.track.Cover;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Integrate the cover information into the database.
 */
@Repository
public class CoverIntegrationDAO {

    private static final String SQL_COVER_INSERT = "INSERT INTO cover (cover_id, filename) " +
            " VALUES (?, ?) ON CONFLICT (filename) DO NOTHING";

    private static final String SQL_ALBUM_LINKER_COVER = "UPDATE album set cover_id = ? where album_id = ?";
    private final JdbcTemplate jdbcTemplate;

    public CoverIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Insert a list of covers into the database.
     *
     * @param covers The covers to be inserted into
     */
    public void insertCovers(List<Cover> covers) {
        IntegrationCoverSetter coverSetter = new IntegrationCoverSetter(covers);
        jdbcTemplate.batchUpdate(SQL_COVER_INSERT, coverSetter);
    }

    /**
     * Update the information about the album cover in the database.
     *
     * @param albumCovers The relation between the album and the cover to be inserted into the database.
     */
    public void updateAlbumCovers(List<Pair<Long, Long>> albumCovers) {
        AlbumCoverSetter coverSetter = new AlbumCoverSetter(albumCovers);
        jdbcTemplate.batchUpdate(SQL_ALBUM_LINKER_COVER, coverSetter);
    }
}
