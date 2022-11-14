package org.manazeak.manazeak.controller.rest.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class handle the login of a user.
 */
@RestController
public class LoginControllerRest {

    @GetMapping("/test/")
    public String test() {
        return "test";
    }


}
