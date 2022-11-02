package org.manazeak.manazeak.daos.library.integration.genre;

import org.manazeak.manazeak.daos.library.integration.cover.ThumbNameUpdaterSetter;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Update the picture of the genre.
 */
@Repository
public class GenrePictureIntegrationDAO {

    private static final String UPDATE_GENRE_PICTURES = "UPDATE genre SET picture_filename = ? where genre_id = ?";

    private final JdbcTemplate jdbcTemplate;


    public GenrePictureIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Updating the picture of the genre.
     *
     * @param genres The picture linked to the genre.
     */
    public void updateGenrePictures(List<Pair<Long, String>> genres) {
        ThumbNameUpdaterSetter thumbSetter = new ThumbNameUpdaterSetter(genres);
        jdbcTemplate.batchUpdate(UPDATE_GENRE_PICTURES, thumbSetter);
    }
}
