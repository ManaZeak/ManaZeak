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

    /**
     * Check if the given id is empty or on the no select item.
     * @param value the value of the id.
     * @return True if the id field is not on default value or null.
     */
    public static boolean isIdFieldNotEmpty(Long value) {
        // If the value is null or is equal to 0 it can't be an id.
        return !(value == null || value == 0);
    }
}
