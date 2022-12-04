package org.manazeak.manazeak.controller.page.user;

/**
 * This enum contains all the user related URLS.
 */
public enum UserPageEnum {
    REGISTER_PAGE("user/register.html", "/register/"),
    ADDITIONAL_INFO("user/additional-info.html", "/additionalRegisterInfo/"),
    LOGIN_PAGE("user/login.html", "/login/"),
    LOGOUT_SUCCESS("user/logout-success.html", "/logoutSuccess/"),
    MAIN_PAGE("index.html", "/");

    private static final String REDIRECTION_PREFIX = "redirect:";
    private final String page;
    private final String url;

    UserPageEnum(String page, String url) {
        this.page = page;
        this.url = url;
    }

    /**
     * Get the path of the page.
     *
     * @return the path of the page.
     */
    public String getPage() {
        return page;
    }

    /**
     * Get the path to redirect on a view.
     *
     * @return the url for the redirection.
     */
    public String getRedirectToPage() {
        return REDIRECTION_PREFIX + url;
    }
}
