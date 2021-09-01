package org.manazeak.manazeak.entity.dto.library.scan;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about a scanned album.
 */
public class ScannedAlbumDto {

    private final String albumTitle;

    private final List<ScannedTrackDto> tracks = new ArrayList<>();

    private LocalDateTime lastModificationDate;

    public ScannedAlbumDto(String albumTitle) {
        this.albumTitle = albumTitle;
    }

    public String getAlbumTitle() {
        return albumTitle;
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

    /**
     * Update the date of modification of the artist.
     *
     * @param lastModificationDate The modification of the track.
     */
    private void updateModificationDate(LocalDateTime lastModificationDate) {
        if (lastModificationDate.isAfter(this.lastModificationDate)) {
            this.lastModificationDate = lastModificationDate;
        }
    }
}
