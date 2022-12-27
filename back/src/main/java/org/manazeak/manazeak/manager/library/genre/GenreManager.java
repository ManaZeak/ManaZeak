package org.manazeak.manazeak.manager.library.genre;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDbDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailAlbumDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailArtistDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.manager.library.track.TrackCompleteInfoHelper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.SortedSet;

/**
 * Manager used to handle the genre of the application.
 */
@Component
@RequiredArgsConstructor
public class GenreManager {

    private final GenreDAO genreDAO;

    /**
     * Get the last track on the album object.
     *
     * @param album The album containing the tracks.
     * @return The last track of the album.
     */
    private static TrackCompleteInfoDto getLastTrack(GenreDetailAlbumDto album) {
        if (album.getTracks().isEmpty()) {
            return null;
        }
        return album.getTracks().get(album.getTracks().size() - 1);
    }

    private static <T> T getLastElement(SortedSet<T> elements) {
        if (elements.isEmpty()) {
            return null;
        }
        return elements.last();
    }

    /**
     * Get the information about the tracks of a genre.
     *
     * @param genreCompleteInfoDto The complete information about the genre.
     */
    public void getGenreCompleteInfo(GenreCompleteInfoDto genreCompleteInfoDto) {
        // Getting the elements in the database.
        List<GenreCompleteInfoDbDto> genreCompleteInfoList = genreDAO.getGenreCompleteInfoByGenreId(genreCompleteInfoDto.getGenreId());

        // Iterating to build the artists, albums and tracks.
        for (GenreCompleteInfoDbDto completeInfoDbDto : genreCompleteInfoList) {
            GenreDetailArtistDto artist = getLastElement(genreCompleteInfoDto.getArtists());
            // Adding the artists if he is not present.
            if (artist == null ||
                    !artist.getArtistId().equals(completeInfoDbDto.getArtistId())) {
                artist = completeInfoDbDto.getGenreArtistDto();
                genreCompleteInfoDto.getArtists().add(artist);
            }

            // Adding the album if it's not present.
            GenreDetailAlbumDto album = getLastElement(artist.getAlbums());
            if (album == null ||
                    !completeInfoDbDto.getAlbumId().equals(album.getAlbumId())) {
                album = completeInfoDbDto.getGenreAlbumDto();
                artist.getAlbums().add(album);
            }

            // Adding the track.
            TrackCompleteInfoDto track = getLastTrack(album);
            if (track == null || !track.getTrackId().equals(completeInfoDbDto.getTrackId())) {
                track = completeInfoDbDto.getTrackBasicInfo();
                album.addTrack(track);
            }

            // Adding the elements linked to the track.
            TrackCompleteInfoHelper.fillTrackInfo(completeInfoDbDto, track);
        }
    }

}
