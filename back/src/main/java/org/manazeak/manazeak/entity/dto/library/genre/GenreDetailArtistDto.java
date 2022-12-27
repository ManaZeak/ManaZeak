package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Objects;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 * The artist object displayed in the genre detail view.
 */
@Getter
@RequiredArgsConstructor
public class GenreDetailArtistDto implements Comparable<GenreDetailArtistDto> {

    private final Long artistId;

    private final String artistName;

    private final String artistPicture;

    private final boolean isLabel;

    private final SortedSet<GenreDetailAlbumDto> albums = new TreeSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GenreDetailArtistDto that = (GenreDetailArtistDto) o;
        return Objects.equals(artistId, that.artistId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(artistId);
    }

    @Override
    public int compareTo(GenreDetailArtistDto genreDetailArtistDto) {
        return artistName.compareTo(genreDetailArtistDto.getArtistName());
    }
}
