package org.manazeak.manazeak.util.audio.tag;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.entity.dto.library.artist.ExtractedComposerDto;

import java.util.List;

/**
 * Test that the tag manipulation works properly.
 */
class TagSplitterUtilTest extends AbstractManaZeakTest {

    /**
     * Test that the performer string splitting works.
     */
    @Test
    void testPerformerSplitter() {
        List<ExtractedComposerDto> performers = TagSplitterUtil.splitComposer(
                "test (rl name, toast); test3; test2 (lel)");
        // Checking that the performers extracted.
        Assertions.assertEquals(3, performers.size(), "Invalid number of performers extracted.");
        ExtractedComposerDto performer = performers.get(0);
        Assertions.assertEquals("test", performer.getName(), "Invalid performer name extracted.");
        Assertions.assertEquals(2, performer.getMembers().size(), "Invalid member number extracted.");
        Assertions.assertTrue(performer.getMembers().contains("rl name"), "Invalid member name.");
        Assertions.assertTrue(performer.getMembers().contains("toast"), "Invalid member name.");
    }

}
