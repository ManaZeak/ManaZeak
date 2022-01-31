package org.manazeak.manazeak.entity.dto.library.artist;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information displayed in the artist detail view.
 */
public class ArtistDetailsDto {

    private Long artistId;
    private String name;
    private String location;
    private LocalDate birthDate;
    private LocalDate deathDate;
    private Boolean isLabel;
    private String testimonyFrom;
    private String testimonyText;
    private String countryCode;
    private Long labelId;
    private String label;
    private List<String> links;
    private String bio;
    private final List<ArtistMinimalInfoDto> members = new ArrayList<>();

    public ArtistDetailsDto(Long artistId, String name, String location, LocalDate birthDate,
                            LocalDate deathDate, Boolean isLabel, String testimonyFrom,
                            String testimonyText, String countryCode, Long labelId, String label, String bio) {
        this.artistId = artistId;
        this.name = name;
        this.location = location;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.isLabel = isLabel;
        this.testimonyFrom = testimonyFrom;
        this.testimonyText = testimonyText;
        this.countryCode = countryCode;
        this.labelId = labelId;
        this.label = label;
        this.bio = bio;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setLabel(Boolean label) {
        isLabel = label;
    }

    public Boolean isLabel() {
        return isLabel;
    }

    public Long getLabelId() {
        return labelId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<ArtistMinimalInfoDto> getMembers() {
        return members;
    }

    public void addMember(ArtistMinimalInfoDto member) {
        members.add(member);
    }

    public String getTestimonyFrom() {
        return testimonyFrom;
    }

    public void setTestimonyFrom(String testimonyFrom) {
        this.testimonyFrom = testimonyFrom;
    }

    public String getTestimonyText() {
        return testimonyText;
    }

    public void setTestimonyText(String testimonyText) {
        this.testimonyText = testimonyText;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }
}
