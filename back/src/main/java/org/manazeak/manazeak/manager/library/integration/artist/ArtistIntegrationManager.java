package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.library.integration.ArtistIntegrationDAO;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.artist.ExtractedComposerDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Used to get the existing artists and create the new artists from the database.
 */
@Component
public class ArtistIntegrationManager {

    private final CacheManager cacheManager;

    private final ArtistDAO artistDAO;

    private final ArtistIntegrationDAO artistIntegrationDAO;

    public ArtistIntegrationManager(CacheManager cacheManager, ArtistDAO artistDAO,
                                    ArtistIntegrationDAO artistIntegrationDAO) {
        this.cacheManager = cacheManager;
        this.artistDAO = artistDAO;
        this.artistIntegrationDAO = artistIntegrationDAO;
    }

    /**
     * Extract the artists names from the tags of a track.
     *
     * @param track        The extracted information about the track.
     * @param artistsNames The names of the artist that were extracted.
     */
    public void extractArtistNameFromExtractedTrack(ExtractedTrackDto track, Set<String> artistsNames) {
        // Getting the artists from the tags.
        artistsNames.addAll(track.getArtists());
        // Getting the artists from the composers.
        for (ExtractedComposerDto composer : track.getComposers()) {
            artistsNames.addAll(composer.getMembers());
            artistsNames.add(composer.getName());
        }
        // Getting the performers.
        artistsNames.addAll(track.getPerformers());
        // Getting the producers.
        artistsNames.addAll(track.getProducers());
    }

    /**
     * Adding in the cache all the artist name with the associated ID in the database.
     *
     * @param artistsNames The name of the artist.
     */
    public void addArtistFromDatabaseToCache(Set<String> artistsNames) {
        // Removing from the set the artist that are already in the cache.
        ArtistIntegrationCacheHelper.removeEntitiesAlreadyInCache(artistsNames, cacheManager);

        // Getting the element in the database and adding them to the cache.
        List<ArtistLinkerProjection> artistsInfo = artistDAO.getArtistByNames(artistsNames);

        final Cache artistCache = CacheEnum.getCache(CacheEnum.ARTIST_ID_BY_NAME, cacheManager);

        // Adding the artists into the cache.
        for (ArtistLinkerProjection artistInfo : artistsInfo) {
            artistCache.put(artistInfo.getArtistName(), artistInfo.getArtistId());
        }
    }

    /**
     * Merge all the information about the artists in the tag in the application.
     *
     * @param artistsByName The map containuing the artist by their name.
     */
    public void mergeArtistsIntoDatabase(Map<String, ArtistIntegrationDto> artistsByName) {
        // Launch the integration of the artists
        artistIntegrationDAO.mergeArtists(new ArrayList<>(artistsByName.values()));
        // Creating the pairs of ids to be inserted.
        Set<Pair<Long, Long>> artistsLinks = new HashSet<>();
        for (ArtistIntegrationDto artist : artistsByName.values()) {
            // If there is no sub artists, nothing to do.
            if (artist.getSubArtists() == null || artist.getSubArtists().isEmpty()) {
                continue;
            }
            // Adding the sub artists to the links.
            for (String member : artist.getSubArtists()) {
                artistsLinks.add(Pair.of(artist.getId(), artistsByName.get(member).getId()));
            }
        }
        // Inserting the links into the database.
        artistIntegrationDAO.linkArtists(new ArrayList<>(artistsLinks));
    }
}
