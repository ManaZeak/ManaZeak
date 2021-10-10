package org.manazeak.manazeak.constant.library;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the static information about the music library. Override the class from the standard application.
 */
public final class LibraryConstant {

    /** The music library in the docker container. */
    public static Path LIBRARY_PATH;

    /** The number of items that will be processed at the same time. */
    public static final int SCAN_BUFFER_SIZE = 1000;

    /**
     * The number of thread that will be used to extract the track of the library.
     */
    public static final int LIBRARY_SCAN_THREAD_NUMBER = 1;

    /**
     * The number of thread that will be used to extract the covers.
     */
    public static final int COVER_EXTRACTION_THREAD_NUMBER = 5;


    private LibraryConstant() {

    }
}
