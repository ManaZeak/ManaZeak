package org.manazeak.manazeak.controller.page.account;

public enum AccountFragmentEnum {
    ACCOUNT_PAGE("fragments/account/accountpage.html"),
    ACCOUNT_EDIT_PAGE("fragments/account/profile-edit.html"),
    PREFERENCE("fragments/account/preference.html");

    private final String page;

    AccountFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
