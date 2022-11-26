package org.manazeak.manazeak.controller.rest.library.track;

import com.google.common.escape.UnicodeEscaper;
import com.google.common.net.PercentEscaper;
import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.track.Track;
import org.manazeak.manazeak.service.track.TrackService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
public class TrackRestController {

    private static final String TRACK_URI_PREFIX = "http://";

    private final TrackService trackService;

    public TrackRestController(TrackService trackService) {
        this.trackService = trackService;
    }

    /**
     * Send a request to the nginx to play the given track.
     *
     * @param trackId The id of the track in the database.
     * @return The redirection to the nginx to
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @GetMapping("/play/{trackId}")
    public ResponseEntity<Object> playTrackFromId(@PathVariable @NotNull(message = "general.error.no_id") Long trackId) throws URISyntaxException {
        // Getting the track for the id.
        Track track = trackService.getTrackById(trackId);

        // Formatting the location with a percent escaper.
        UnicodeEscaper basicEscaper = new PercentEscaper("/", false);
        String locationEscaped = basicEscaper.escape(track.getLocation());
        String urlEscaped = basicEscaper.escape(TRACK_URI_PREFIX + track.getLocation());

        // Preparing the redirection to the nginx to serve the track.
        HttpHeaders header = new HttpHeaders();
        header.setLocation(new URI(urlEscaped));
        if (Boolean.TRUE.equals(track.getIsMp3())) {
            header.set("Content-Type", "audio/mpeg");
        } else {
            header.set("Content-Type", "audio/flac");
        }
        header.set("Content-Disposition", "inline");
        header.set("X-Accel-Redirect", locationEscaped);

        // Sending the response to the client.
        return new ResponseEntity<>(header, HttpStatus.SEE_OTHER);
    }

}
