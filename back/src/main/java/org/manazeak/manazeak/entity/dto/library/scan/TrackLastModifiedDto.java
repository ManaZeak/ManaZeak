package org.manazeak.manazeak.entity.dto.library.scan;

import java.time.LocalDateTime;

/**
 * @param trackPath    The path of the file on the file system.
 * @param lastModified The last modified date of the file.
 */
public record TrackLastModifiedDto(
        String trackPath,
        LocalDateTime lastModified
) {

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof TrackLastModifiedDto that)) return false;

        return trackPath.equals(that.trackPath);
    }

    @Override
    public int hashCode() {
        return trackPath.hashCode();
    }
}
