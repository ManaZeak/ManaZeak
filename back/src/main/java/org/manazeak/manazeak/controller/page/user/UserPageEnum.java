package org.manazeak.manazeak.controller.page.user;

/**
 * This enum contains all the user related URLS.
 */
public enum UserPageEnum {
    REGISTER_PAGE("user/register.html"),
    LOGIN_PAGE("user/login.html");

    private final String page;

    UserPageEnum(String page) {
        this.page = page;
    }

    /**
     * Get the path of the page.
     * @return the path of the page.
     */
    public String getPage() {
        return page;
    }
}
