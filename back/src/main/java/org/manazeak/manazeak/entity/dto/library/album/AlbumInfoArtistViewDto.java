package org.manazeak.manazeak.entity.dto.library.album;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;

/**
 * Contains the data needed to display an album in the artist detail page.
 */
public class AlbumInfoArtistViewDto extends AlbumMinimalInfoDto {

    private Integer releaseYear;

    public AlbumInfoArtistViewDto(Long albumId, String title, String cover, Integer releaseYear) {
        super(albumId, title, cover);
        this.releaseYear = releaseYear;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }
}
