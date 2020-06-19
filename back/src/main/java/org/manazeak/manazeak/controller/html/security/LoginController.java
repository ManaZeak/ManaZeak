package org.manazeak.manazeak.controller.html.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This class allows the render of the login screen of the application.
 */
@Controller
public class LoginController {

    /**
     * Return the test page.
     * @return the test page.
     */
    @GetMapping(value = "/test5")
    public String getTest(){
        return "test.html";
    }
}
