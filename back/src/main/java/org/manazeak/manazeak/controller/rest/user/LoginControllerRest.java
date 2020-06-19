package org.manazeak.manazeak.controller.rest.user;

import org.manazeak.manazeak.dto.user.LightUserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * This class handle the login of a user.
 */
@RestController
public class LoginControllerRest {

    private static final Logger LOG = LoggerFactory.getLogger(LoginControllerRest.class);

    @GetMapping("/test/")
    public String test() {
        return "test";
    }

    @GetMapping("/test2/")
    public LightUserDto test2() {
        return new LightUserDto();
    }

    @GetMapping("/play/")
    public ResponseEntity<Object> test3() throws URISyntaxException {
        LOG.info("Going to play !");
        URI url = new URI("http://library/test.mp3");
        HttpHeaders header = new HttpHeaders();
        header.setLocation(url);
        header.set("Content-Type", "audio/mpeg");
        header.set("Content-Disposition", "inline");
        header.set("X-Accel-Redirect", "/library/test.mp3");
        return new ResponseEntity<>(header, HttpStatus.SEE_OTHER);
    }

}
