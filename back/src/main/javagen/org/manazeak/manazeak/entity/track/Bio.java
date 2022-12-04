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
@Table(name="bio")
public class Bio implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long bioId;
	private String text;

    /**
     * No comment found in model diagram
     * @return value of bioId
     */
    @Id
    @SequenceGenerator(name="SEQ_BIO", sequenceName="SEQ_BIO", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_BIO")
    @Column(name="bio_id", nullable=false)
	public Long getBioId(){
		return bioId;
    }  
    /**
     * No comment found in model diagram
     * @param bioId new value to give to bioId
     */
	public void setBioId(final Long bioId){
		this.bioId = bioId;
    }  
    /**
     * No comment found in model diagram
     * @return value of text
     */
    @Column(name="text", nullable=false)
	public String getText(){
		return text;
    }  
    /**
     * No comment found in model diagram
     * @param text new value to give to text
     */
	public void setText(final String text){
		this.text = text;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (bioId == null? 0 : bioId.hashCode());
		result = 31 * result + (text == null? 0 : text.hashCode());
			
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
	    Bio otherBio = (Bio) other;
	    
		return (bioId == null ?  (otherBio.bioId == null) : bioId.equals(otherBio.bioId))
			&& (text == null ?  (otherBio.text == null) : text.equals(otherBio.text))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}