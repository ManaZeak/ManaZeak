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
@Table(name="thumb_error_type")
public class ThumbErrorType implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long thumbErrorTypeId;
	private String label;
	private String code;

    /**
     * No comment found in model diagram
     * @return value of thumbErrorTypeId
     */
    @Id
    @SequenceGenerator(name="SEQ_THUMB_ERROR_TYPE", sequenceName="SEQ_THUMB_ERROR_TYPE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_THUMB_ERROR_TYPE")
    @Column(name="thumb_error_type_id", nullable=false)
	public Long getThumbErrorTypeId(){
		return thumbErrorTypeId;
    }  
    /**
     * No comment found in model diagram
     * @param thumbErrorTypeId new value to give to thumbErrorTypeId
     */
	public void setThumbErrorTypeId(final Long thumbErrorTypeId){
		this.thumbErrorTypeId = thumbErrorTypeId;
    }  
    /**
     * No comment found in model diagram
     * @return value of label
     */
    @Column(name="label", nullable=false)
	public String getLabel(){
		return label;
    }  
    /**
     * No comment found in model diagram
     * @param label new value to give to label
     */
	public void setLabel(final String label){
		this.label = label;
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
		result = 31 * result + (thumbErrorTypeId == null? 0 : thumbErrorTypeId.hashCode());
		result = 31 * result + (label == null? 0 : label.hashCode());
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
	    ThumbErrorType otherThumbErrorType = (ThumbErrorType) other;
	    
		return (thumbErrorTypeId == null ?  (otherThumbErrorType.thumbErrorTypeId == null) : thumbErrorTypeId.equals(otherThumbErrorType.thumbErrorTypeId))
			&& (label == null ?  (otherThumbErrorType.label == null) : label.equals(otherThumbErrorType.label))
			&& (code == null ?  (otherThumbErrorType.code == null) : code.equals(otherThumbErrorType.code))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}