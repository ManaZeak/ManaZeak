package org.manazeak.manazeak.manager.library.integration;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.manager.library.integration.album.AlbumIntegrationHelper;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationHelper;
import org.manazeak.manazeak.manager.library.integration.genre.GenreIntegrationHelper;
import org.manazeak.manazeak.manager.library.integration.label.LabelIntegrationHelper;
import org.manazeak.manazeak.manager.library.integration.track.TrackIntegrationHelper;

/**
 * Contains and allows converting the data contained that has been extracted from the tracks into the
 * object for the database.
 */
@Getter
@RequiredArgsConstructor
public class LibraryIntegrationContainer {

    private final ArtistIntegrationHelper artistIntegrationHelper;

    private final AlbumIntegrationHelper albumIntegrationHelper;

    private final LabelIntegrationHelper labelIntegrationHelper;

    private final TrackIntegrationHelper trackIntegrationHelper;
    
    private final GenreIntegrationHelper genreIntegrationHelper;

    public LibraryIntegrationContainer(CacheAccessManager cacheAccessManager,
                                       ArtistDAO artistDAO, LabelDAO labelDAO) {
        artistIntegrationHelper = new ArtistIntegrationHelper(cacheAccessManager, artistDAO);
        albumIntegrationHelper = new AlbumIntegrationHelper(cacheAccessManager);
        labelIntegrationHelper = new LabelIntegrationHelper(cacheAccessManager, labelDAO);
        trackIntegrationHelper = new TrackIntegrationHelper(cacheAccessManager);
        genreIntegrationHelper = new GenreIntegrationHelper(cacheAccessManager);
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
    public void convertTrackIntoDto(ExtractedTrackDto track, ExtractedAlbumDto album) {
        // Adding the artists contained in the track.
        artistIntegrationHelper.extractArtistFromTrack(track);
        // Adding the genre in the database.
        track.getGenres().forEach(genreIntegrationHelper::addGenre);
        trackIntegrationHelper.extractTrack(track, album);
    }

    /**
     * Convert an extracted album into objects to be integrated into the database.
     *
     * @param album The extracted album information from the album folder.
     */
    public void convertAlbumIntoDto(ExtractedAlbumDto album, ExtractedBandDto band, AlbumDAO albumDAO) {
        // Adding the album information.
        albumIntegrationHelper.extractAlbum(album, band, albumDAO);
        labelIntegrationHelper.extractLabelFromAlbum(album);
    }

}
