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
 * The locale supported by the app.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="Locale")
public class Locale implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long localeId;
	private String code;
	private String value;

    /**
     * No comment found in model diagram
     * @return value of localeId
     */
    @Id
    @SequenceGenerator(name="SEQ_LOCALE", sequenceName="SEQ_LOCALE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_LOCALE")
    @Column(name="locale_id", nullable=false)
	public Long getLocaleId(){
		return localeId;
    }  
    /**
     * No comment found in model diagram
     * @param localeId new value to give to localeId
     */
	public void setLocaleId(final Long localeId){
		this.localeId = localeId;
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
		result = 31 * result + (localeId == null? 0 : localeId.hashCode());
		result = 31 * result + (code == null? 0 : code.hashCode());
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
	    Locale otherLocale = (Locale) other;
	    
		return (localeId == null ?  (otherLocale.localeId == null) : localeId.equals(otherLocale.localeId))
			&& (code == null ?  (otherLocale.code == null) : code.equals(otherLocale.code))
			&& (value == null ?  (otherLocale.value == null) : value.equals(otherLocale.value))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}