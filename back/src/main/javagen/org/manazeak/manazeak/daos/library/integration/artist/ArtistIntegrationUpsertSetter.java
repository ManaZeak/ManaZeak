package org.manazeak.manazeak.daos.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;


/**
 * Object used to set the values into the prepared statement for inserting or updating the artists.
 */
public class ArtistIntegrationUpsertSetter implements BatchPreparedStatementSetter {

    private final List<ArtistIntegrationDto> artists;
    private final CacheAccessManager cacheAccessManager;

    public ArtistIntegrationUpsertSetter(List<ArtistIntegrationDto> artists, CacheAccessManager cacheAccessManager) {
        this.artists = artists;
        this.cacheAccessManager = cacheAccessManager;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        // Setting the data from the artist integration object.
        ps.setLong(1, artists.get(i).getId());
        ps.setString(2, artists.get(i).getName());
        ps.setString(3, artists.get(i).getLocation());
        ps.setBoolean(4, artists.get(i).isLabel());
        if (artists.get(i).getModificationDate() == null) {
            ps.setTimestamp(5, Timestamp.valueOf(LocalDateTime.now()));
        } else {
            ps.setTimestamp(5, Timestamp.valueOf(artists.get(i).getModificationDate()));
        }
        ps.setObject(6, cacheAccessManager.getLongValue(CacheEnum.LABEL_ID_BY_NAME, artists.get(i).getName()));
    }

    @Override
    public int getBatchSize() {
        return artists.size();
    }
}
