package org.manazeak.manazeak.daos.library.integration.artist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Links the additional information to the artist coming from the JSON.
 */
@Repository
@RequiredArgsConstructor
public class ArtistAdditionalInfoLinkerDAO {

    private static final String INSERT_ALIAS_LINK = """
            INSERT INTO artist_alias (artist_id, alias_id) VALUES (?, ?)
            """;

    private static final String INSERT_ORIGIN_COUNTRIES_LINK = """
            INSERT INTO artist_origin_country (artist_id, country_id) VALUES (?, ?)
            """;

    private static final String INSERT_TIME_INTERVALS = """
            INSERT INTO member_time_interval (artist_id, interval_id) VALUES (?, ?)
            """;

    private static final String INSERT_BAND_MEMBER = """
            INSERT INTO band_member (band_member_id, band_id, member_id) VALUES (nextval('SEQ_BAND_MEMBER'), ?, ?)
            ON CONFLICT (band_id, member_id) DO NOTHING
            """;

    private static final String INSERT_PREVIOUS_BAND_MEMBER = """
            INSERT INTO band_previous_member (band_id, prev_member_id) VALUES (?, ?)
            ON CONFLICT (band_id, prev_member_id) DO NOTHING
            """;

    private static final String INSERT_ARTIST_BIO = """
            INSERT INTO band_bio (artist_id, bio_id) VALUES (?, ?)
            """;

    private final JdbcTemplate jdbcTemplate;

    public void linkArtistAdditionalInfo(ArtistAdditionalInfoLinkerDto artistLinks) {
        // Inserting the links for the aliases
        jdbcTemplate.batchUpdate(INSERT_ALIAS_LINK, new LinkerPreparedSetter(artistLinks.getArtistAlias()));
        // Inserting the links for the origin countries.
        jdbcTemplate.batchUpdate(INSERT_ORIGIN_COUNTRIES_LINK, new LinkerPreparedSetter(artistLinks.getArtistOriginCountries()));
        // Inserting the links for the time intervals.
        jdbcTemplate.batchUpdate(INSERT_TIME_INTERVALS, new LinkerPreparedSetter(artistLinks.getArtistYearsActive()));
        // Inserting the artist members.
        jdbcTemplate.batchUpdate(INSERT_BAND_MEMBER, new LinkerPreparedSetter(artistLinks.getArtistMembers()));
        // Inserting the previous band members.
        jdbcTemplate.batchUpdate(INSERT_PREVIOUS_BAND_MEMBER, new LinkerPreparedSetter(artistLinks.getArtistPastMembers()));
        // Inserting the artist bios.
        jdbcTemplate.batchUpdate(INSERT_ARTIST_BIO, new LinkerPreparedSetter(artistLinks.getArtistBios()));
    }

    private record LinkerPreparedSetter(List<Pair<Long, Long>> elements) implements BatchPreparedStatementSetter {

        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            ps.setLong(1, elements.get(i).getFirst());
            ps.setLong(2, elements.get(i).getSecond());
        }

        @Override
        public int getBatchSize() {
            return elements.size();
        }
    }

}
