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
@Table(name="alias")
public class Alias implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long aliasId;
	private String value;

    /**
     * No comment found in model diagram
     * @return value of aliasId
     */
    @Id
    @SequenceGenerator(name="SEQ_ALIAS", sequenceName="SEQ_ALIAS", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_ALIAS")
    @Column(name="alias_id", nullable=false)
	public Long getAliasId(){
		return aliasId;
    }  
    /**
     * No comment found in model diagram
     * @param aliasId new value to give to aliasId
     */
	public void setAliasId(final Long aliasId){
		this.aliasId = aliasId;
    }  
    /**
     * No comment found in model diagram
     * @return value of value
     */
    @Column(name="value", nullable=false)
	public String getValue(){
		return value;
    }  
    /**
     * No comment found in model diagram
     * @param value new value to give to value
     */
	public void setValue(final String value){
		this.value = value;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (aliasId == null? 0 : aliasId.hashCode());
		result = 31 * result + (value == null? 0 : value.hashCode());
			
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
	    Alias otherAlias = (Alias) other;
	    
		return (aliasId == null ?  (otherAlias.aliasId == null) : aliasId.equals(otherAlias.aliasId))
			&& (value == null ?  (otherAlias.value == null) : value.equals(otherAlias.value))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}