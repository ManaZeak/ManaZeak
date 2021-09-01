package org.manazeak.manazeak.entity.dto.library.scan;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about a scanned artist directory.
 */
public class ScannedArtistDto {

    private final String artistFolder;

    private final Path artistPath;

    private final List<ScannedAlbumDto> albums = new ArrayList<>();

    private LocalDateTime lastModificationDate;

    public ScannedArtistDto(Path artistFolder) {
        this.artistFolder = artistFolder.getFileName().toString();
        artistPath = artistFolder;
    }

    public Path getArtistPath() {
        return artistPath;
    }

    public String getArtistFolder() {
        return artistFolder;
    }

    public List<ScannedAlbumDto> getAlbums() {
        return albums;
    }

    public LocalDateTime getLastModificationDate() {
        return lastModificationDate;
    }

    public void addAlbum(ScannedAlbumDto album) {
        updateLastModificationDate(album.getLastModificationDate());
        albums.add(album);
    }

    private void updateLastModificationDate(LocalDateTime lastModificationDateAlbum) {
        if (lastModificationDateAlbum.isAfter(lastModificationDate)) {
            lastModificationDate = lastModificationDateAlbum;
        }
    }
}
