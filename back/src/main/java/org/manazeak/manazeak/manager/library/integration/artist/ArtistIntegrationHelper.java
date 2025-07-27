package org.manazeak.manazeak.manager.library.integration.artist;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.audio.tag.TagCheckerUtil;
import org.manazeak.manazeak.util.audio.tag.TagSplitterUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Handles the artist insertion into the database.
 */
@RequiredArgsConstructor
public class ArtistIntegrationHelper {

    /**
     * The artists to be integrated into the database.
     */
    @Getter
    private final Map<String, ArtistIntegrationDto> artists = new HashMap<>();

    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    private final ArtistDAO artistDAO;

    /**
     * Add to the artists list the information contained in the band.
     *
     * @param band The information extracted from the band folder.
     */
    public void extractArtistFromBand(ExtractedBandDto band) {
        // Checking if the artist exists in the map
        ArtistIntegrationDto integrationArtist = artists.get(band.getName());
        if (integrationArtist == null) {
            // Creating the artist from the tag data.
            integrationArtist = createIntegrationArtistFromBand(band);
            // Adding the artist into the map.
            artists.put(integrationArtist.getName(), integrationArtist);
        } else {
            // Checks if the artist has all the fields.
            // Only the location can be changed when integrating the band.
            // Checking if the location is here.
            if (integrationArtist.getLocation() == null) {
                integrationArtist.setLocation(TagSplitterUtil.removeRootPath(band.getLocation()));
            }
        }
    }

    /**
     * Add to the artist list the information contained in the track.
     *
     * @param track The information extracted from the track tags.
     */
    public void extractArtistFromTrack(ExtractedTrackDto track) {
        // Adding the artists
        ArtistIntegrationTrackExtractorHelper.extractArtistsFromTrackTag(track, artists, cacheAccessManager, artistDAO);
    }

    /**
     * Create an artist object from a band folder.
     *
     * @param band The extracted information about the artist at the artist folder level.
     * @return The artist created from the information contained in the tag.
     */
    private ArtistIntegrationDto createIntegrationArtistFromBand(ExtractedBandDto band) {
        ArtistIntegrationDto artist = new ArtistIntegrationDto();
        artist.setName(band.getName());
        artist.setLocation(TagSplitterUtil.removeRootPath(band.getLocation()));
        artist.setLabel(TagCheckerUtil.isArtistRecord(band.getName()));
        artist.setModificationDate(band.getModificationDate());

        ArtistIntegrationTrackExtractorHelper.setArtistIdentifierFromDatabase(artist, artistDAO, cacheAccessManager);

        return artist;
    }

}
