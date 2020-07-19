package org.manazeak.manazeak.util;

/**
 * Util class for handling fields.
 */
public class FieldUtil {

    private FieldUtil() {

    }

    /**
     * Check if a given String is empty or not.
     *
     * @return true if the field is not empty.
     */
    public static boolean checkStringNotEmpty(String value) {
        if (value == null) {
            return false;
        }
        // If the value is not empty, returning true.
        return !value.isEmpty();
    }
}
