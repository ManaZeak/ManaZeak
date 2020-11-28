package org.manazeak.manazeak.controller.page.response;

/**
 * Contains the common pages for the fragments.
 */
public enum ResponseFragmentEnum {
    SUCCESS_RESPONSE("fragments/response/success-response.html");

    private final String page;

    ResponseFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
