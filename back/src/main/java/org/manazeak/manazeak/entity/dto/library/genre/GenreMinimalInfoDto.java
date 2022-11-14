package org.manazeak.manazeak.entity.dto.library.genre;

/**
 * Contains the minimal information to display a genre.
 */
public class GenreMinimalInfoDto {

    private  Long genreId;

    private  String name;

    private String picture;

    public GenreMinimalInfoDto(Long genreId, String name, String picture) {
        this.genreId = genreId;
        this.name = name;
        this.picture = picture;
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
