package org.manazeak.manazeak.manager.library.integration;

import org.manazeak.manazeak.daos.library.integration.label.LabelIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.cache.CacheIntegrationInitializer;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Integrate a buffer of scanned tracks into the database.
 */
@Component
public class IntegrationBufferManager {

    private final ArtistIntegrationManager artistIntegrationManager;

    private final CacheIntegrationInitializer cacheIntegrationInitializer;

    private final CacheAccessManager cacheAccessManager;

    private final LabelIntegrationDAO labelIntegrationDAO;

    public IntegrationBufferManager(ArtistIntegrationManager artistIntegrationManager,
                                    CacheIntegrationInitializer cacheIntegrationInitializer,
                                    CacheAccessManager cacheAccessManager, LabelIntegrationDAO labelIntegrationDAO) {
        this.artistIntegrationManager = artistIntegrationManager;
        this.cacheIntegrationInitializer = cacheIntegrationInitializer;
        this.cacheAccessManager = cacheAccessManager;
        this.labelIntegrationDAO = labelIntegrationDAO;
    }

    /**
     * Integrate a buffer of tracks into the database.
     * This part is synchronized because the id must be the same and must be present inside the database.
     *
     * @param bands The information about the extracted tags.
     */
    public synchronized void integrateBuffer(List<ExtractedBandDto> bands) {
        // Init caches with the buffer.
        cacheIntegrationInitializer.initCacheWithBuffer(bands);

        // Launching the extraction of the tags contained in the library.
        LibraryIntegrationContainer integrationContainer = launchTagExtraction(bands);

        // Launching the integration of objects.
        labelIntegrationDAO.mergeLabel(new ArrayList<>(integrationContainer.getLabelIntegrationHelper().getLabels().values()));
        artistIntegrationManager.mergeArtistsIntoDatabase(integrationContainer.getArtistIntegrationHelper().getArtists());

    }

    /**
     * Convert the data contained in the extracted tags from the tracks into object ready to be inserted into
     * the database.
     *
     * @param bands The information extracted from the tags and the folders.
     * @return An object containing all the entities that must be inserted.
     */
    public LibraryIntegrationContainer launchTagExtraction(List<ExtractedBandDto> bands) {
        LibraryIntegrationContainer integrationHelper = new LibraryIntegrationContainer(cacheAccessManager);

        // Iterating over the objects of the buffer to create the object to be inserted into the database.
        for (ExtractedBandDto band : bands) {
            // Extracting the information from the band.
            integrationHelper.convertBandIntoDto(band);
            for (ExtractedAlbumDto album : band.getAlbums()) {
                // Extracting the information from the album.
                integrationHelper.convertAlbumIntoDto(album);
                for (ExtractedTrackDto track : album.getTracks()) {
                    // Extracting the information from the track.
                    integrationHelper.convertTrackIntoDto(track);
                }
            }
        }

        return integrationHelper;
    }

}
