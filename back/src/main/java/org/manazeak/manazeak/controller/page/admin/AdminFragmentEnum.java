package org.manazeak.manazeak.controller.page.admin;

/**
 * Contains all the fragment used for the admin page.
 */
public enum AdminFragmentEnum {
    ADMIN_PAGE("fragments/admin/adminpage.html"),
    USER_HIERARCHY("fragments/admin/user-hierarchy.html"),
    USER_LIST("fragments/admin/user-list.html"),
    WISH_LIST("fragments/admin/wish-list.html"),
    SYNCTHING("fragments/admin/syncthing.html"),
    COMMANDS("fragments/admin/commands.html"),
    THUMBNAIL_ERROR_BASE("fragments/admin/thumbnail/thumbnail-error-base.html"),
    THUMBNAIL_ERROR_LIST("fragments/admin/thumbnail/thumbnail-error-results.html");

    private final String page;

    AdminFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
