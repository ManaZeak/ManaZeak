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

    /**
     * The number of items that will be processed at the same time.
     */
    public static final int SCAN_BUFFER_SIZE = 1000;

    public static final int THREAD_NUMBER = 1;

    private LibraryConstant() {

    }
}
