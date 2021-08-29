package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.springframework.stereotype.Component;

import java.nio.file.Path;

/**
 * Permit the scan of the music library.
 */
@Component
public class LibraryScanManager {

    void scanLibraryFolder() {
        // The path of the music library that will be scanned.
        Path libPath = LibraryConstant.LIBRARY_PATH;
        
    }


}
