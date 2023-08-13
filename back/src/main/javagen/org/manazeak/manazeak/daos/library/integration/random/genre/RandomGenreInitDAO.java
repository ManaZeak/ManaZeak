package org.manazeak.manazeak.daos.library.integration.random.genre;

import org.manazeak.manazeak.daos.library.integration.random.AbstractRandomInit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RandomGenreInitDAO extends AbstractRandomInit {

    private static final String SEQUENCE_NAME = "seq_random_genre_index";

    private static final String TABLE_NAME = "random_genre";

    private static final String INIT_RANDOM_RELEASE_ARTISTS = """
            insert into random_genre (random_genre_id, random_index, genre_id)
            select nextval('seq_random_genre'), nextval('seq_random_genre_index'), genre_id from genre
            """;

    protected RandomGenreInitDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    protected String getInitRequest() {
        return INIT_RANDOM_RELEASE_ARTISTS;
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
