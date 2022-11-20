package org.manazeak.manazeak.entity.dto.library.scan;

import lombok.Data;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information extracted from the tags of the track inside the artist folder.
 */
@Data
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

}
