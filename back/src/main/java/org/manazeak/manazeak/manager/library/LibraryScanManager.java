package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * Permit the scan of the music library.
 */
@Component
public class LibraryScanManager {

    /**
     * Scan the library folder to find the tracks of the library.
     *
     * @throws IOException Error during the walk.
     */
    public List<ScannedArtistDto> scanLibraryFolder() throws IOException {
        // The path of the music library that will be scanned.
        Path libPath = LibraryConstant.LIBRARY_PATH;
        // Creating the FileVisitor that will collect the tracks.
        AudioFileVisitor visitor = new AudioFileVisitor();
        // Launch the file walk.
        Files.walkFileTree(libPath, visitor);
        // Getting the scanned artist.
        return visitor.getArtists();
    }

}
