package org.manazeak.manazeak.manager.library.integration.album;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Allows to create album before inserting them into the database.
 */
public class AlbumIntegrationHelper {

    private final Map<String, AlbumIntegrationDto> albumMap = new HashMap<>();

    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    public AlbumIntegrationHelper(CacheAccessManager cacheAccessManager) {
        this.cacheAccessManager = cacheAccessManager;
    }

    /**
     * Extract the information contained on the album
     * @param album The extracted album information.
     */
    public void extractAlbum(ExtractedAlbumDto album) {
        // Checking if the album has been extracted already.
        if (albumMap.containsKey(album.getTitle())) {
            // Checking if there is any missing fields.

        } else {
            // Creating the album.
            addNewAlbum(album);
        }
    }

    /**
     * Adds a new album into the maps of albums to add into the database.
     */
    private void addNewAlbum(ExtractedAlbumDto album) {
        AlbumIntegrationDto newAlbum = new AlbumIntegrationDto();
        // Getting the album id from the cache.
        newAlbum.setAlbumId(cacheAccessManager.getLongValue(CacheEnum.ALBUM_ID_BY_TITLE, album.getTitle()));
        // Setting the other fields.
        newAlbum.setTitle(album.getTitle());
        newAlbum.setTotalTrack(album.getTrackTotal());
        newAlbum.setReleaseYear(Integer.parseInt(album.getYear()));
        newAlbum.setReleaseDate(album.getReleaseDate());
        newAlbum.setTotalTrack(album.getTrackTotal());
        newAlbum.setDiskTotal(album.getDiscTotal());

        // Adding the album to the album map.
        albumMap.put(album.getTitle(), newAlbum);
    }

}
