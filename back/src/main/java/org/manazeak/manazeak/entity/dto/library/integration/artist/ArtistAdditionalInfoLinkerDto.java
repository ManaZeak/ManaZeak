package org.manazeak.manazeak.entity.dto.library.integration.artist;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains all the information to link the artist with other objects contained in the JSON.
 */
@Data
public class ArtistAdditionalInfoLinkerDto {

    List<Pair<Long, Long>> artistAlias = new ArrayList<>();
    List<Pair<Long, Long>> artistOriginCountries = new ArrayList<>();
    List<Pair<Long, Long>> artistYearsActive = new ArrayList<>();
    List<Pair<Long, Long>> artistMembers = new ArrayList<>();
    List<Pair<Long, Long>> artistPastMembers = new ArrayList<>();
    List<Pair<Long, Long>> artistBios = new ArrayList<>();

    private static void addIfNotNull(@NonNull Long artistId, Long elementId, @NonNull List<Pair<Long, Long>> association) {
        if (elementId != null) {
            association.add(Pair.of(artistId, elementId));
        }
    }

    /**
     * Add a bio link to an artist
     *
     * @param bioId    The id of the bio.
     * @param artistId The id of the artist.
     */
    public void addBioLink(Long bioId, Long artistId) {
        addIfNotNull(artistId, bioId, artistBios);
    }

    /**
     * Add associations for the artist using the information in the container.
     *
     * @param container The data extracted from the JSON and the id maps.
     * @param artist    The information of the artist to link.
     */
    public void addAssociation(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoDto artist) {
        Long artistId = container.resolveArtistId(artist.name());
        // Alias <-> Artist association.
        for (String alias : artist.alias()) {
            addIfNotNull(artistId, container.resolveAlias(alias), artistAlias);
        }

        // Artist <-> origin country association.
        for (String origCountry : artist.originCountry()) {
            addIfNotNull(artistId, container.resolveCountry(origCountry), artistOriginCountries);
        }

        // Artist <-> year active association.
        for (String timeInterval : artist.yearsActive()) {
            addIfNotNull(artistId, container.resolveTimeIntervalId(timeInterval), artistYearsActive);
        }

        // Artist (band) <-> member association.
        for (String member : artist.members()) {
            addIfNotNull(artistId, container.resolveArtistId(member), artistMembers);
        }

        // Artist (band) <-> previous member association.
        for (String prevMember : artist.pastMembers()) {
            addIfNotNull(artistId, container.resolveArtistId(prevMember), artistPastMembers);
        }

        // Adding the references of the artist to save the link into the database.
        for (ArtistLink link : artist.links()) {
            container.addLink(link, artistId);
        }
    }
}
