package org.manazeak.manazeak.daos.library.integration.artist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.artist.ArtistTypeEnum;
import org.manazeak.manazeak.daos.library.integration.cover.ThumbNameUpdaterSetter;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.DateUtil;
import org.manazeak.manazeak.util.audio.tag.TagCheckerUtil;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ArtistIntegrationDAO {

    private static final String INSERT_BAND_MEMBERS = """
            INSERT INTO band_member (band_member_id, band_id, member_id)
            VALUES (nextval('seq_band_member'), ?, ?) ON CONFLICT (band_id, member_id) DO NOTHING
            """;

    private static final String MERGE_ARTIST = """
            INSERT INTO artist (artist_id, name, location, is_label, last_modification_date, label_id)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT (artist_id) DO
                UPDATE SET location = coalesce(excluded.location, artist.location),
                           is_label = excluded.is_label,
               last_modification_date = coalesce(excluded.last_modification_date, artist.last_modification_date)
            """;

    private static final String UPDATE_ARTIST_ADDITIONAL_INFO = """
            UPDATE artist set birth_date = ?, death_date = ?, birth_place = ?, death_place = ?,
            birth_country_id = ?, death_country_id = ?, artist_type_id = ?
            where artist_id = ?
            """;

    private static final String INSERT_MINIMAL_ARTIST = """
            INSERT INTO artist (artist_id, name, last_modification_date, is_label)
            VALUES (?, ?, ?, ?)
            """;

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
        jdbcTemplate.batchUpdate(MERGE_ARTIST,
                new ArtistIntegrationUpsertSetter(artists, cacheAccessManager)
        );
    }

    /**
     * Update the artist presents in the database with the information coming from the artists' JSON.
     *
     * @param container The extracted data from the JSON.
     */
    public void enrichArtistFromJson(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoLinkerDto linkerInfo) {
        jdbcTemplate.batchUpdate(UPDATE_ARTIST_ADDITIONAL_INFO, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(@NonNull PreparedStatement ps, int i) throws SQLException {
                // Updating the artist table with the data contained in the JSON.
                ArtistAdditionalInfoDto additionalInfo = container.getArtistAdditionalInfo().get(i);
                ps.setTimestamp(1, DateUtil.getTimeStamp(DateUtil.parseString(additionalInfo.birth(), DateUtil.US_DATE_FORMATTER)));
                ps.setTimestamp(2, DateUtil.getTimeStamp(DateUtil.parseString(additionalInfo.death(), DateUtil.US_DATE_FORMATTER)));
                ps.setString(3, additionalInfo.placeOfBirth());
                ps.setString(4, additionalInfo.placeOfDeath());
                ps.setLong(5, container.resolveCountry(additionalInfo.countryOfBirth()));
                ps.setLong(6, container.resolveCountry(additionalInfo.countryOfDeath()));
                ps.setLong(7, ArtistTypeEnum.getArtistTypeIdByCode(additionalInfo.type()));

                // Keeping the id for linking the entities after the insertion.
                linkerInfo.addAssociation(container, additionalInfo);
            }

            @Override
            public int getBatchSize() {
                return container.getArtistAdditionalInfo().size();
            }
        });
    }

    /**
     * Insert the minimal information for artists.
     *
     * @param container The data extracted from the JSON file.
     * @param artists   The list of artists' name to insert.
     */
    public void insertMinimalArtists(ArtistAdditionalInfoContainer container, List<String> artists) {
        jdbcTemplate.batchUpdate(INSERT_MINIMAL_ARTIST, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(@NonNull PreparedStatement ps, int i) throws SQLException {
                Long artistId = PkIdProvider.singleton().getNewPkId(Artist.class);
                // Adding the artist to the container.
                container.addArtist(artists.get(i), artistId);

                // Setting the data on the prepared statement.
                ps.setLong(1, artistId);
                ps.setString(2, artists.get(i));
                ps.setTimestamp(3, DateUtil.getTimeStamp(LocalDateTime.now()));
                ps.setBoolean(4, TagCheckerUtil.isArtistRecord(artists.get(i)));
            }

            @Override
            public int getBatchSize() {
                return artists.size();
            }
        });
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
                    public void setValues(@NonNull PreparedStatement ps, int i) throws SQLException {
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
