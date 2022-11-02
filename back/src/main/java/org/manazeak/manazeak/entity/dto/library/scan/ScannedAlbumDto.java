package org.manazeak.manazeak.entity.dto.library.scan;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about a scanned album.
 */
public class ScannedAlbumDto {

    private final List<ScannedTrackDto> tracks = new ArrayList<>();
    private final Path location;
    private LocalDateTime lastModificationDate;

    public ScannedAlbumDto(Path location) {
        this.location = location;
    }

    /**
     * Adding the track to the container and update the last modification date
     *
     * @param track The information about the track on the FS.
     */
    public void addTrack(ScannedTrackDto track) {
        updateModificationDate(track.getMostRecentDate());
        tracks.add(track);
    }

    public List<ScannedTrackDto> getTracks() {
        return tracks;
    }

    public LocalDateTime getLastModificationDate() {
        return lastModificationDate;
    }

    public Path getLocation() {
        return location;
    }

    /**
     * Update the date of modification of the artist.
     *
     * @param lastModificationDate The modification of the track.
     */
    private void updateModificationDate(LocalDateTime lastModificationDate) {
        // Nothing to do if the file has no modification date.
        if (lastModificationDate == null) {
            return;
        }
        if (this.lastModificationDate == null || lastModificationDate.isAfter(this.lastModificationDate)) {
            this.lastModificationDate = lastModificationDate;
        }
    }
}
