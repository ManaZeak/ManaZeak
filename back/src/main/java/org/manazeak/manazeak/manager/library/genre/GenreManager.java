package org.manazeak.manazeak.manager.library.genre;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreArtistDetailBuilderDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailAlbumDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailArtistDto;
import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;
import org.manazeak.manazeak.entity.track.Genre;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Manager used to handle the genre of the application.
 */
@Component
@RequiredArgsConstructor
public class GenreManager {

    private final GenreDAO genreDAO;

    /**
     * Create a new album from the data of the genre of the database.
     * @param artistBuilder The information from the database.
     * @return The album.
     */
    private static GenreDetailAlbumDto creatNewAlbum(GenreArtistDetailBuilderDto artistBuilder) {
        return new GenreDetailAlbumDto(artistBuilder.getAlbumId(), artistBuilder.getAlbumTitle(), artistBuilder.getAlbumCover());
    }

    private static GenreDetailArtistDto createNewArtist(GenreArtistDetailBuilderDto artistBuilder) {
        return new GenreDetailArtistDto(artistBuilder.getArtistId(), artistBuilder.getArtistName(), artistBuilder.getArtistPicture(), artistBuilder.getArtistIsLabel());
    }

    private static MinimalTrackInfoDto createMinimalTrackInfo(GenreArtistDetailBuilderDto artistBuilder) {
        return new MinimalTrackInfoDto(artistBuilder.getTrackId(), artistBuilder.getTrackTitle(), artistBuilder.getTrackDuration());
    }

    /**
     * Get the information of the artist and the subsequent objects from the genre id.
     *
     * @param genreId The id of the genre in the database.
     * @return The artists linked to this genre.
     */
    public List<GenreDetailArtistDto> getArtistsInfoByGenreId(Long genreId) {
        List<GenreArtistDetailBuilderDto> artistBuilders = genreDAO.getGenreDetailById(genreId);
        List<GenreDetailArtistDto> detailArtists = new ArrayList<>();

        int artistPos = 0;
        int albumPos = 0;
        int trackPos = 0;

        for (GenreArtistDetailBuilderDto artistBuilder : artistBuilders) {
            // Handling the artist first.
            // If the artist position is out of bound, creating a new artist.
            if (detailArtists.isEmpty()) {
                detailArtists.add(createNewArtist(artistBuilder));
            } else if (!detailArtists.get(artistPos).getArtistId().equals(artistBuilder.getArtistId())) { // If the artist is different, creating a new one.
                artistPos++;
                albumPos = 0;
                trackPos = 0;
                detailArtists.add(createNewArtist(artistBuilder));
            }

            // Handling the albums.
            GenreDetailArtistDto artist = detailArtists.get(artistPos);
            // Init the first album.
            if (artist.getAlbums().isEmpty()) {
                artist.addAlbum(creatNewAlbum(artistBuilder));
            } else if (!artist.getAlbums().get(albumPos).getAlbumId().equals(artistBuilder.getAlbumId())) {
                albumPos++;
                trackPos = 0;
                artist.addAlbum(creatNewAlbum(artistBuilder));
            }

            // Handling the tracks.
            GenreDetailAlbumDto album = artist.getAlbums().get(albumPos);
            if (album.getTracks().isEmpty()) {
                album.addTrack(createMinimalTrackInfo(artistBuilder));
            } else if (!album.getTracks().get(trackPos).getTrackId().equals(artistBuilder.getTrackId())) {
                trackPos++;
                album.addTrack(createMinimalTrackInfo(artistBuilder));
            }
        }

        return detailArtists;
    }

}
