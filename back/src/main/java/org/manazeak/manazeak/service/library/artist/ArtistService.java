package org.manazeak.manazeak.service.library.artist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.daos.track.BandMemberDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistDetailsDto;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.artist.ArtistHelper;
import org.manazeak.manazeak.manager.library.random.artist.RandomReleaseArtistManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Allows interacting with the artists of the application.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistDAO artistDAO;

    private final BandMemberDAO bandMemberDAO;

    private final RandomReleaseArtistManager randomReleaseArtistManager;

    /**
     * Get the minimal information needed to display an artist.
     *
     * @param artistId The id of the artist.
     * @return The minimal information.
     */
    public ArtistMinimalInfoDto getArtistMinimalInfo(Long artistId) {
        Artist artist = artistDAO.findById(artistId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("artist.error.not_found"));
        // Transform the artist information into the DTO.
        return ArtistHelper.convertArtist(artist);
    }

    /**
     * Get all the artist in the database with the minimal information.
     *
     * @return The list of artists.
     */
    @Cacheable("all_artists_view")
    public List<ArtistMinimalInfoDto> getAllReleaseArtistsMinimal() {
        return artistDAO.getAllReleaseArtistMinimalInfo();
    }

    /**
     * @param nbArtists The number of random artist to get in the database.
     * @return X artist found at random in the database.
     */
    public List<ArtistMinimalInfoDto> getSomeRandomArtistMinimal(int nbArtists) {
        return randomReleaseArtistManager.getRandomElements(nbArtists);
    }

    /**
     * Get the information about a specific artist in the database.
     *
     * @return The detail of the artist.
     */
    public ArtistDetailsDto getArtistDetail(Long artistId) {
        // Getting the information of the artist.
        ArtistDetailsDto detail = artistDAO.getArtistDetailById(artistId).orElseThrow(
                MzkExceptionHelper.generateSupplierObjectNotFoundException("artist.error.not_found")
        );
        // Getting the minimal information on the members.
        List<Artist> members = bandMemberDAO.getLinkedArtists(detail.getArtistId());
        for (Artist member : members) {
            detail.addMember(ArtistHelper.convertArtist(member));
        }

        return detail;
    }
}
