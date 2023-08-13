package org.manazeak.manazeak.service.library.album;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.library.album.AlbumContributionTypeEnum;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.album.AlbumContributionMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.track.TrackManager;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Interacts with the albums in the database.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumDAO albumDAO;

    private final TrackManager trackManager;

    /**
     * Get the albums of the given artist
     *
     * @param artistId The id of the artist.
     * @return The list of albums made by the artist.
     */
    public List<AlbumMinimalInfoDto> getMinimalAlbumByArtistId(Long artistId) {
        return albumDAO.getMinimalAlbumByArtistId(artistId);
    }

    /**
     * Get a map containing list of album linked to type of contribution.
     *
     * @param artistId The id of the artist.
     * @return The map containing the albums linked to the contribution type.
     */
    public Map<AlbumContributionTypeEnum, List<AlbumMinimalInfoDto>> getMinimalAlbumContributionByArtistId(Long artistId) {
        List<AlbumContributionMinimalInfoDto> contributions = albumDAO.getMinimalAlbumContributionByArtistId(artistId);
        Map<AlbumContributionTypeEnum, List<AlbumMinimalInfoDto>> contribMap = AlbumContributionTypeEnum.getEmptyContribMap();
        // Adding the elements for the contributions.
        for (AlbumContributionMinimalInfoDto contrib : contributions) {
            contribMap.get(AlbumContributionTypeEnum.getTypeOfContribution(contrib)).add(contrib);
        }

        return contribMap;
    }

    /**
     * Get the album information from the database.
     *
     * @param albumId The id of the album.
     * @return The detail of the album.
     */
    public AlbumDetailsDto getAlbumInformation(Long albumId) {
        // Getting the album in the database.
        AlbumDetailsDto album = albumDAO.getAlbumDetailsById(albumId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("error.album.not_found"));

        // Adding the tracks to the albums and the performers.
        trackManager.getCompleteTracksInfoFromAlbum(album);

        return album;
    }

}
