package org.manazeak.manazeak.constant.file;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the location of the different file manipulated by the application.
 */
public enum FilePathEnum {

    COVER_FOLDER(Paths.get("/resources/covers/")),
    ARTIST_PROFILE_PIC_FOLDER(Paths.get("/resources/artist_pictures/"));

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

