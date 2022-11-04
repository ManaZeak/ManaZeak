package org.manazeak.manazeak.entity.dto.library.album;

/**
 * Contains the minimal information needed to display an album in the front.
 */
public class AlbumMinimalInfoDto {

    private Long albumId;

    private String title;

    private String cover;

    public AlbumMinimalInfoDto(Long albumId, String title, String cover) {
        this.albumId = albumId;
        this.title = title;
        this.cover = cover;
    }

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }
}
