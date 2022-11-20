package org.manazeak.manazeak.entity.dto.library.scan;

import lombok.Data;
import org.manazeak.manazeak.util.DateUtil;

import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDateTime;

/**
 * Contains the information about a track.
 */
@Data
public class ScannedTrackDto {

    private final Path trackPath;

    private final LocalDateTime lastModificationDate;

    private final LocalDateTime creationDate;

    private final boolean isMp3;

    public ScannedTrackDto(Path trackPath, BasicFileAttributes fileAttributes, boolean isMp3) {
        this.trackPath = trackPath;
        this.lastModificationDate = DateUtil.parseLocalDateTimeString(fileAttributes.lastModifiedTime().toMillis());
        this.creationDate = DateUtil.parseLocalDateTimeString(fileAttributes.creationTime().toMillis());
        this.isMp3 = isMp3;
    }

    /**
     * Get the date of the file that is the most recent.
     *
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
