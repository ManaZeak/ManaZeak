package org.manazeak.manazeak.controller.page.admin;

/**
 * Contains all the fragment used for the admin page.
 */
public enum AdminFragmentEnum {

    USER_HIERARCHY("fragments/admin/user-hierarchy.html");

    private final String page;

    AdminFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
