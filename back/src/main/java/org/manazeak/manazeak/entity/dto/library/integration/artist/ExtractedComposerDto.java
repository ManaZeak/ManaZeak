package org.manazeak.manazeak.entity.dto.library.integration.artist;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

/**
 * Contains a composer that have been extracted from the tags.
 */
@Data
@NoArgsConstructor
public class ExtractedComposerDto {

    private final Set<String> members = new HashSet<>();
    private String name;

    public void addMembers(Set<String> newMembers) {
        members.addAll(newMembers);
    }
}
