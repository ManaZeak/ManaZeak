package org.manazeak.manazeak.controller.page.user.wish;

/**
 * This enum contains the address of the fragments for the wishes.
 */
public enum WishFragmentEnum {

    WISH_CREATION("fragments/user/wish/wish-creation.html");

    private final String page;

    WishFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
