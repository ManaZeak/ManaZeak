package org.manazeak.manazeak.constant.library;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the static information about the music library.
 */
public final class LibraryConstant {

    private LibraryConstant() {

    }

    /** The music library in the docker container. */
    public static Path LIBRARY_PATH = Paths.get("/library/");

}
