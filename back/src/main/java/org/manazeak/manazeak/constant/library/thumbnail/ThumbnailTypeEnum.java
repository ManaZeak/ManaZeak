package org.manazeak.manazeak.constant.library.thumbnail;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.exception.MzkRuntimeException;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Contains the different type of element that can be used for thumbnails.
 */
@RequiredArgsConstructor
@Getter
public enum ThumbnailTypeEnum {
    GENRE(Paths.get("/assets/genres/img"), ResourcePathEnum.GENRE_PICTURE_FOLDER.getPath(), 1L),
    ALBUM(null, ResourcePathEnum.COVER_FOLDER.getPath(), 2L),
    ARTIST(Paths.get("/assets/artists/img"), ResourcePathEnum.ARTIST_PROFILE_PIC_FOLDER.getPath(), 3L),
    LABEL(Paths.get("/assets/labels/img"), ResourcePathEnum.LABEL_PICTURE_FOLDER.getPath(), 4L);

    private final Path baseSourceFolder;

    private final Path baseDestFolder;

    private final Long entityTypeId;

    public static ThumbnailTypeEnum getThumbTypeByEntityTypeId(Long entityTypeId) {
        for (ThumbnailTypeEnum value : values()) {
            if (value.entityTypeId.equals(entityTypeId)) {
                return value;
            }
        }

        throw new MzkRuntimeException("No entity found for this entity id: " + entityTypeId);
    }
}
