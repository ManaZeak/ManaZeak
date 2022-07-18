package org.manazeak.manazeak.daos.library.integration.album;

import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Setter for the batch update or insert of the albums.
 */
public class AlbumIntegrationUpsertSetter implements BatchPreparedStatementSetter {

    private final List<AlbumIntegrationDto> albums;

    public AlbumIntegrationUpsertSetter(List<AlbumIntegrationDto> albums) {
        this.albums = albums;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {

    }

    @Override
    public int getBatchSize() {
        return albums.size();
    }
}
