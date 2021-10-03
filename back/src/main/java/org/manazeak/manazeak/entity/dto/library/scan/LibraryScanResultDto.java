package org.manazeak.manazeak.entity.dto.library.scan;

import java.nio.file.Path;
import java.util.List;

/**
 * Contains the data from the FS scan of the library.
 */
public class LibraryScanResultDto {

    private final List<ScannedArtistDto> artists;

    private final List<Path> coverPaths;

    public LibraryScanResultDto(List<ScannedArtistDto> artists, List<Path> coverPaths) {
        this.artists = artists;
        this.coverPaths = coverPaths;
    }

    public List<ScannedArtistDto> getArtists() {
        return artists;
    }

    public List<Path> getCoverPaths() {
        return coverPaths;
    }
}
