package org.manazeak.manazeak.entity.dto.library.integration.genre;

/**
 * Contains the information of a genre needed to be inserted in the database.
 */
public class GenreIntegrationDto {

    private Long genreId;

    private String genreName;

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }
}
