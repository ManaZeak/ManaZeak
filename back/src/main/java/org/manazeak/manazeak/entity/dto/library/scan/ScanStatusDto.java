package org.manazeak.manazeak.entity.dto.library.scan;

import java.time.LocalDateTime;

/**
 * Contains the data about a scan on the library to display to the user.
 * @param statusCode The code of the status in the NLS files.
 * @param stepNumber The step number corresponding to this state.
 */
public record ScanStatusDto(String statusCode, Long stepNumber, LocalDateTime startedAt) {
}
