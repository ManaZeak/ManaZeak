package org.manazeak.manazeak.entity.dto.library.artist;

import java.util.HashSet;
import java.util.Set;

/**
 * Contains a composer that have been extracted from the tags.
 */
public class ExtractedComposerDto {

    private Set<String> members = new HashSet<>();
    private String name;

    /**
     * @return The name of the composer.
     */
    public String getName() {
        return name;
    }

    /**
     * @param name The new name of the artist.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return The real names of the band.
     */
    public Set<String> getMembers() {
        return members;
    }

    public void setMembers(Set<String> members) {
        this.members = members;
    }

    /**
     * @param member The member to be added to the list.
     */
    public void addMember(String member) {
        members.add(member);
    }
}
