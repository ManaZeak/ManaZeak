package org.manazeak.manazeak.entity.dto.library.integration.artist;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.manazeak.manazeak.entity.dto.library.integration.bio.BioDto;
import org.manazeak.manazeak.entity.dto.library.integration.testimony.TestimonyDto;

import java.util.*;

/**
 * Contains all the data extracted from the JSONs in a buffer.
 */
@Data
public class ArtistAdditionalInfoContainer {

    private final List<ArtistAdditionalInfoDto> artistAdditionalInfo = new ArrayList<>();

    private final Set<String> aliases = new HashSet<>();

    private final Set<String> countries = new HashSet<>();

    private final Set<String> artists = new HashSet<>();

    private final Set<String> yearsActive = new HashSet<>();

    private final Set<ArtistLink> links = new HashSet<>();

    private List<BioDto> bios = new ArrayList<>();

    private Map<String, Long> countryMap = new HashMap<>();

    private Map<String, Long> artistMap = new HashMap<>();

    private Map<String, Long> aliasMap = new HashMap<>();

    private Map<String, Long> intervalMap = new HashMap<>();

    // This map contains the link associated to the artist ids to save them into the database.
    private Map<ArtistLink, Long> linkMap = new HashMap<>();

    private List<TestimonyDto> testimonies = new ArrayList<>();

    /**
     * Add an element in the list only if it is not empty.
     *
     * @param list    The list where the element will be added.
     * @param element The element to add in the list.
     * @param <T>     The type of the added element and the list.
     */
    private static <T> void addIfNotEmpty(Collection<T> list, T element) {
        if (element instanceof String str) {
            if (StringUtils.isEmpty(str)) {
                return;
            }
        } else if (element == null) {
            return;
        }
        list.add(element);
    }

    /**
     * Add multiple elements to a list and check if they are not null.
     *
     * @param list     The list of element to change.
     * @param elements The elements to add to the list.
     * @param <T>      The type of the collections.
     */
    private static <T> void addIfNotEmpty(Collection<T> list, Collection<T> elements) {
        for (T element : elements) {
            addIfNotEmpty(list, element);
        }
    }

    /**
     * Add into the object new additional information about an artist.
     *
     * @param additionalInfoDto The additional information to add.
     */
    public void addAdditionalInfo(ArtistAdditionalInfoDto additionalInfoDto) {
        artistAdditionalInfo.add(additionalInfoDto);
        addIfNotEmpty(aliases, additionalInfoDto.alias());
        addIfNotEmpty(countries, additionalInfoDto.originCountry());
        addIfNotEmpty(countries, additionalInfoDto.countryOfBirth());
        addIfNotEmpty(countries, additionalInfoDto.countryOfDeath());
        addIfNotEmpty(artists, additionalInfoDto.members());
        addIfNotEmpty(artists, additionalInfoDto.pastMembers());
        addIfNotEmpty(artists, additionalInfoDto.name());
        addIfNotEmpty(artists, additionalInfoDto.realName());
        addIfNotEmpty(yearsActive, additionalInfoDto.yearsActive());
    }

    /**
     * Adds a collection of testimonies into the container to be inserted.
     *
     * @param testimonies The collection of testimonies to insert.
     */
    public void addTestimonies(Collection<TestimonyDto> testimonies) {
        for (TestimonyDto testimony : testimonies) {
            this.testimonies.add(testimony);
            artists.add(testimony.getFrom());
        }
    }

    /**
     * Add an alias into the map.
     *
     * @param aliasName The name of the alias.
     * @param aliasId   The id of the alias.
     */
    public void addAlias(String aliasName, Long aliasId) {
        aliasMap.put(aliasName, aliasId);
    }

    /**
     * Add a time interval into the map.
     *
     * @param timeInterval   The time interval key.
     * @param timeIntervalId The id of the time interval in the database.
     */
    public void addTimeInterval(String timeInterval, Long timeIntervalId) {
        intervalMap.put(timeInterval, timeIntervalId);
    }

    /**
     * Add an artist to the map.
     *
     * @param artistName The name of the artist
     * @param artistId   The artist id.
     */
    public void addArtist(String artistName, Long artistId) {
        artistMap.put(artistName, artistId);
    }

    public void addLink(ArtistLink link, Long artistId) {
        linkMap.put(link, artistId);
    }

    public void addBios(List<BioDto> bios) {
        this.bios.addAll(bios);
    }

    /**
     * Get a country identifier in the country maps.
     *
     * @param country The name of the country to fetch.
     * @return The identifier of the country.
     */
    public Long resolveCountry(String country) {
        return countryMap.get(country);
    }

    public Long resolveAlias(String alias) {
        return aliasMap.get(alias);
    }

    public Long resolveArtistId(String artistName) {
        return artistMap.get(artistName);
    }

    public Long resolveTimeIntervalId(String timeInterval) {
        return intervalMap.get(timeInterval);
    }

    public Long resolveArtistLinkId(ArtistLink link) {
        return linkMap.get(link);
    }
}
