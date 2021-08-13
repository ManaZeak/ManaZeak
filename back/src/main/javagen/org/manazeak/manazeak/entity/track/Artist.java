package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.SequenceGenerator;
import javax.persistence.Id;
import javax.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="Artist")
public class Artist implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long artistId;
	private String name;

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

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (artistId == null? 0 : artistId.hashCode());
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
	    Artist otherArtist = (Artist) other;
	    
		return (artistId == null ?  (otherArtist.artistId == null) : artistId.equals(otherArtist.artistId))
			&& (name == null ?  (otherArtist.name == null) : name.equals(otherArtist.name))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}