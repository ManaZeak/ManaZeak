package org.manazeak.manazeak.entity.dto.library.scan;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information of the artist composing a band.
 */
public class ExtractedArtistDto {

    private final String name;

    private final String realName;

    private final List<ExtractedAlbumDto> albums = new ArrayList<>();

    public ExtractedArtistDto(String name, String realName) {
        this.name = name;
        this.realName = realName;
    }

    /**
     * Add an album to the list of albums.
     */
    public void addAlbum(ExtractedAlbumDto album) {
        albums.add(album);
    }

    public List<ExtractedAlbumDto> getAlbums() {
        return albums;
    }

    public String getName() {
        return name;
    }

    public String getRealName() {
        return realName;
    }
}
