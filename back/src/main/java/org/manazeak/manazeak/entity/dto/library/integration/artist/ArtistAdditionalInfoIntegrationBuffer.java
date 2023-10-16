package org.manazeak.manazeak.entity.dto.library.integration.artist;

import lombok.Data;
import org.antlr.v4.runtime.misc.Pair;
import org.manazeak.manazeak.entity.track.Alias;
import org.manazeak.manazeak.entity.track.Link;
import org.manazeak.manazeak.entity.track.Testimony;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information needed to integrate some artist additional info.
 */
@Data
public class ArtistAdditionalInfoIntegrationBuffer {

    private final List<ArtistAdditionalInfoIntegrationDto> artists = new ArrayList<>();

    private final List<Alias> aliases = new ArrayList<>();

    private final List<Pair<Long, Long>> originCountries = new ArrayList<>();

    private final List<Pair<Long, Long>> members = new ArrayList<>();

    private final List<Pair<Long, Long>> pastMembers = new ArrayList<>();

    private final List<Link> links = new ArrayList<>();

    private final List<Testimony> testimonies = new ArrayList<>();

}
