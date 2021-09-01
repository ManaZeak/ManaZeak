package org.manazeak.manazeak.entity.dto.library.scan;

import org.manazeak.manazeak.util.DateUtil;

import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDateTime;

/**
 * Contains the information about a track.
 */
public class ScannedTrackDto {

    private final Path trackPath;

    private final LocalDateTime lastModificationDate;

    private final LocalDateTime creationDate;

    public ScannedTrackDto(Path trackPath, BasicFileAttributes fileAttributes) {
        this.trackPath = trackPath;
        this.lastModificationDate = DateUtil.parseLocalDateTimeString(fileAttributes.lastModifiedTime().toMillis());
        this.creationDate = DateUtil.parseLocalDateTimeString(fileAttributes.creationTime().toMillis());
    }

    public LocalDateTime getLastModificationDate() {
        return lastModificationDate;
    }

    public Path getTrackPath() {
        return trackPath;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    /**
     * Get the date of the file that is the most recent.
     * @return The most recent date.
     */
    public LocalDateTime getMostRecentDate() {
        if (lastModificationDate.isAfter(creationDate)) {
            return lastModificationDate;
        } else {
            return creationDate;
        }
    }
}
