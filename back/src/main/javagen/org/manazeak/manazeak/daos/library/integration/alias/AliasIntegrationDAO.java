package org.manazeak.manazeak.daos.library.integration.alias;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.track.Alias;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AliasIntegrationDAO {

    private static final String ALIAS_INTEGRATION_SQL = """
            insert into alias (alias_id, value) VALUES (?, ?)
            """;

    private final JdbcTemplate jdbcTemplate;

    /**
     * Insert the aliases into the database.
     *
     * @param container     The information about the aliases inserted.
     * @param aliasToInsert The alias not in the database that will be inserted.
     */
    public void insertAlias(ArtistAdditionalInfoContainer container, List<String> aliasToInsert) {
        jdbcTemplate.batchUpdate(ALIAS_INTEGRATION_SQL, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(@NonNull PreparedStatement ps, int i) throws SQLException {
                Long aliasId = PkIdProvider.singleton().getNewPkId(Alias.class);

                // Set the values
                ps.setLong(1, aliasId);
                ps.setString(2, aliasToInsert.get(i));

                // Set the alias into the alias map.
                container.addAlias(aliasToInsert.get(i), aliasId);
            }

            @Override
            public int getBatchSize() {
                return aliasToInsert.size();
            }
        });
    }
}
