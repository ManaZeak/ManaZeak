package org.manazeak.manazeak.util.audio.tag;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.artist.ExtractedComposerDto;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

/**
 * Split the information contained in a tag.
 */
public final class TagSplitterUtil {

    private static final String PERFORMER_REAL_NAME_START = " (";

    private TagSplitterUtil() {

    }

    /**
     * Split the tags.
     *
     * @param tag The tag that must be spliced.
     * @return The spliced tags.
     */
    public static List<String> splitTag(String tag) {
        // Split the data with the regex pattern
        String[] data = tag.split(";");
        // Trim The extracted data.
        for (int i = 0; i < data.length; ++i) {
            data[i] = data[i].trim();
        }
        // Convert the array into a list.
        return Arrays.asList(data);
    }

    /**
     * Split a performer field into an object.
     *
     * @param performerTag The string contained in the tag.
     * @return The performer objects.
     */
    public static List<ExtractedComposerDto> splitComposer(String performerTag) {
        List<ExtractedComposerDto> performers = new ArrayList<>();
        // Extracting the performers.
        for (String performer : splitTag(performerTag)) {
            // Extracting the real names for each performer.
            if (!performer.contains(PERFORMER_REAL_NAME_START)) {
                ExtractedComposerDto extractedPerformer = new ExtractedComposerDto();
                extractedPerformer.setName(performer);
                // Adding the performer into the list
                performers.add(extractedPerformer);
            } else {
                performers.add(splitPerformerRealName(performer));
            }
        }

        return performers;
    }

    /**
     * Split the performer when it has a real name.
     *
     * @param performerTag The tag of the performer in the track.
     * @return The extracted performer.
     */
    private static ExtractedComposerDto splitPerformerRealName(String performerTag) {
        // Getting the index of separator
        int startIndex = performerTag.indexOf(PERFORMER_REAL_NAME_START);
        String membersString = performerTag.substring(startIndex + 2, performerTag.length() - 1);

        // Getting the name of the performer.
        ExtractedComposerDto performer = new ExtractedComposerDto();
        performer.setName(performerTag.substring(0, startIndex));

        // Extracting the real names of the performers
        List<String> members = Arrays.asList(membersString.split(","));
        members.replaceAll(String::trim);
        performer.setMembers(new HashSet<>(members));

        return performer;
    }

    /**
     * Remove the root of the library.
     *
     * @param path The path of the element to remove the element.
     * @return The string of the location.
     */
    public static String removeRootPath(Path path) {
        if (path == null) {
            return null;
        }
        return path.toString().substring(LibraryConstant.LIBRARY_PATH.toString().length() + 1);
    }
}
