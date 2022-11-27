package org.manazeak.manazeak.util;

import org.springframework.util.DigestUtils;

import java.util.Locale;

public final class HashUtil {

    private HashUtil() {

    }

    /**
     * Get the MD5 hash of the given value.
     *
     * @param value the value that will be hashed.
     * @return the hashed value.
     */
    public static String getMd5Hash(String value) {
        return getMd5HashLower(value).toUpperCase(Locale.ENGLISH);
    }

    public static String getMd5HashLower(String value) {
        return DigestUtils.md5DigestAsHex(value.getBytes());
    }

    /**
     * Get the MD5 hash of the given value.
     *
     * @param value the value that will be hashed.
     * @return the hashed value.
     */
    public static String getMd5Hash(StringBuilder value) {
        return getMd5Hash(value.toString());
    }
}
