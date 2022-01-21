package org.manazeak.manazeak.entity.dto.library.scan;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information extracted from the tags of the track inside the artist folder.
 */
public class ExtractedBandDto {

    private final List<ExtractedAlbumDto> albums = new ArrayList<>();
    private final Path location;
    private String name;
    private LocalDateTime modificationDate;

    public ExtractedBandDto(Path location) {
        this.location = location;
    }

    public void addExtractedAlbum(ExtractedAlbumDto album) {
        albums.add(album);
    }

    public List<ExtractedAlbumDto> getAlbums() {
        return albums;
    }

    public LocalDateTime getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(LocalDateTime modificationDate) {
        this.modificationDate = modificationDate;
    }

    public void addAlbum(ExtractedAlbumDto album) {
        albums.add(album);
    }

    public Path getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
