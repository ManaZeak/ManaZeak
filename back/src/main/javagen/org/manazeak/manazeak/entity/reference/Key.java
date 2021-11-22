package org.manazeak.manazeak.entity.reference;

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
@Table(name="key")
public class Key implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long keyId;
	private String label;

    /**
     * No comment found in model diagram
     * @return value of keyId
     */
    @Id
    @SequenceGenerator(name="SEQ_KEY", sequenceName="SEQ_KEY", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_KEY")
    @Column(name="key_id", nullable=false)
	public Long getKeyId(){
		return keyId;
    }  
    /**
     * No comment found in model diagram
     * @param keyId new value to give to keyId
     */
	public void setKeyId(final Long keyId){
		this.keyId = keyId;
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

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (keyId == null? 0 : keyId.hashCode());
		result = 31 * result + (label == null? 0 : label.hashCode());
			
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
	    Key otherKey = (Key) other;
	    
		return (keyId == null ?  (otherKey.keyId == null) : keyId.equals(otherKey.keyId))
			&& (label == null ?  (otherKey.label == null) : label.equals(otherKey.label))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}