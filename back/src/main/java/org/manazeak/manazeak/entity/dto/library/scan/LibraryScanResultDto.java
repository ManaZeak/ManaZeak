package org.manazeak.manazeak.entity.dto.library.scan;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.nio.file.Path;
import java.util.List;
import java.util.Set;

/**
 * Contains the data from the FS scan of the library.
 */
@Data
@AllArgsConstructor
public class LibraryScanResultDto {

    private final List<ScannedArtistDto> artists;

    private final Set<Path> coverPaths;

    private int totalScannedTracks;

}
