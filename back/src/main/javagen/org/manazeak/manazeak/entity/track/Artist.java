package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Set;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.CascadeType;
import org.manazeak.manazeak.entity.reference.Country;
import jakarta.persistence.Id;
import org.manazeak.manazeak.entity.reference.ArtistType;
import jakarta.persistence.JoinTable;

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
	private Integer birthDate;
	private Integer deathDate;
	private LocalDateTime lastModificationDate;
	private Boolean isLabel;
	private String pictureFilename;
	private String birthPlace;
	private String deathPlace;
	private Set<Alias> aliasList;
	private Set<Country> originCountryList;
	private Country countryOfDeath;
	private Country countryOfBirth;
	private Label label;
	private Set<Link> linkList;
	private Set<Artist> previousMemberList;
	private ArtistType artistType;
	private Set<Testimony> testimonyList;

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
	public Integer getBirthDate(){
		return birthDate;
    }  
    /**
     * No comment found in model diagram
     * @param birthDate new value to give to birthDate
     */
	public void setBirthDate(final Integer birthDate){
		this.birthDate = birthDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of deathDate
     */
    @Column(name="death_date", nullable=true)
	public Integer getDeathDate(){
		return deathDate;
    }  
    /**
     * No comment found in model diagram
     * @param deathDate new value to give to deathDate
     */
	public void setDeathDate(final Integer deathDate){
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
     * @return value of birthPlace
     */
    @Column(name="birth_place", nullable=true)
	public String getBirthPlace(){
		return birthPlace;
    }  
    /**
     * No comment found in model diagram
     * @param birthPlace new value to give to birthPlace
     */
	public void setBirthPlace(final String birthPlace){
		this.birthPlace = birthPlace;
    }  
    /**
     * No comment found in model diagram
     * @return value of deathPlace
     */
    @Column(name="death_place", nullable=true)
	public String getDeathPlace(){
		return deathPlace;
    }  
    /**
     * No comment found in model diagram
     * @param deathPlace new value to give to deathPlace
     */
	public void setDeathPlace(final String deathPlace){
		this.deathPlace = deathPlace;
    }  
    /**
     * Association artist_alias to Alias
     * @return value of aliasList
     */
    @JoinColumn(name="artist_id", referencedColumnName="artist_id")
    @OneToMany(orphanRemoval=true)
	public Set<Alias> getAliasList(){
		return aliasList;
    }  
    /**
     * Association artist_alias to Alias
     * @param aliasList new value to give to aliasList
     */
	public void setAliasList(final Set<Alias> aliasList){
		this.aliasList = aliasList;
    }  
    /**
     * Association artist_origin_country to Country
     * @return value of originCountryList
     */
    @ManyToMany(mappedBy="artistOriginCountryList", cascade={CascadeType.PERSIST,CascadeType.MERGE})
	public Set<Country> getOriginCountryList(){
		return originCountryList;
    }  
    /**
     * Association artist_origin_country to Country
     * @param originCountryList new value to give to originCountryList
     */
	public void setOriginCountryList(final Set<Country> originCountryList){
		this.originCountryList = originCountryList;
    }  
    /**
     * Association country_of_death to Country
     * @return value of countryOfDeath
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="death_country_id", referencedColumnName="country_id")
	public Country getCountryOfDeath(){
		return countryOfDeath;
    }  
    /**
     * Association country_of_death to Country
     * @param countryOfDeath new value to give to countryOfDeath
     */
	public void setCountryOfDeath(final Country countryOfDeath){
		this.countryOfDeath = countryOfDeath;
    }  
    /**
     * Association country_of_birth to Country
     * @return value of countryOfBirth
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="birth_country_id", referencedColumnName="country_id")
	public Country getCountryOfBirth(){
		return countryOfBirth;
    }  
    /**
     * Association country_of_birth to Country
     * @param countryOfBirth new value to give to countryOfBirth
     */
	public void setCountryOfBirth(final Country countryOfBirth){
		this.countryOfBirth = countryOfBirth;
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
     * @return value of linkList
     */
    @JoinColumn(name="artist_id", referencedColumnName="artist_id")
    @OneToMany(orphanRemoval=true)
	public Set<Link> getLinkList(){
		return linkList;
    }  
    /**
     * Association band_link to Link
     * @param linkList new value to give to linkList
     */
	public void setLinkList(final Set<Link> linkList){
		this.linkList = linkList;
    }  
    /**
     * Association band_previous_member to Artist
     * @return value of previousMemberList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="band_previous_member", joinColumns=@JoinColumn(name = "band_id"), inverseJoinColumns=@JoinColumn(name = "prev_member_id"))
	public Set<Artist> getPreviousMemberList(){
		return previousMemberList;
    }  
    /**
     * Association band_previous_member to Artist
     * @param previousMemberList new value to give to previousMemberList
     */
	public void setPreviousMemberList(final Set<Artist> previousMemberList){
		this.previousMemberList = previousMemberList;
    }  
    /**
     * Association artist_type to ArtistType
     * @return value of artistType
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="artist_type_id", referencedColumnName="artist_type_id")
	public ArtistType getArtistType(){
		return artistType;
    }  
    /**
     * Association artist_type to ArtistType
     * @param artistType new value to give to artistType
     */
	public void setArtistType(final ArtistType artistType){
		this.artistType = artistType;
    }  
    /**
     * Association artist_testimony to Testimony
     * @return value of testimonyList
     */
    @JoinColumn(name="artist_id", referencedColumnName="artist_id")
    @OneToMany(orphanRemoval=true)
	public Set<Testimony> getTestimonyList(){
		return testimonyList;
    }  
    /**
     * Association artist_testimony to Testimony
     * @param testimonyList new value to give to testimonyList
     */
	public void setTestimonyList(final Set<Testimony> testimonyList){
		this.testimonyList = testimonyList;
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
		result = 31 * result + (pictureFilename == null? 0 : pictureFilename.hashCode());
		result = 31 * result + (birthPlace == null? 0 : birthPlace.hashCode());
		result = 31 * result + (deathPlace == null? 0 : deathPlace.hashCode());
			
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
			&& (pictureFilename == null ?  (otherArtist.pictureFilename == null) : pictureFilename.equals(otherArtist.pictureFilename))
			&& (birthPlace == null ?  (otherArtist.birthPlace == null) : birthPlace.equals(otherArtist.birthPlace))
			&& (deathPlace == null ?  (otherArtist.deathPlace == null) : deathPlace.equals(otherArtist.deathPlace))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}