package org.manazeak.manazeak.util;

import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to do operation of casting elements.
 */
public final class CastUtil {

    private CastUtil() {

    }

    /**
     * Create a new list with the element of the other list and cast each one.
     *
     * @param clazz the destination class.
     * @param c     the list of objects that have to be casted.
     * @param <T>   The type of the list.
     * @return the casted list.
     */
    public static <T> List<T> castList(final Class<? extends T> clazz, final Iterable<?> c) {
        if (c == null) {
            return new ArrayList<>();
        }

        final List<T> r = new ArrayList<>();
        for (final Object o : c) {
            r.add(clazz.cast(o));
        }
        return r;
    }

    /**
     * Cast a string into an integer.
     *
     * @param value the value to convert.
     * @return An integer.
     */
    public static Integer castStringToInt(String value) {
        if (value == null || value.isEmpty()) {
            return null;
        }
        return Integer.parseInt(value);
    }

    /**
     * Cast a string into a double.
     *
     * @param value The value to convert.
     * @return The double value.
     */
    public static Double castStringToDouble(String value) {
        if (StringUtils.isEmpty(value)) {
            return null;
        }

        return Double.parseDouble(value);
    }

}
