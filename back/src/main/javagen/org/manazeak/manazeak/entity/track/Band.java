package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.SequenceGenerator;
import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.JoinTable;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="Band")
public class Band implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long bandId;
	private String name;
	private Set<Artist> artistList;

    /**
     * No comment found in model diagram
     * @return value of bandId
     */
    @Id
    @SequenceGenerator(name="SEQ_BAND", sequenceName="SEQ_BAND", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_BAND")
    @Column(name="band_id", nullable=false)
	public Long getBandId(){
		return bandId;
    }  
    /**
     * No comment found in model diagram
     * @param bandId new value to give to bandId
     */
	public void setBandId(final Long bandId){
		this.bandId = bandId;
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
     * Association band_artist to Artist
     * @return value of artistList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="band_artist", joinColumns=@JoinColumn(name = "band_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getArtistList(){
		return artistList;
    }  
    /**
     * Association band_artist to Artist
     * @param artistList new value to give to artistList
     */
	public void setArtistList(final Set<Artist> artistList){
		this.artistList = artistList;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (bandId == null? 0 : bandId.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
			
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
	    Band otherBand = (Band) other;
	    
		return (bandId == null ?  (otherBand.bandId == null) : bandId.equals(otherBand.bandId))
			&& (name == null ?  (otherBand.name == null) : name.equals(otherBand.name))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}