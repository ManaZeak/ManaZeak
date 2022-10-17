package org.manazeak.manazeak.constant.tag;

/**
 * Contains the fields that are not available in the field enum.
 */
public enum FieldsTagEnum {

    DISCNUMBER,
    RELEASEDATE,
    EAN_UPN("EAN/UPN"),
    LOCATION,
    CATALOGNUMBER,
    KEY("INITIALKEY");

    private final String tag;

    FieldsTagEnum() {
        tag = this.name();
    }

    FieldsTagEnum(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }
}
