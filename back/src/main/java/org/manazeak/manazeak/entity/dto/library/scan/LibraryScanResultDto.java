package org.manazeak.manazeak.entity.dto.library.scan;

import java.nio.file.Path;
import java.util.List;
import java.util.Set;

/**
 * Contains the data from the FS scan of the library.
 */
public class LibraryScanResultDto {

    private final List<ScannedArtistDto> artists;

    private final Set<Path> coverPaths;

    public LibraryScanResultDto(List<ScannedArtistDto> artists, Set<Path> coverPaths) {
        this.artists = artists;
        this.coverPaths = coverPaths;
    }

    public List<ScannedArtistDto> getArtists() {
        return artists;
    }

    public Set<Path> getCoverPaths() {
        return coverPaths;
    }
}
