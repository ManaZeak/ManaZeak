package org.manazeak.manazeak.manager.library.integration.track;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ExtractedComposerDto;
import org.manazeak.manazeak.entity.dto.library.integration.track.TrackIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.FieldUtil;
import org.manazeak.manazeak.util.HashUtil;

import java.util.*;

/**
 * Helper used to contain the tracks before their insertions into the database.
 */
public class TrackIntegrationHelper {

    private final Map<String, TrackIntegrationDto> tracksByLocation = new HashMap<>();
    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    public TrackIntegrationHelper(CacheAccessManager cacheAccessManager) {
        this.cacheAccessManager = cacheAccessManager;
    }

    /**
     * Converts the tracks and get the ids of the associated objects.
     *
     * @param extractedTrack The track to be converted.
     */
    public void extractTrack(ExtractedTrackDto extractedTrack, ExtractedAlbumDto extractedAlbum) {
        // Creating the new object and filling it.
        TrackIntegrationDto track = new TrackIntegrationDto();
        // Getting the id for the track
        track.setTitle(extractedTrack.getTitle());
        track.setDiscNumber(extractedTrack.getDiscNumber());
        track.setTrackNumber(extractedTrack.getTrackNumber());
        track.setIsrc(extractedTrack.getIrsc());
        track.setLyrics(extractedTrack.getLyrics());
        track.setLocation(extractedTrack.getLocation());
        track.setBpm(extractedTrack.getBpm());
        track.setDuration(extractedTrack.getDuration());
        track.setOpus(extractedTrack.getOpus());
        track.setSubtitle(extractedTrack.getSubtitle());
        track.setMp3(extractedTrack.isMp3());
        // Getting the ID of the genre.
        track.setGenreIds(getElementIdsByNames(extractedTrack.getGenres(), CacheEnum.GENRE_ID_BY_NAME));
        track.setKeyIds(getElementIdsByNames(extractedTrack.getKeys(), CacheEnum.KEY_ID_BY_NAME));

        // Getting the album ID from the cache.
        track.setAlbumId(cacheAccessManager.getLongValue(CacheEnum.ALBUM_ID_BY_LOCATION, extractedAlbum.getLocation().toString()));
        track.setMoodbar(HashUtil.getMd5HashLower(track.getLocation()) + FileExtensionEnum.WEBP.getExtension());
        // Getting the IDs of the artists.
        linkArtists(track, extractedTrack);

        tracksByLocation.put(track.getLocation(), track);
    }

    /**
     * Linking the artist with the existing elements in the database.
     *
     * @param track          The track to be linked with the elements.
     * @param extractedTrack The information extracted from the track tags.
     */
    private void linkArtists(TrackIntegrationDto track, ExtractedTrackDto extractedTrack) {
        // Getting the composers ids.
        track.setComposerIds(getIdsFromExtractedArtist(extractedTrack.getComposers()));
        // Getting the lyricist ids.
        track.setLyricistIds(getIdsFromArtistsNames(extractedTrack.getLyricists()));
        // Getting the performers ids.
        track.setPerformerIds(getIdsFromArtistsNames(extractedTrack.getPerformers()));
        // Getting the engineers ids.
        track.setEngineerIds(getIdsFromArtistsNames(extractedTrack.getEngineers()));
        // Getting the arranger ids.
        track.setArrangerIds(getIdsFromArtistsNames(extractedTrack.getArrangers()));
        // Getting the band artists
        track.setArtistIds(getIdsFromArtistsNames(extractedTrack.getArtists()));
        // Getting the producers ids.
        track.setProducerIds(getIdsFromArtistsNames(extractedTrack.getProducers()));
    }

    /**
     * Create a set of ids from a list of artist names.
     *
     * @param composers The names of the composers where the id is to be found.
     * @return The set containing the id of the artists.
     */
    private Set<Long> getIdsFromExtractedArtist(Collection<ExtractedComposerDto> composers) {
        Set<Long> ids = new HashSet<>();
        for (ExtractedComposerDto composer : composers) {
            ids.add(cacheAccessManager.getLongValue(CacheEnum.ARTIST_ID_BY_NAME, composer.getName()));
        }

        return ids;
    }


    private Set<Long> getElementIdsByNames(Collection<String> names, CacheEnum cache) {
        Set<Long> ids = new HashSet<>();
        for (String name : names) {
            ids.add(cacheAccessManager.getLongValue(cache, name));
        }
        return ids;
    }

    /**
     * Create a set of ids from a list of artist names.
     *
     * @param artistsNames The names of the artist where the id is to be found.
     * @return The set containing the id of the artists.
     */
    private Set<Long> getIdsFromArtistsNames(Collection<String> artistsNames) {
        Set<Long> ids = new HashSet<>();
        for (String artistName : artistsNames) {
            if (FieldUtil.checkStringNotEmpty(artistName)) {
                ids.add(cacheAccessManager.getLongValue(CacheEnum.ARTIST_ID_BY_NAME, artistName));
            }
        }

        return ids;
    }

    public Map<String, TrackIntegrationDto> getTracksByLocation() {
        return tracksByLocation;
    }
}
