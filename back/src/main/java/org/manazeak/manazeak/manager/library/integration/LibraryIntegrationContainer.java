package org.manazeak.manazeak.manager.library.integration;

import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.manager.library.integration.album.AlbumIntegrationHelper;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationHelper;
import org.manazeak.manazeak.manager.library.integration.label.LabelIntegrationHelper;

/**
 * Contains and allows to convert the data contained that has been extracted from the tracks into the
 * object for the database.
 */
public class LibraryIntegrationContainer {

    private final ArtistIntegrationHelper artistIntegrationHelper;

    private final AlbumIntegrationHelper albumIntegrationHelper;

    private final LabelIntegrationHelper labelIntegrationHelper;

    public LibraryIntegrationContainer(CacheAccessManager cacheAccessManager) {
        artistIntegrationHelper = new ArtistIntegrationHelper(cacheAccessManager);
        albumIntegrationHelper = new AlbumIntegrationHelper(cacheAccessManager);
        labelIntegrationHelper = new LabelIntegrationHelper(cacheAccessManager);
    }

    /**
     * Convert an extracted band into objects to be integrated into the database.
     *
     * @param band The information extracted from the band folder.
     */
    public void convertBandIntoDto(ExtractedBandDto band) {
        // Adding the artist from the band.
        artistIntegrationHelper.extractArtistFromBand(band);
    }

    /**
     * Convert an extracted track into objects to be integrated into the database.
     *
     * @param track The information extracted from the track tags.
     */
    public void convertTrackIntoDto(ExtractedTrackDto track) {
        // Adding the artists contained in the track.
        artistIntegrationHelper.extractArtistFromTrack(track);
    }

    /**
     * Convert an extracted album into objects to be integrated into the database.
     *
     * @param album The extracted album information from the album folder.
     */
    public void convertAlbumIntoDto(ExtractedAlbumDto album, ExtractedBandDto band) {
        // Adding the album information.
        albumIntegrationHelper.extractAlbum(album, band);
        labelIntegrationHelper.extractLabelFromAlbum(album);
    }

    /**
     * Get the helper containing the artists.
     *
     * @return The helper for the artists integration.
     */
    public ArtistIntegrationHelper getArtistIntegrationHelper() {
        return artistIntegrationHelper;
    }

    public AlbumIntegrationHelper getAlbumIntegrationHelper() {
        return albumIntegrationHelper;
    }

    public LabelIntegrationHelper getLabelIntegrationHelper() {
        return labelIntegrationHelper;
    }
}
