package org.manazeak.manazeak.entity.security;

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
@Table(name="wish_status")
public class WishStatus implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long wishStatusId;
	private String code;

    /**
     * No comment found in model diagram
     * @return value of wishStatusId
     */
    @Id
    @SequenceGenerator(name="SEQ_WISH_STATUS", sequenceName="SEQ_WISH_STATUS", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_WISH_STATUS")
    @Column(name="wish_status_id", nullable=false)
	public Long getWishStatusId(){
		return wishStatusId;
    }  
    /**
     * No comment found in model diagram
     * @param wishStatusId new value to give to wishStatusId
     */
	public void setWishStatusId(final Long wishStatusId){
		this.wishStatusId = wishStatusId;
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

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (wishStatusId == null? 0 : wishStatusId.hashCode());
		result = 31 * result + (code == null? 0 : code.hashCode());
			
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
	    WishStatus otherWishStatus = (WishStatus) other;
	    
		return (wishStatusId == null ?  (otherWishStatus.wishStatusId == null) : wishStatusId.equals(otherWishStatus.wishStatusId))
			&& (code == null ?  (otherWishStatus.code == null) : code.equals(otherWishStatus.code))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}