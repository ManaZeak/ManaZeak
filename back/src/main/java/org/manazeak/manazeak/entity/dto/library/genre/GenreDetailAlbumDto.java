package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains an album in the genre page.
 */
@Data
public class GenreDetailAlbumDto {

    private final Long albumId;

    private final String albumTitle;

    private final String albumCover;

    private final List<MinimalTrackInfoDto> tracks = new ArrayList<>();

    /**
     * Add a track to the list of tracks of the album.
     *
     * @param track The track to add.
     */
    public void addTrack(MinimalTrackInfoDto track) {
        tracks.add(track);
    }
}
