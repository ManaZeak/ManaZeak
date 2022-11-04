package org.manazeak.manazeak.service.library.artist;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.daos.track.BandMemberDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistDetailsDto;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.artist.ArtistHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Allows to interact with the artists of the application.
 */
@TransactionalWithRollback
@Service
public class ArtistService {

    private final ArtistDAO artistDAO;

    private final BandMemberDAO bandMemberDAO;

    public ArtistService(ArtistDAO artistDAO, BandMemberDAO bandMemberDAO) {
        this.artistDAO = artistDAO;
        this.bandMemberDAO = bandMemberDAO;
    }


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
    public List<ArtistMinimalInfoDto> getAllArtistsMinimal() {
        List<Artist> artists = artistDAO.getArtistByLocationNotNull();
        List<ArtistMinimalInfoDto> minimalArtist = new ArrayList<>();

        for (Artist artist : artists) {
            minimalArtist.add(ArtistHelper.convertArtist(artist));
        }

        return minimalArtist;
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
