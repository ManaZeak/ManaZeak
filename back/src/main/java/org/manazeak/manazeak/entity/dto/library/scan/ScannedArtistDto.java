package org.manazeak.manazeak.entity.dto.library.scan;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about a scanned artist directory.
 */
public class ScannedArtistDto {

    private String artistFolder;

    private List<ScannedAlbumDto> albums = new ArrayList<>();

    public ScannedArtistDto(String artistFolder) {
        this.artistFolder = artistFolder;
    }

    public String getArtistFolder() {
        return artistFolder;
    }

    public List<ScannedAlbumDto> getAlbums() {
        return albums;
    }

    public void addAlbum(ScannedAlbumDto album) {
        albums.add(album);
    }
}
