package org.manazeak.manazeak.constant.file;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the assets of the application.
 */
@RequiredArgsConstructor
@Getter
public enum AssetPathEnum {
    // Contains the addition information of the artists.
    ARTIST_ADDITIONAL_INFO_FOLDER(Paths.get("/assets/artists/txt/"));

    private final Path folder;
}
