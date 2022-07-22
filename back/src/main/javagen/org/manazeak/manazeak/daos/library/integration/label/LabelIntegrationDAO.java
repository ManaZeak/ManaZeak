package org.manazeak.manazeak.daos.library.integration.label;

import org.manazeak.manazeak.entity.dto.library.integration.label.LabelIntegrationDto;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Allows to upsert the label into the database.
 */
@Repository
public class LabelIntegrationDAO {
    private static final String TRUNCATE_LABELS = "truncate table label CASCADE";
    private final JdbcTemplate jdbcTemplate;

    public LabelIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void deleteAllLabels() {
        jdbcTemplate.execute(TRUNCATE_LABELS);
    }

    public void mergeLabel(List<LabelIntegrationDto> label) {
        jdbcTemplate.batchUpdate(
                "INSERT INTO label (label_id, name) " +
                        "VALUES (?, ?) " +
                        "ON CONFLICT (label_id) do update set name = excluded.name",
                new BatchPreparedStatementSetter() {

                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, label.get(i).getLabelId());
                        ps.setString(2, label.get(i).getName());
                    }

                    @Override
                    public int getBatchSize() {
                        return label.size();
                    }
                }
        );
    }

}
