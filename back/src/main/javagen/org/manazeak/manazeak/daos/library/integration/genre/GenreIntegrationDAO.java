package org.manazeak.manazeak.daos.library.integration.genre;

import org.manazeak.manazeak.entity.dto.library.integration.genre.GenreIntegrationDto;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class GenreIntegrationDAO {

    private final JdbcTemplate jdbcTemplate;


    public GenreIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Insert or update genre inside the database.
     *
     * @param genres The list of genre to insert or update in the database.
     */
    public void mergeGenres(List<GenreIntegrationDto> genres) {
        // Preparing the request to insert or update the artist in the database.
        jdbcTemplate.batchUpdate(
                "INSERT INTO genre (genre_id, name) VALUES (?, ?) ON CONFLICT DO NOTHING",
                new BatchPreparedStatementSetter() {

                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, genres.get(i).getGenreId());
                        ps.setString(2, genres.get(i).getGenreName());
                    }

                    @Override
                    public int getBatchSize() {
                        return genres.size();
                    }
                }
        );
    }

}
