package org.manazeak.manazeak.entity.dto.library.scan;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about a scanned album.
 */
public class ScannedAlbumDto {

    private final String albumTitle;

    private final List<ScannedTrackDto> tracks = new ArrayList<>();

    public ScannedAlbumDto(String albumTitle) {
        this.albumTitle = albumTitle;
    }

    public String getAlbumTitle() {
        return albumTitle;
    }

    public void addTrack(ScannedTrackDto track) {
        tracks.add(track);
    }

    public List<ScannedTrackDto> getTracks() {
        return tracks;
    }
}
