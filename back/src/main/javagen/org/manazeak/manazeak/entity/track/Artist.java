package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import javax.persistence.ManyToMany;
import java.time.LocalDate;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.CascadeType;
import org.manazeak.manazeak.entity.reference.Country;
import javax.persistence.Id;
import javax.persistence.JoinTable;

/**
 * Contains the bands of the application.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="artist")
public class Artist implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long artistId;
	private String name;
	private String location;
	private LocalDate birthDate;
	private LocalDate deathDate;
	private LocalDateTime lastModificationDate;
	private Boolean isLabel;
	private String testimonyFrom;
	private String pictureFilename;
	private String testimonyText;
	private Country country;
	private Set<Artist> memberList;
	private Label label;
	private Link link;
	private Bio bio;

    /**
     * No comment found in model diagram
     * @return value of artistId
     */
    @Id
    @SequenceGenerator(name="SEQ_ARTIST", sequenceName="SEQ_ARTIST", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_ARTIST")
    @Column(name="artist_id", nullable=false)
	public Long getArtistId(){
		return artistId;
    }  
    /**
     * No comment found in model diagram
     * @param artistId new value to give to artistId
     */
	public void setArtistId(final Long artistId){
		this.artistId = artistId;
    }  
    /**
     * No comment found in model diagram
     * @return value of name
     */
    @Column(name="name", nullable=false)
	public String getName(){
		return name;
    }  
    /**
     * No comment found in model diagram
     * @param name new value to give to name
     */
	public void setName(final String name){
		this.name = name;
    }  
    /**
     * No comment found in model diagram
     * @return value of location
     */
    @Column(name="location", nullable=true)
	public String getLocation(){
		return location;
    }  
    /**
     * No comment found in model diagram
     * @param location new value to give to location
     */
	public void setLocation(final String location){
		this.location = location;
    }  
    /**
     * No comment found in model diagram
     * @return value of birthDate
     */
    @Column(name="birth_date", nullable=true)
	public LocalDate getBirthDate(){
		return birthDate;
    }  
    /**
     * No comment found in model diagram
     * @param birthDate new value to give to birthDate
     */
	public void setBirthDate(final LocalDate birthDate){
		this.birthDate = birthDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of deathDate
     */
    @Column(name="death_date", nullable=true)
	public LocalDate getDeathDate(){
		return deathDate;
    }  
    /**
     * No comment found in model diagram
     * @param deathDate new value to give to deathDate
     */
	public void setDeathDate(final LocalDate deathDate){
		this.deathDate = deathDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of lastModificationDate
     */
    @Column(name="last_modification_date", nullable=false)
	public LocalDateTime getLastModificationDate(){
		return lastModificationDate;
    }  
    /**
     * No comment found in model diagram
     * @param lastModificationDate new value to give to lastModificationDate
     */
	public void setLastModificationDate(final LocalDateTime lastModificationDate){
		this.lastModificationDate = lastModificationDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of isLabel
     */
    @Column(name="is_label", nullable=false)
	public Boolean getIsLabel(){
		return isLabel;
    }  
    /**
     * No comment found in model diagram
     * @param isLabel new value to give to isLabel
     */
	public void setIsLabel(final Boolean isLabel){
		this.isLabel = isLabel;
    }  
    /**
     * No comment found in model diagram
     * @return value of testimonyFrom
     */
    @Column(name="testimony_from", nullable=true)
	public String getTestimonyFrom(){
		return testimonyFrom;
    }  
    /**
     * No comment found in model diagram
     * @param testimonyFrom new value to give to testimonyFrom
     */
	public void setTestimonyFrom(final String testimonyFrom){
		this.testimonyFrom = testimonyFrom;
    }  
    /**
     * No comment found in model diagram
     * @return value of pictureFilename
     */
    @Column(name="picture_filename", nullable=true)
	public String getPictureFilename(){
		return pictureFilename;
    }  
    /**
     * No comment found in model diagram
     * @param pictureFilename new value to give to pictureFilename
     */
	public void setPictureFilename(final String pictureFilename){
		this.pictureFilename = pictureFilename;
    }  
    /**
     * No comment found in model diagram
     * @return value of testimonyText
     */
    @Column(name="testimony_text", nullable=true)
	public String getTestimonyText(){
		return testimonyText;
    }  
    /**
     * No comment found in model diagram
     * @param testimonyText new value to give to testimonyText
     */
	public void setTestimonyText(final String testimonyText){
		this.testimonyText = testimonyText;
    }  
    /**
     * Association artist_birth_country to Country
     * @return value of country
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="country_id", referencedColumnName="country_id")
	public Country getCountry(){
		return country;
    }  
    /**
     * Association artist_birth_country to Country
     * @param country new value to give to country
     */
	public void setCountry(final Country country){
		this.country = country;
    }  
    /**
     * Association band_member to Artist
     * @return value of memberList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="band_member", joinColumns=@JoinColumn(name = "band_id"), inverseJoinColumns=@JoinColumn(name = "member_id"))
	public Set<Artist> getMemberList(){
		return memberList;
    }  
    /**
     * Association band_member to Artist
     * @param memberList new value to give to memberList
     */
	public void setMemberList(final Set<Artist> memberList){
		this.memberList = memberList;
    }  
    /**
     * Association band_label to Label
     * @return value of label
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="label_id", referencedColumnName="label_id")
	public Label getLabel(){
		return label;
    }  
    /**
     * Association band_label to Label
     * @param label new value to give to label
     */
	public void setLabel(final Label label){
		this.label = label;
    }  
    /**
     * Association band_link to Link
     * @return value of link
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="link_id", referencedColumnName="link_id")
	public Link getLink(){
		return link;
    }  
    /**
     * Association band_link to Link
     * @param link new value to give to link
     */
	public void setLink(final Link link){
		this.link = link;
    }  
    /**
     * Association band_bio to Bio
     * @return value of bio
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="bio_id", referencedColumnName="bio_id")
	public Bio getBio(){
		return bio;
    }  
    /**
     * Association band_bio to Bio
     * @param bio new value to give to bio
     */
	public void setBio(final Bio bio){
		this.bio = bio;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (artistId == null? 0 : artistId.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
		result = 31 * result + (location == null? 0 : location.hashCode());
		result = 31 * result + (birthDate == null? 0 : birthDate.hashCode());
		result = 31 * result + (deathDate == null? 0 : deathDate.hashCode());
		result = 31 * result + (lastModificationDate == null? 0 : lastModificationDate.hashCode());
		result = 31 * result + (isLabel == null? 0 : isLabel.hashCode());
		result = 31 * result + (testimonyFrom == null? 0 : testimonyFrom.hashCode());
		result = 31 * result + (pictureFilename == null? 0 : pictureFilename.hashCode());
		result = 31 * result + (testimonyText == null? 0 : testimonyText.hashCode());
			
		return result;
	}

	@Override
	public boolean equals(Object other){
		// Null object
	    if(other == null){
	    	return false;
	    }
	
		// Same object
	    if (this == other) {
	        return true;
	    }
	    	
		// Wrong type
	    if (this.getClass() !=  other.getClass()) {
	        return false;
	    }
	
		// Test all "primitives" attributes
	    Artist otherArtist = (Artist) other;
	    
		return (artistId == null ?  (otherArtist.artistId == null) : artistId.equals(otherArtist.artistId))
			&& (name == null ?  (otherArtist.name == null) : name.equals(otherArtist.name))
			&& (location == null ?  (otherArtist.location == null) : location.equals(otherArtist.location))
			&& (birthDate == null ?  (otherArtist.birthDate == null) : birthDate.equals(otherArtist.birthDate))
			&& (deathDate == null ?  (otherArtist.deathDate == null) : deathDate.equals(otherArtist.deathDate))
			&& (lastModificationDate == null ?  (otherArtist.lastModificationDate == null) : lastModificationDate.equals(otherArtist.lastModificationDate))
			&& (isLabel == null ?  (otherArtist.isLabel == null) : isLabel.equals(otherArtist.isLabel))
			&& (testimonyFrom == null ?  (otherArtist.testimonyFrom == null) : testimonyFrom.equals(otherArtist.testimonyFrom))
			&& (pictureFilename == null ?  (otherArtist.pictureFilename == null) : pictureFilename.equals(otherArtist.pictureFilename))
			&& (testimonyText == null ?  (otherArtist.testimonyText == null) : testimonyText.equals(otherArtist.testimonyText))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}