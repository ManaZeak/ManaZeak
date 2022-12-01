package org.manazeak.manazeak.util;

import java.util.regex.Pattern;

/**
 * Util class for handling fields.
 */
public final class FieldUtil {

    private static final String PLACEHOLDER_CHAR = "-";

    private static final Pattern FORBIDDEN_CHAR_PATTERN = Pattern.compile("[*/\\\\:;?<>\"|]");

    private FieldUtil() {

    }

    /**
     * Check if a given String is empty or not.
     *
     * @param value The String to test.
     * @return true if the field is not empty.
     */
    public static boolean checkStringNotEmpty(String value) {
        if (value == null) {
            return false;
        }
        // If the value is not empty, returning true.
        return !value.isEmpty();
    }

    /**
     * Check if the given id is empty or on the no select item.
     *
     * @param value the value of the id.
     * @return True if the id field is not on default value or null.
     */
    public static boolean isIdFieldEmpty(Long value) {
        // If the value is null or is equal to 0 it can't be an id.
        return value == null || value == 0;
    }

    /**
     * Remove from a string the char that can't be used in the FS.
     *
     * @param value The value to clean.
     * @return The cleared string.
     */
    public static String removeForbiddenFsChar(String value) {
        if (value == null) {
            return null;
        }

        return FORBIDDEN_CHAR_PATTERN.matcher(value).replaceAll(PLACEHOLDER_CHAR);
    }
}
