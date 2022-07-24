package org.manazeak.manazeak.manager.library.integration.album;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.constant.tag.CompilationTypeEnum;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.track.Album;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.DateUtil;
import org.manazeak.manazeak.util.database.PkIdProvider;

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
     *
     * @param album The extracted album information.
     */
    public void extractAlbum(ExtractedAlbumDto album, ExtractedBandDto band) {
        // Checking if the album has been extracted already.
        if (!albumMap.containsKey(album.getTitle())) {
            // Creating the album.
            addNewAlbum(album, band);
        }
    }

    /**
     * Adds a new album into the maps of albums to add into the database.
     */
    private void addNewAlbum(ExtractedAlbumDto album, ExtractedBandDto band) {
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
        newAlbum.setEanUpn(album.getEanUpn());
        newAlbum.setStartRecordingDate(DateUtil.parseString(album.getStartRecordingDate(), DateUtil.US_DATE_FORMATTER));
        newAlbum.setEndRecordingDate(DateUtil.parseString(album.getEndRecordingDate(), DateUtil.US_DATE_FORMATTER));
        newAlbum.setRecordingLocation(album.getRecordingLocation());
        newAlbum.setArtist(band.getName());
        newAlbum.setLabel(album.getLabel());
        newAlbum.setDuration(album.getDuration());
        newAlbum.setCompilationTypeId(CompilationTypeEnum.getCompilationByCode(album.getCompilationCode()).getId());

        // If there is no album id, generating one.
        if (newAlbum.getAlbumId() == null) {
            newAlbum.setAlbumId(PkIdProvider.singleton().getNewPkId(Album.class));
            // Adding the new album id into the cache.
            cacheAccessManager.put(CacheEnum.ALBUM_ID_BY_TITLE, newAlbum.getTitle(), newAlbum.getAlbumId());
        }

        // Adding the album to the album map.
        albumMap.put(album.getTitle(), newAlbum);
    }

    public Map<String, AlbumIntegrationDto> getAlbumMap() {
        return albumMap;
    }
}
