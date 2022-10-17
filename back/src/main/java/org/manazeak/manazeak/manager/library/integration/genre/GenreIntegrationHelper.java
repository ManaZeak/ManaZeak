package org.manazeak.manazeak.manager.library.integration.genre;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenreIntegrationDto;
import org.manazeak.manazeak.entity.track.Genre;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.database.PkIdProvider;

import java.util.HashMap;
import java.util.Map;

public class GenreIntegrationHelper {

    private final Map<String, GenreIntegrationDto> genres = new HashMap<>();

    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    public GenreIntegrationHelper(CacheAccessManager cacheAccessManager) {
        this.cacheAccessManager = cacheAccessManager;
    }

    /**
     * Add a genre into the map of object to insert in the database.
     *
     * @param genreName The name of the genre that will be inserted in the library.
     */
    public void addGenre(String genreName) {
        // Check if the genre is in the cache
        if (genres.containsKey(genreName)) {
            return;
        }
        // Creating a new genre from the genre name.
        GenreIntegrationDto genre = new GenreIntegrationDto();
        genre.setGenreId(cacheAccessManager.getLongValue(CacheEnum.GENRE_ID_BY_NAME, genreName));
        genre.setGenreName(genreName);

        // If the genre has no id, generating a new one.
        if (genre.getGenreId() == null) {
            Long genreId = PkIdProvider.singleton().getNewPkId(Genre.class);
            genre.setGenreId(genreId);
            cacheAccessManager.put(CacheEnum.GENRE_ID_BY_NAME, genreName, genreId);
        }

        genres.put(genreName, genre);
    }

    public Map<String, GenreIntegrationDto> getGenres() {
        return genres;
    }
}
