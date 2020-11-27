package org.manazeak.manazeak.controller.page;

/**
 * Contains the common pages for the fragments.
 */
public enum GeneralFragmentEnum {
    EMPTY_PAGE("fragments/success-response.html");

    private final String page;

    GeneralFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
