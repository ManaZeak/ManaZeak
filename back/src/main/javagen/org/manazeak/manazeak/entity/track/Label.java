package org.manazeak.manazeak.entity.track;

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
@Table(name="label")
public class Label implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long labelId;
	private String name;
	private String pictureFilename;
	private Boolean artistReleased;

    /**
     * No comment found in model diagram
     * @return value of labelId
     */
    @Id
    @SequenceGenerator(name="SEQ_LABEL", sequenceName="SEQ_LABEL", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_LABEL")
    @Column(name="label_id", nullable=false)
	public Long getLabelId(){
		return labelId;
    }  
    /**
     * No comment found in model diagram
     * @param labelId new value to give to labelId
     */
	public void setLabelId(final Long labelId){
		this.labelId = labelId;
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
     * @return value of artistReleased
     */
    @Column(name="artist_released", nullable=false)
	public Boolean getArtistReleased(){
		return artistReleased;
    }  
    /**
     * No comment found in model diagram
     * @param artistReleased new value to give to artistReleased
     */
	public void setArtistReleased(final Boolean artistReleased){
		this.artistReleased = artistReleased;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (labelId == null? 0 : labelId.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
		result = 31 * result + (pictureFilename == null? 0 : pictureFilename.hashCode());
		result = 31 * result + (artistReleased == null? 0 : artistReleased.hashCode());
			
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
	    Label otherLabel = (Label) other;
	    
		return (labelId == null ?  (otherLabel.labelId == null) : labelId.equals(otherLabel.labelId))
			&& (name == null ?  (otherLabel.name == null) : name.equals(otherLabel.name))
			&& (pictureFilename == null ?  (otherLabel.pictureFilename == null) : pictureFilename.equals(otherLabel.pictureFilename))
			&& (artistReleased == null ?  (otherLabel.artistReleased == null) : artistReleased.equals(otherLabel.artistReleased))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}