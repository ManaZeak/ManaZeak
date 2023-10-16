package org.manazeak.manazeak.manager.library.integration.artist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.artist.ArtistIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ExtractedComposerDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Used to get the existing artists and create the new artists from the database.
 */
@Component
@RequiredArgsConstructor
public class ArtistIntegrationManager {

    private final ArtistIntegrationDAO artistIntegrationDAO;

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
        // Getting the lyricists.
        artistsNames.addAll(track.getLyricists());
        // Getting the engineers.
        artistsNames.addAll(track.getEngineers());
        // Getting the arrangers.
        artistsNames.addAll(track.getArrangers());
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
        artistIntegrationDAO.createBandMembers(new ArrayList<>(artistsLinks));
    }

    /**
     * Add information contained in the JSON file into the artist.
     *
     * @param container The information about the extracted data in the JSON.
     * @return The object that will be used to link the artist with the other objects.
     */
    public ArtistAdditionalInfoLinkerDto enrichArtistFromJson(ArtistAdditionalInfoContainer container) {
        return artistIntegrationDAO.enrichArtistFromJson(container);
    }

    /**
     * Insert in the database all the artists found in the JSON that were not present in the database.
     *
     * @param container The information fetched from the JSON.
     */
    public void createMissingArtistsFromJson(ArtistAdditionalInfoContainer container) {
        ArrayList<String> artists = new ArrayList<>();

        // Checking if the artist is present in the database.
        for (String artist : container.getArtists()) {
            if (!container.getArtists().contains(artist)) {
                artists.add(artist);
            }
        }

        // Inserting the artists and updating the container.
        artistIntegrationDAO.insertMinimalArtists(container, artists);
    }
}
