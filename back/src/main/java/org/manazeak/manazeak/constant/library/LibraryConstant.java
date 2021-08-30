package org.manazeak.manazeak.constant.library;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the static information about the music library.
 */
public final class LibraryConstant {

    /** The music library in the docker container. */
    public static final Path LIBRARY_PATH = Paths.get("/library/");

    private LibraryConstant() {

    }
}
