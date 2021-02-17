package org.manazeak.manazeak.controller.page.user.badge;

/**
 * Get badge fragments html.
 */
public enum BadgeFragmentEnum {

    BADGE_LIST("fragments/admin/badge/badge-list.html"),
    NEW_BADGE_MODAL("fragments/modal/badge-creation.html");

    private final String page;

    BadgeFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
