package org.manazeak.manazeak.controller.rest.user;

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


}
