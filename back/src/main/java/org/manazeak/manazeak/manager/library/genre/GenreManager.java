package org.manazeak.manazeak.manager.library.genre;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreArtistDetailBuilderDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailArtistDto;
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
            if (detailArtists.size() <= artistPos) {
                detailArtists.add(createNewArtist(artistBuilder));
            } else if (!detailArtists.get(artistPos).getArtistId().equals(artistBuilder.getArtistId())) { // If the artist is different, creating a new one.
                artistPos++;
                albumPos = 0;
                trackPos = 0;
                detailArtists.add(createNewArtist(artistBuilder));
            }

            // Handling the albums.
            // Init the first album.
            if (detailArtists.get(artistPos).getGenreDetailAlbums().isEmpty()) {
                
            }
        }

        return null;
    }

    private static GenreDetailArtistDto createNewArtist(GenreArtistDetailBuilderDto artistBuilder) {
        return new GenreDetailArtistDto(artistBuilder.getArtistId(), artistBuilder.getArtistName(), artistBuilder.getArtistPicture());
    }

}
