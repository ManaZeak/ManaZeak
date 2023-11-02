package org.manazeak.manazeak.daos.library.integration.testimony;


import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.testimony.TestimonyDto;
import org.manazeak.manazeak.entity.track.Testimony;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Allows integrating the testimonies into the database.
 */
@Repository
@RequiredArgsConstructor
public class TestimonyIntegrationDAO {

    private static final String INSERT_TESTIMONY_SQL = """
            INSERT INTO testimony (testimony_id, text, artist_id, locale_id, from_artist_id) VALUES (?, ?, ?, ?, ?)
            """;

    private final JdbcTemplate jdbcTemplate;

    /**
     * Insert the testimonies into the database/
     *
     * @param container The information about the extracted information in the JSON file.
     * @param linker    The linker object used to link the newly inserted elements with the artists.
     */
    public void insertTestimonies(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoLinkerDto linker) {
        PkIdProvider.singleton().setPoolSize(Testimony.class, container.getTestimonies().size());
        jdbcTemplate.batchUpdate(INSERT_TESTIMONY_SQL, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                // Generate an id for the testimony.
                Long testimonyId = PkIdProvider.singleton().getNewPkId(Testimony.class);

                TestimonyDto testimony = container.getTestimonies().get(i);
                ps.setLong(1, testimonyId);
                ps.setString(2, testimony.getText());
                ps.setLong(3, container.resolveArtistId(testimony.getArtistName()));
                ps.setLong(4, testimony.getLocaleId());
                ps.setLong(5, container.resolveArtistId(testimony.getFrom()));
            }

            @Override
            public int getBatchSize() {
                return container.getTestimonies().size();
            }
        });
    }
}
