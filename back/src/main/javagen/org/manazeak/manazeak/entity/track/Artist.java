package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import org.manazeak.manazeak.entity.reference.Country;
import javax.persistence.Id;
import java.time.LocalDate;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;

/**
 * The information about the 
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
	private String realName;
	private LocalDate birthDate;
	private LocalDate deathDate;
	private Country country;
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
    @Column(name="name", nullable=true)
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
     * @return value of realName
     */
    @Column(name="real_name", nullable=true)
	public String getRealName(){
		return realName;
    }  
    /**
     * No comment found in model diagram
     * @param realName new value to give to realName
     */
	public void setRealName(final String realName){
		this.realName = realName;
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
     * Association artist_bio to Bio
     * @return value of bio
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="bio_id", referencedColumnName="bio_id")
	public Bio getBio(){
		return bio;
    }  
    /**
     * Association artist_bio to Bio
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
		result = 31 * result + (realName == null? 0 : realName.hashCode());
		result = 31 * result + (birthDate == null? 0 : birthDate.hashCode());
		result = 31 * result + (deathDate == null? 0 : deathDate.hashCode());
			
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
			&& (realName == null ?  (otherArtist.realName == null) : realName.equals(otherArtist.realName))
			&& (birthDate == null ?  (otherArtist.birthDate == null) : birthDate.equals(otherArtist.birthDate))
			&& (deathDate == null ?  (otherArtist.deathDate == null) : deathDate.equals(otherArtist.deathDate))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}