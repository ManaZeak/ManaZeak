package org.manazeak.manazeak.util.audio.tag;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

public final class TagSplitterHelper {

    private static final Pattern PATTERN = Pattern.compile(";");

    private TagSplitterHelper() {

    }

    /**
     * Split the tags.
     *
     * @param tag The tag that must be spliced.
     * @return The spliced tags.
     */
    public static List<String> splitTag(String tag) {
        // Split the data with the regex pattern
        String[] data = PATTERN.split(tag);
        // Convert the array into a list.
        return Arrays.asList(data);
    }

}
