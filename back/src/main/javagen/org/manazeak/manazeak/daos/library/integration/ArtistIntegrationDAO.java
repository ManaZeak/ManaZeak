package org.manazeak.manazeak.daos.library.integration;

import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ArtistIntegrationDAO {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Merge into the database the new artists.
     *
     * @param artists The list of artists to merge into the database.
     */
    public void mergeArtists(List<ArtistIntegrationDto> artists) {
        // Preparing the request to insert or update the artist in the database.
        jdbcTemplate.batchUpdate(
                "INSERT INTO artist (artist_id, name, location, is_label, last_modification_date) " +
                        "VALUES (?, ?, ?, ?, ?) " +
                        "ON CONFLICT (artist_id) DO " +
                        "    UPDATE SET location = coalesce(excluded.location, artist.location)," +
                        "               is_label = excluded.is_label, " +
                        "   last_modification_date = coalesce(" +
                        "       excluded.last_modification_date, artist.last_modification_date" +
                        "   )",
                new ArtistIntegrationUpsertSetter(artists)
        );
    }

    /**
     * Create the link of the artists in the database.
     *
     * @param artistLink The pair of id of the artist.
     */
    public void linkArtists(List<Pair<Long, Long>> artistLink) {
        jdbcTemplate.batchUpdate(
                "INSERT INTO band_member (band_id, member_id) VALUES (?, ?)" +
                        "ON CONFLICT DO NOTHING",
                new BatchPreparedStatementSetter() {

                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, artistLink.get(i).getFirst());
                        ps.setLong(2, artistLink.get(i).getSecond());
                    }

                    @Override
                    public int getBatchSize() {
                        return artistLink.size();
                    }
                }
        );
    }
}
