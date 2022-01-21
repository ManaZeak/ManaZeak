package org.manazeak.manazeak.daos.library.integration;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;


/**
 * Object used to set the values into the prepared statement for inserting or updating the artists.
 */
public class ArtistIntegrationUpsertSetter implements BatchPreparedStatementSetter {

    private final List<ArtistIntegrationDto> artists;

    public ArtistIntegrationUpsertSetter(List<ArtistIntegrationDto> artists) {
        this.artists = artists;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        // Setting the data from the artist integration object.
        ps.setLong(1, artists.get(i).getId());
        ps.setString(2, artists.get(i).getName());
        ps.setString(3, artists.get(i).getLocation());
        ps.setBoolean(4, artists.get(i).isLabel());
        if (artists.get(i).getModificationDate() == null) {
            ps.setNull(5, Types.TIMESTAMP);
        } else {
            ps.setTimestamp(5, Timestamp.valueOf(artists.get(i).getModificationDate()));
        }
    }

    @Override
    public int getBatchSize() {
        return artists.size();
    }
}
