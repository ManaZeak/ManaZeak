package org.manazeak.manazeak.daos.library.integration.random.artist;

import org.manazeak.manazeak.daos.library.integration.random.AbstractRandomInit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Allows to generate the random table from the artists.
 */
@Repository
public class RandomReleaseArtistInitDAO extends AbstractRandomInit {

    private static final String SEQUENCE_NAME = "seq_random_release_artist_index";

    private static final String TABLE_NAME = "random_release_artist";

    private static final String INIT_RANDOM_RELEASE_ARTISTS = "insert into random_release_artist (random_release_artist_id, random_index, artist_id) " +
            "select nextval('seq_random_release_artist'), nextval('seq_random_release_artist_index'), artist_id from ( " +
            "select distinct art.artist_id artist_id " +
            "from artist art " +
            "inner join album a on art.artist_id = a.artist_id " +
            "order by art.artist_id) artists";


    public RandomReleaseArtistInitDAO(JdbcTemplate jdbcTemplate) {
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
