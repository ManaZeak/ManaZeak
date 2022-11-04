package org.manazeak.manazeak.service.library.album;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Interacts with the albums in the database.
 */
@TransactionalWithRollback
@Service
public class AlbumService {

    private final AlbumDAO albumDAO;

    public AlbumService(AlbumDAO albumDAO) {
        this.albumDAO = albumDAO;
    }

    /**
     * Get the albums of the given artist
     *
     * @param artistId The id of the artist.
     * @return The list of albums made by the artist.
     */
    public List<AlbumMinimalInfoDto> getMinimalAlbumByArtistId(Long artistId) {
        return albumDAO.getMinimalAlbumByArtistId(artistId);
    }

}
