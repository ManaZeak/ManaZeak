package org.manazeak.manazeak.constant.library;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the static information about the music library.
 */
public final class LibraryConstant {

    /**
     * The music library in the docker container.
     */
    public static final Path LIBRARY_PATH = Paths.get("/library/");
    public static final Path ARTIST_PROFILE_PICTURE_PATH = Paths.get("/assets/artists/img");

    /**
     * The number of items that will be processed at the same time.
     */
    public static final int SCAN_BUFFER_SIZE = 1000;

    /**
     * The number of thread that will be used to extract the track of the library.
     */
    public static final int LIBRARY_SCAN_THREAD_NUMBER = 3;

    /**
     * The number of thread that will be used to extract the covers.
     */
    public static final int COVER_EXTRACTION_THREAD_NUMBER = 5;

    private LibraryConstant() {

    }
}
