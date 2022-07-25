package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumLinkerProjection;
import org.manazeak.manazeak.entity.track.Album;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

/**
 * Data Access Object for Album using Spring CrudRepository interface
 *
 * This file has been automatically generated
 */
public interface AlbumDAO extends CrudRepository<Album,  Long> {

    /**
     * Get the artist id from the artist name.
     *
     * @param albumTitles The list of the title of the albums.
     * @return The album title linked to the album ID.
     */
    @Query("select title as albumTitle, albumId from Album where title in (:albumTitles)")
    List<AlbumLinkerProjection> getAlbumsByTitles(@Param("albumTitles") Collection<String> albumTitles);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT