package org.manazeak.manazeak.controller.page.library.label;

/**
 * Contains the page available for the labels.
 */
public enum LabelFragmentEnum {

    LABEL_DETAIL("fragments/library/label/label-detail.html");

    private final String page;

    LabelFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}
