package org.manazeak.manazeak.constant.library.thumbnail;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the different type of element that can be used for thumbnails.
 */
@RequiredArgsConstructor
@Getter
public enum ThumbnailTypeEnum {
    GENRE(Paths.get("/assets/genres/img"), ResourcePathEnum.GENRE_PICTURE_FOLDER.getPath()),
    ALBUM(null, ResourcePathEnum.COVER_FOLDER.getPath()),
    ARTIST(Paths.get("/assets/artists/img"), ResourcePathEnum.ARTIST_PROFILE_PIC_FOLDER.getPath()),
    LABEL(Paths.get("/assets/labels/img"), ResourcePathEnum.LABEL_PICTURE_FOLDER.getPath());

    private final Path baseSourceFolder;

    private final Path baseDestFolder;
}
