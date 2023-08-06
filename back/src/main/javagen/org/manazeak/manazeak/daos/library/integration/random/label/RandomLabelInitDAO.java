package org.manazeak.manazeak.daos.library.integration.random.label;

import org.manazeak.manazeak.daos.library.integration.random.AbstractRandomInit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Allows to fill the table containing the random labels.
 */
@Repository
public class RandomLabelInitDAO extends AbstractRandomInit {

    private static final String SEQUENCE_NAME = "seq_random_label_index";

    private static final String TABLE_NAME = "random_label";

    private static final String INIT_RANDOM_LABELS = """
            insert into random_label (random_label_id, random_index, label_id)
            select nextval('seq_random_label'), nextval('seq_random_label_index'), label_id from label
            where artist_released = false
            """;

    protected RandomLabelInitDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    protected String getInitRequest() {
        return INIT_RANDOM_LABELS;
    }

    @Override
    protected String getSequenceName() {
        return SEQUENCE_NAME;
    }

    @Override
    protected String getTableName() {
        return TABLE_NAME;
    }
}
