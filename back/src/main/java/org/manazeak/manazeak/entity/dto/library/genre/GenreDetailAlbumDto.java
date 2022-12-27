package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains an album in the genre page.
 */
@Data
public class GenreDetailAlbumDto implements Comparable<GenreDetailAlbumDto> {

    private final Long albumId;

    private final String albumTitle;

    private final String albumCover;

    private final LocalDate albumReleaseDate;

    private final List<TrackCompleteInfoDto> tracks = new ArrayList<>();

    /**
     * Add a track to the list of tracks of the album.
     *
     * @param track The track to add.
     */
    public void addTrack(TrackCompleteInfoDto track) {
        tracks.add(track);
    }

    @Override
    public int compareTo(GenreDetailAlbumDto genreDetailAlbumDto) {
        return albumReleaseDate.compareTo(genreDetailAlbumDto.albumReleaseDate);
    }
}
