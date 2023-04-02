package org.manazeak.manazeak.daos.library.integration.artist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.cover.ThumbNameUpdaterSetter;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ArtistIntegrationDAO {

    private static final String INSERT_BAND_MEMBERS = "INSERT INTO band_member (band_member_id, band_id, member_id) " +
            "VALUES (nextval('seq_band_member'), ?, ?) ON CONFLICT (band_id, member_id) DO NOTHING";

    private static final String UPDATE_ARTIST_THUMB = "UPDATE artist SET picture_filename = ? WHERE artist_id = ?";

    private final JdbcTemplate jdbcTemplate;

    private final CacheAccessManager cacheAccessManager;

    /**
     * Merge into the database the new artists.
     *
     * @param artists The list of artists to merge into the database.
     */
    public void mergeArtists(List<ArtistIntegrationDto> artists) {
        // Preparing the request to insert or update the artist in the database.
        jdbcTemplate.batchUpdate(
                "INSERT INTO artist (artist_id, name, location, is_label, last_modification_date, label_id) " +
                        "VALUES (?, ?, ?, ?, ?, ?) " +
                        "ON CONFLICT (artist_id) DO " +
                        "    UPDATE SET location = coalesce(excluded.location, artist.location)," +
                        "               is_label = excluded.is_label, " +
                        "   last_modification_date = coalesce(excluded.last_modification_date, artist.last_modification_date)",
                new ArtistIntegrationUpsertSetter(artists, cacheAccessManager)
        );
    }

    /**
     * Creating the link between the artist and the band members.
     *
     * @param artistLinks The links between the artist
     */
    public void createBandMembers(List<Pair<Long, Long>> artistLinks) {
        jdbcTemplate.batchUpdate(
                INSERT_BAND_MEMBERS,
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        // Setting the band_id
                        ps.setLong(1, artistLinks.get(i).getFirst());
                        // Setting the member id.
                        ps.setLong(2, artistLinks.get(i).getSecond());
                    }

                    @Override
                    public int getBatchSize() {
                        return artistLinks.size();
                    }
                }
        );
    }

    /**
     * Update the artist picture.
     *
     * @param artistPicture The list of objects linking the id of the artist to the name.
     */
    public void updateThumbArtistPicture(List<Pair<Long, String>> artistPicture) {
        ThumbNameUpdaterSetter thumbSetter = new ThumbNameUpdaterSetter(artistPicture);
        jdbcTemplate.batchUpdate(UPDATE_ARTIST_THUMB, thumbSetter);
    }
}
