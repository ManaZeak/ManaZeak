package org.manazeak.manazeak.configuration.web;

import org.manazeak.manazeak.service.user.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * This class allows to select the local for a given user.
 * If there is no user, we select the user agent language.
 */
@Configuration
public class MzkLocalResolver  extends SessionLocaleResolver {

    private final UserService userService;

    public MzkLocalResolver(UserService userService) {
        this.userService = userService;
    }

    /**
     * Choose the local displayed of the user. The local is chosen from :
     * - the user object stored in the database.
     * - the user-agent if no user is logged in.
     * @param request the request of the user.
     * @return The local of the user.
     */
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        return null;
    }
}
