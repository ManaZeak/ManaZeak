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
@Table(name="cover")
public class Cover implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long coverId;
	private String filename;

    /**
     * No comment found in model diagram
     * @return value of coverId
     */
    @Id
    @SequenceGenerator(name="SEQ_COVER", sequenceName="SEQ_COVER", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_COVER")
    @Column(name="cover_id", nullable=false)
	public Long getCoverId(){
		return coverId;
    }  
    /**
     * No comment found in model diagram
     * @param coverId new value to give to coverId
     */
	public void setCoverId(final Long coverId){
		this.coverId = coverId;
    }  
    /**
     * No comment found in model diagram
     * @return value of filename
     */
    @Column(name="filename", nullable=false)
	public String getFilename(){
		return filename;
    }  
    /**
     * No comment found in model diagram
     * @param filename new value to give to filename
     */
	public void setFilename(final String filename){
		this.filename = filename;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (coverId == null? 0 : coverId.hashCode());
		result = 31 * result + (filename == null? 0 : filename.hashCode());
			
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
	    Cover otherCover = (Cover) other;
	    
		return (coverId == null ?  (otherCover.coverId == null) : coverId.equals(otherCover.coverId))
			&& (filename == null ?  (otherCover.filename == null) : filename.equals(otherCover.filename))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}