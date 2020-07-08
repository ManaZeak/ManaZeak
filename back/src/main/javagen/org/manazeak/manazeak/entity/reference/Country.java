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
@Table(name="Country")
public class Country implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long countryId;
	private String name;

    /**
     * No comment found in model diagram
     * @return value of countryId
     */
    @Id
    @SequenceGenerator(name="SEQ_COUNTRY", sequenceName="SEQ_COUNTRY", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_COUNTRY")
    @Column(name="country_id", nullable=false)
	public Long getCountryId(){
		return countryId;
    }  
    /**
     * No comment found in model diagram
     * @param countryId new value to give to countryId
     */
	public void setCountryId(final Long countryId){
		this.countryId = countryId;
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
		result = 31 * result + (countryId == null? 0 : countryId.hashCode());
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
	    Country otherCountry = (Country) other;
	    
		return (countryId == null ?  (otherCountry.countryId == null) : countryId.equals(otherCountry.countryId))
			&& (name == null ?  (otherCountry.name == null) : name.equals(otherCountry.name))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}