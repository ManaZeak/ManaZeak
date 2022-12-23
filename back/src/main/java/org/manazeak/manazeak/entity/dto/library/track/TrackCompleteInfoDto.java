package org.manazeak.manazeak.entity.dto.library.track;

import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.key.KeyDto;

import java.util.HashSet;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 * Contains all the information to display for the track.
 */
@Data
public class TrackCompleteInfoDto {

    private final Long trackId;

    private final String title;

    private final Double duration;

    private final String isrc;

    private final Double bpm;

    private final String mood;

    private final Set<KeyDto> keys = new HashSet<>();

    private final SortedSet<ArtistMinimalInfoDto> performers = new TreeSet<>();

    private final SortedSet<GenreMinimalInfoDto> genres = new TreeSet<>();

    private final SortedSet<ArtistMinimalInfoDto> composers = new TreeSet<>();

    private final SortedSet<ArtistMinimalInfoDto> lyricists = new TreeSet<>();

    private final SortedSet<ArtistMinimalInfoDto> producers = new TreeSet<>();

    private final SortedSet<ArtistMinimalInfoDto> engineers = new TreeSet<>();

    public void addPerformer(ArtistMinimalInfoDto performer) {
        if (performer == null) {
            return;
        }
        performers.add(performer);
    }

    public void addGenre(GenreMinimalInfoDto genre) {
        if (genre == null) {
            return;
        }
        genres.add(genre);
    }

    public void addComposer(ArtistMinimalInfoDto composer) {
        if (composer == null) {
            return;
        }
        composers.add(composer);
    }

    public void addLyricist(ArtistMinimalInfoDto lyricist) {
        if (lyricist == null) {
            return;
        }
        lyricists.add(lyricist);
    }

    public void addProducer(ArtistMinimalInfoDto producer) {
        if (producer == null) {
            return;
        }
        producers.add(producer);
    }

    public void addEngineer(ArtistMinimalInfoDto engineer) {
        if(engineer == null) {
            return;
        }
        engineers.add(engineer);
    }

    public void addKey(KeyDto key) {
        if (key == null) {
            return;
        }
        keys.add(key);
    }
}
