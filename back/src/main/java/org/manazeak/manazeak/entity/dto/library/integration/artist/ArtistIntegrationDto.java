package org.manazeak.manazeak.entity.dto.library.integration.artist;


import java.time.LocalDateTime;
import java.util.List;

/**
 * Contains the information about an artist before the database integration.
 */
public class ArtistIntegrationDto {

    private Long id;

    private String name;

    private String location;

    private boolean isLabel;

    private LocalDateTime modificationDate;

    private List<String> subArtists;

    private Long labelId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public LocalDateTime getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(LocalDateTime modificationDate) {
        this.modificationDate = modificationDate;
    }

    public boolean isLabel() {
        return isLabel;
    }

    public void setLabel(boolean label) {
        isLabel = label;
    }

    public List<String> getSubArtists() {
        return subArtists;
    }

    public void setSubArtists(List<String> subArtists) {
        this.subArtists = subArtists;
    }

    public void addArtist(String subArtist) {
        subArtists.add(subArtist);
    }

    public Long getLabelId() {
        return labelId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }
}
