package org.manazeak.manazeak.constant.file;

import lombok.Getter;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the location of the different file manipulated by the application.
 */
@Getter
public enum ResourcePathEnum {

    COVER_FOLDER(Paths.get("/resources/covers/")),
    ARTIST_PROFILE_PIC_FOLDER(Paths.get("/resources/artist_pictures/")),
    LABEL_PICTURE_FOLDER(Paths.get("/resources/label_pictures/")),
    GENRE_PICTURE_FOLDER(Paths.get("/resources/genre_pictures/")),
    MOOD_FOLDER(Paths.get("/resources/moods/")),
    MOOD_METADATA_FOLDER(Paths.get("/resources/moods_meta/"));


    /**
     * Contains the extracted covers
     */
    private final Path path;

    ResourcePathEnum(Path path) {
        this.path = path;
    }

}

