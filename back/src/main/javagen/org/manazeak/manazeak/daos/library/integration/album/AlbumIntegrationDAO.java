package org.manazeak.manazeak.daos.library.integration.album;

import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Allows to insert the information about the album into the database.
 */
@Repository
public class AlbumIntegrationDAO {

    private final JdbcTemplate jdbcTemplate;

    public AlbumIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void mergeAlbums(List<AlbumIntegrationDto> albums) {

    }

}
