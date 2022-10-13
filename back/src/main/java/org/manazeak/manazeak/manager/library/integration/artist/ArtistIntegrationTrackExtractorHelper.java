package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ExtractedComposerDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.audio.tag.TagCheckerUtil;
import org.manazeak.manazeak.util.database.PkIdProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Extract the information of the artist contained in the extracted track tags.
 */
public final class ArtistIntegrationTrackExtractorHelper {

    private ArtistIntegrationTrackExtractorHelper() {

    }

    /**
     * Prepare the artists before their insertion into the database.
     *
     * @param track              The information extracted from the track tags.
     * @param artists            The map containing the artist by their id.
     * @param cacheAccessManager The object used to access the cache.
     */
    public static void extractArtistsFromTrackTag(ExtractedTrackDto track, Map<String, ArtistIntegrationDto> artists,
                                                  CacheAccessManager cacheAccessManager) {
        // Extracting the artists.
        for (String artist : track.getArtists()) {
            processStringArtist(artists, artist, cacheAccessManager);
        }
        // Extracting the performers
        addListArtistNames(artists, track.getPerformers(), cacheAccessManager);
        // Extracting the producers.
        addListArtistNames(artists, track.getProducers(), cacheAccessManager);
        // Extracting the lyricists.
        addListArtistNames(artists, track.getLyricists(), cacheAccessManager);
        // Extracting the engineers.
        addListArtistNames(artists, track.getEngineers(), cacheAccessManager);
        // Extracting the arrangers.
        addListArtistNames(artists, track.getArrangers(), cacheAccessManager);

        // Extracting the composers.
        for (ExtractedComposerDto composer : track.getComposers()) {
            processStringArtist(artists, composer.getName(), cacheAccessManager);
            artists.get(composer.getName()).setSubArtists(new ArrayList<>(composer.getMembers()));
            // Adding the member of the artists (or the real name).
            for (String member : composer.getMembers()) {
                processStringArtist(artists, member, cacheAccessManager);
            }
        }

    }

    /**
     * Create an artist from the string.
     */
    private static ArtistIntegrationDto createArtistFromArtistString(CacheAccessManager cacheAccessManager,
                                                                     String artistName) {
        ArtistIntegrationDto artist = new ArtistIntegrationDto();
        artist.setId(cacheAccessManager.getLongValue(CacheEnum.ARTIST_ID_BY_NAME, artistName));
        artist.setName(artistName);
        artist.setLabel(TagCheckerUtil.isArtistRecord(artistName));

        // If no id has been found in the cache, we create a new one.
        if (artist.getId() == null) {
            artist.setId(PkIdProvider.singleton().getNewPkId(Artist.class));
        }

        return artist;
    }

    /**
     * Add a list of artist names into the
     *
     * @param artists            The list of artist to be integrated.
     * @param artistsNames       The list of artist names to add.
     * @param cacheAccessManager The object used to access the caches.
     */
    private static void addListArtistNames(Map<String, ArtistIntegrationDto> artists, List<String> artistsNames,
                                           CacheAccessManager cacheAccessManager) {
        for (String artist : artistsNames) {
            processStringArtist(artists, artist, cacheAccessManager);
        }
    }

    /**
     * Add an artist to the list of the integration artist.
     *
     * @param artist             The string containing the artist.
     * @param artists            The list of artist to be integrated.
     * @param cacheAccessManager The object used to access the caches.
     */
    private static void processStringArtist(Map<String, ArtistIntegrationDto> artists, String artist,
                                            CacheAccessManager cacheAccessManager) {
        // Creating the artist only if the artist is not present in the map.
        if (!artists.containsKey(artist)) {
            ArtistIntegrationDto newArtist = createArtistFromArtistString(cacheAccessManager, artist);
            artists.put(newArtist.getName(), newArtist);
        }
    }

}
