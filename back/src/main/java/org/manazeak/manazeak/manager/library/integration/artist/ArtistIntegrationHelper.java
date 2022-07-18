package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.audio.tag.TagCheckerUtil;
import org.manazeak.manazeak.util.audio.tag.TagSplitterUtil;
import org.manazeak.manazeak.util.database.PkIdProvider;

import java.util.HashMap;
import java.util.Map;

/**
 * Handles the artist insertion into the database.
 */
public class ArtistIntegrationHelper {

    /**
     * The artists to be integrated into the database.
     */
    private final Map<String, ArtistIntegrationDto> artists = new HashMap<>();

    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    public ArtistIntegrationHelper(CacheAccessManager cacheAccessManager) {
        this.cacheAccessManager = cacheAccessManager;
    }

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
        ArtistIntegrationTrackExtractorHelper.extractArtistsFromTrackTag(track, artists, cacheAccessManager);
    }

    /**
     * Get the artists with their name linked to the object that will be inserted into the database.
     *
     * @return The map.
     */
    public Map<String, ArtistIntegrationDto> getArtists() {
        return artists;
    }

    /**
     * Create an artist object from a band folder.
     *
     * @param band The extracted information about the artist at the artist folder level.
     * @return The artist created from the information contained in the tag.
     */
    private ArtistIntegrationDto createIntegrationArtistFromBand(ExtractedBandDto band) {
        ArtistIntegrationDto artist = new ArtistIntegrationDto();
        artist.setId(cacheAccessManager.getLongValue(CacheEnum.ARTIST_ID_BY_NAME, band.getName()));
        artist.setName(band.getName());
        artist.setLocation(TagSplitterUtil.removeRootPath(band.getLocation()));
        artist.setLabel(TagCheckerUtil.isArtistRecord(band.getName()));
        artist.setModificationDate(band.getModificationDate());

        // If the artist isn't in the database, getting a new id.
        if (artist.getId() == null) {
            artist.setId(PkIdProvider.singleton().getNewPkId(Artist.class));
            // Adding the new artist id into the cache.
            cacheAccessManager.put(CacheEnum.ARTIST_ID_BY_NAME, artist.getName(), artist.getId());
        }

        // FIXME : add the links with the other elements.

        return artist;
    }

}
