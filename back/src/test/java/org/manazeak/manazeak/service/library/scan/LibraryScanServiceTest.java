package org.manazeak.manazeak.service.library.scan;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

/**
 * Test that the scan of the library folder works properly.
 */
class LibraryScanServiceTest extends AbstractManaZeakTest {

    @Autowired
    private LibraryScanManager libraryScanManager;

    @Test
    void testFileScan() throws IOException {
        // Setting the path of the test library
        LibraryConstant.LIBRARY_PATH = Paths.get(getApplicationPath(), "service", "library");
        // Launching the library scan.
        List<ScannedArtistDto> artists = libraryScanManager.scanLibraryFolder();
        // Checking the results.
        Assertions.assertEquals(2, artists.size(), "Wrong number of scanned artist.");
        Assertions.assertEquals(2, artists.get(0).getAlbums().size(), "Wrong number of albums.");
        Assertions.assertEquals(2, artists.get(0).getAlbums().get(0).getTracks().size(), "Wrong number of tracks.");
    }
}
