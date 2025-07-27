package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ExtractedComposerDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.FieldUtil;
import org.manazeak.manazeak.util.audio.tag.TagCheckerUtil;
import org.manazeak.manazeak.util.database.PkIdProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
                                                  CacheAccessManager cacheAccessManager, ArtistDAO artistDAO) {
        // Extracting the artists.
        for (String artist : track.getArtists()) {
            processStringArtist(artists, artist, artistDAO, cacheAccessManager);
        }
        // Extracting the performers
        addListArtistNames(artists, track.getPerformers(), cacheAccessManager, artistDAO);
        // Extracting the producers.
        addListArtistNames(artists, track.getProducers(), cacheAccessManager, artistDAO);
        // Extracting the lyricists.
        addListArtistNames(artists, track.getLyricists(), cacheAccessManager, artistDAO);
        // Extracting the engineers.
        addListArtistNames(artists, track.getEngineers(), cacheAccessManager, artistDAO);
        // Extracting the arrangers.
        addListArtistNames(artists, track.getArrangers(), cacheAccessManager, artistDAO);

        // Extracting the composers.
        for (ExtractedComposerDto composer : track.getComposers()) {
            processStringArtist(artists, composer.getName(), artistDAO, cacheAccessManager);
            artists.get(composer.getName()).addSubArtists(new ArrayList<>(composer.getMembers()));
            // Adding the member of the artists (or the real name).
            for (String member : composer.getMembers()) {
                processStringArtist(artists, member, artistDAO, cacheAccessManager);
            }
        }

    }

    /**
     * Set the artist identifier from the database if there is one present.
     *
     * @param artist             The information on the artist to change.
     * @param artistDAO          The artist DAO.
     * @param cacheAccessManager The cache manager.
     */
    public static void setArtistIdentifierFromDatabase(ArtistIntegrationDto artist,
                                                       ArtistDAO artistDAO,
                                                       CacheAccessManager cacheAccessManager) {
        Long artistId = cacheAccessManager.getLongValue(CacheEnum.ARTIST_ID_BY_NAME, artist.getName());
        // If no id has been found in the cache, we create a new one.
        // If the artist isn't in the cache, try to fetch an existing album identifier.
        if (artistId == null) {
            Optional<Long> dbArtistId = artistDAO.getArtistIdByArtistName(artist.getName());
            artistId = dbArtistId.orElseGet(() -> PkIdProvider.singleton().getNewPkId(Artist.class));
            // Adding the new artist id into the cache.
            cacheAccessManager.put(CacheEnum.ARTIST_ID_BY_NAME, artist.getName(), artistId);
        }
        artist.setId(artistId);
    }

    /**
     * Create an artist from the string.
     */
    private static ArtistIntegrationDto createArtistFromArtistString(CacheAccessManager cacheAccessManager,
                                                                     ArtistDAO artistDAO,
                                                                     String artistName) {
        ArtistIntegrationDto artist = new ArtistIntegrationDto();
        artist.setName(artistName);
        artist.setLabel(TagCheckerUtil.isArtistRecord(artistName));

        setArtistIdentifierFromDatabase(artist, artistDAO, cacheAccessManager);

        return artist;
    }

    /**
     * Add a list of artist names into the artist to insert.
     *
     * @param artists            The list of artist to be integrated.
     * @param artistsNames       The list of artist names to add.
     * @param cacheAccessManager The object used to access the caches.
     */
    private static void addListArtistNames(Map<String, ArtistIntegrationDto> artists, List<String> artistsNames,
                                           CacheAccessManager cacheAccessManager, ArtistDAO artistDAO) {
        for (String artist : artistsNames) {
            // If the artist string is empty, no artist to be added.
            if (FieldUtil.checkStringNotEmpty(artist)) {
                processStringArtist(artists, artist, artistDAO, cacheAccessManager);
            }
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
                                            ArtistDAO artistDAO, CacheAccessManager cacheAccessManager) {
        // Creating the artist only if the artist is not present in the map.
        if (!artists.containsKey(artist)) {
            ArtistIntegrationDto newArtist = createArtistFromArtistString(cacheAccessManager, artistDAO, artist);
            artists.put(newArtist.getName(), newArtist);
        }
    }

}
