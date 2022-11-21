package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * The artist object displayed in the genre detail view.
 */
@Data
public class GenreDetailArtistDto {

    private final Long artistId;

    private final String artistName;

    private final String artistPicture;

    private final boolean isLabel;

    private final List<GenreDetailAlbumDto> albums = new ArrayList<>();

    public void addAlbum(GenreDetailAlbumDto album) {
        albums.add(album);
    }
}
