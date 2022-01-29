package org.manazeak.manazeak.entity.dto.library.artist;

/**
 * Contains the minimal information of an artist.
 */
public class ArtistMinimalInfoDto {

    private String name;

    private String cover;

    private boolean isLabel;

    public ArtistMinimalInfoDto() {

    }

    public ArtistMinimalInfoDto(String name, boolean isLabel) {
        this.name = name;
        this.isLabel = isLabel;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public boolean isLabel() {
        return isLabel;
    }

    public void setLabel(boolean label) {
        isLabel = label;
    }
}

