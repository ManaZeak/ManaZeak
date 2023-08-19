package org.manazeak.manazeak.entity.reference;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="artist_type")
public class ArtistType implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long artistTypeId;
	private String code;
	private String type;

    /**
     * No comment found in model diagram
     * @return value of artistTypeId
     */
    @Id
    @SequenceGenerator(name="SEQ_ARTIST_TYPE", sequenceName="SEQ_ARTIST_TYPE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_ARTIST_TYPE")
    @Column(name="artist_type_id", nullable=false)
	public Long getArtistTypeId(){
		return artistTypeId;
    }  
    /**
     * No comment found in model diagram
     * @param artistTypeId new value to give to artistTypeId
     */
	public void setArtistTypeId(final Long artistTypeId){
		this.artistTypeId = artistTypeId;
    }  
    /**
     * No comment found in model diagram
     * @return value of code
     */
    @Column(name="code", nullable=false)
	public String getCode(){
		return code;
    }  
    /**
     * No comment found in model diagram
     * @param code new value to give to code
     */
	public void setCode(final String code){
		this.code = code;
    }  
    /**
     * No comment found in model diagram
     * @return value of type
     */
    @Column(name="type", nullable=false)
	public String getType(){
		return type;
    }  
    /**
     * No comment found in model diagram
     * @param type new value to give to type
     */
	public void setType(final String type){
		this.type = type;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (artistTypeId == null? 0 : artistTypeId.hashCode());
		result = 31 * result + (code == null? 0 : code.hashCode());
		result = 31 * result + (type == null? 0 : type.hashCode());
			
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
	    ArtistType otherArtistType = (ArtistType) other;
	    
		return (artistTypeId == null ?  (otherArtistType.artistTypeId == null) : artistTypeId.equals(otherArtistType.artistTypeId))
			&& (code == null ?  (otherArtistType.code == null) : code.equals(otherArtistType.code))
			&& (type == null ?  (otherArtistType.type == null) : type.equals(otherArtistType.type))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}