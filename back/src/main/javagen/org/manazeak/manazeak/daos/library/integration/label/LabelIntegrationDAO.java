package org.manazeak.manazeak.daos.library.integration.label;

import org.manazeak.manazeak.daos.library.integration.cover.ThumbNameUpdaterSetter;
import org.manazeak.manazeak.entity.dto.library.integration.label.LabelIntegrationDto;
import org.manazeak.manazeak.util.audio.tag.TagCheckerUtil;
import org.springframework.data.util.Pair;
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

    private static final String MERGE_LABEL = "INSERT INTO label (label_id, name, artist_released) " +
            "VALUES (?, ?, ?) " +
            "ON CONFLICT (label_id) do nothing";

    /**
     * Update the picture name for the label.
     */
    private static final String UPDATE_LABEL_PICTURE = "update label set picture_filename = ? WHERE label_id = ?";
    private final JdbcTemplate jdbcTemplate;

    public LabelIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void deleteAllLabels() {
        jdbcTemplate.execute(TRUNCATE_LABELS);
    }

    public void mergeLabel(List<LabelIntegrationDto> labels) {
        jdbcTemplate.batchUpdate(MERGE_LABEL
                ,
                new BatchPreparedStatementSetter() {

                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, labels.get(i).getLabelId());
                        ps.setString(2, labels.get(i).getName());
                        ps.setBoolean(3, !TagCheckerUtil.isArtistRecord(labels.get(i).getName()));
                    }

                    @Override
                    public int getBatchSize() {
                        return labels.size();
                    }
                }
        );
    }

    /**
     * Update the label table with the information of the new thumbnail generated.
     *
     * @param labels The information about the label and the generated image name.
     */
    public void updateLabelPicture(List<Pair<Long, String>> labels) {
        ThumbNameUpdaterSetter thumbSetter = new ThumbNameUpdaterSetter(labels);
        jdbcTemplate.batchUpdate(UPDATE_LABEL_PICTURE, thumbSetter);
    }

}
