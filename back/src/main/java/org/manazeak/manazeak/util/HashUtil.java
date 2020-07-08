package org.manazeak.manazeak.util;

import org.springframework.util.DigestUtils;

public final class HashUtil {

    private HashUtil() {

    }

    /**
     * Get the MD5 hash of the given value.
     * @param value the value that will be hashed.
     * @return the hashed value.
     */
    public static String getMd5Hash(String value) {
        return DigestUtils.md5DigestAsHex(value.getBytes());
    }

    /**
     * Get the MD5 hash of the given value.
     * @param value the value that will be hashed.
     * @return the hashed value.
     */
    public static String getMd5Hash(StringBuilder value) {
        return getMd5Hash(value.toString());
    }
}
