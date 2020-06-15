package org.manazeak.manazeak.controller.user;

import org.manazeak.manazeak.dto.user.LightUserDto;
import org.springframework.context.annotation.Role;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class handle the login of a user.
 */
@RestController
public class LoginController {

    @GetMapping("/test/")
    public String test(){
        return "test";
    }

    @GetMapping("/test2/")
    public LightUserDto test2(){
        return new LightUserDto();
    }

}
