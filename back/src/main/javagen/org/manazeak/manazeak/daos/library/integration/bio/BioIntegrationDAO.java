package org.manazeak.manazeak.daos.library.integration.bio;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.bio.BioDto;
import org.manazeak.manazeak.entity.track.Bio;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Allows inserting in the database the bio of the artists.
 */
@Repository
@RequiredArgsConstructor
public class BioIntegrationDAO {

    private static final String INSERT_BIOS = """
            INSERT INTO bio (bio_id, text, locale_id) VALUES (?, ?, ?)
            """;
    private final JdbcTemplate jdbcTemplate;

    /**
     * Insert the bio into the database and create the links between the artists and the bios.
     *
     * @param container The element extracted from the artist JSON.
     * @param linker    The object to store the association between artists and bios.
     */
    public void insertBios(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoLinkerDto linker) {
        // Setting the size for the id generator.
        PkIdProvider.singleton().setPoolSize(Bio.class, container.getBios().size());
        jdbcTemplate.batchUpdate(INSERT_BIOS, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                // Generating the id of the bio.
                BioDto bio = container.getBios().get(i);
                Long bioId = PkIdProvider.singleton().getNewPkId(Bio.class);
                ps.setLong(1, bioId);
                ps.setString(2, bio.getText());
                ps.setLong(3, bio.getLocaleId());

                // Adding the bio in the linker.
                linker.addBioLink(bioId, container.resolveArtistId(bio.getArtistName()));
            }

            @Override
            public int getBatchSize() {
                return container.getBios().size();
            }
        });
    }

}
