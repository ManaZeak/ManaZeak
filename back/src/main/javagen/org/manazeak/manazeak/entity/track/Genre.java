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
@Table(name="genre")
public class Genre implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long genreId;
	private String name;
	private String description;
	private String pictureFilename;

    /**
     * No comment found in model diagram
     * @return value of genreId
     */
    @Id
    @SequenceGenerator(name="SEQ_GENRE", sequenceName="SEQ_GENRE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_GENRE")
    @Column(name="genre_id", nullable=false)
	public Long getGenreId(){
		return genreId;
    }  
    /**
     * No comment found in model diagram
     * @param genreId new value to give to genreId
     */
	public void setGenreId(final Long genreId){
		this.genreId = genreId;
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
     * @return value of description
     */
    @Column(name="description", nullable=true)
	public String getDescription(){
		return description;
    }  
    /**
     * No comment found in model diagram
     * @param description new value to give to description
     */
	public void setDescription(final String description){
		this.description = description;
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

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (genreId == null? 0 : genreId.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
		result = 31 * result + (description == null? 0 : description.hashCode());
		result = 31 * result + (pictureFilename == null? 0 : pictureFilename.hashCode());
			
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
	    Genre otherGenre = (Genre) other;
	    
		return (genreId == null ?  (otherGenre.genreId == null) : genreId.equals(otherGenre.genreId))
			&& (name == null ?  (otherGenre.name == null) : name.equals(otherGenre.name))
			&& (description == null ?  (otherGenre.description == null) : description.equals(otherGenre.description))
			&& (pictureFilename == null ?  (otherGenre.pictureFilename == null) : pictureFilename.equals(otherGenre.pictureFilename))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}