package org.manazeak.manazeak.entity.dto.library.scan;

import lombok.Data;

import java.nio.file.Path;
import java.util.List;
import java.util.Set;

/**
 * Contains the data from the FS scan of the library.
 */
@Data
public class LibraryScanResultDto {

    private final List<ScannedArtistDto> artists;

    private final Set<Path> coverPaths;

    private final int totalScannedTracks;

}
