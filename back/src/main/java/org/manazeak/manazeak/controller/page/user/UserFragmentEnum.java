package org.manazeak.manazeak.controller.page.user;

/**
 * This enum contains all the addresses referencing page fragments for the user.
 */
public enum UserFragmentEnum {

    USER_PROFILE("fragments/account/profile.html"),
    EDIT_ACCOUNT_MODAL("fragments/modal/edit-account.html"),
    RESET_PASSWORD_MODAL("fragments/modal/reset-password.html");

    private final String page;

    UserFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
