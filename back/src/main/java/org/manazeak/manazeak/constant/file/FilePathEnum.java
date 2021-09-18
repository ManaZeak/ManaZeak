package org.manazeak.manazeak.constant.file;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the location of the different file manipulated by the application.
 */
public enum FilePathEnum {

    COVER_FOLDER(Paths.get("/covers/"));

    /**
     * Contains the extracted covers
     */
    private final Path path;

    FilePathEnum(Path path) {
        this.path = path;
    }

    public Path getPath() {
        return path;
    }
}

