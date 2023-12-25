package org.manazeak.manazeak.entity.management;

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
@Table(name="configuration")
public class Configuration implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long configurationId;
	private String value;
	private String type;

    /**
     * No comment found in model diagram
     * @return value of configurationId
     */
    @Id
    @SequenceGenerator(name="SEQ_CONFIGURATION", sequenceName="SEQ_CONFIGURATION", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_CONFIGURATION")
    @Column(name="configuration_id", nullable=false)
	public Long getConfigurationId(){
		return configurationId;
    }  
    /**
     * No comment found in model diagram
     * @param configurationId new value to give to configurationId
     */
	public void setConfigurationId(final Long configurationId){
		this.configurationId = configurationId;
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
    /**
     * No comment found in model diagram
     * @return value of type
     */
    @Column(name="type", nullable=false)
	public String getType(){
		return type;
    }  
    /**
     * No comment found in model diagram
     * @param type new value to give to type
     */
	public void setType(final String type){
		this.type = type;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (configurationId == null? 0 : configurationId.hashCode());
		result = 31 * result + (value == null? 0 : value.hashCode());
		result = 31 * result + (type == null? 0 : type.hashCode());
			
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
	    Configuration otherConfiguration = (Configuration) other;
	    
		return (configurationId == null ?  (otherConfiguration.configurationId == null) : configurationId.equals(otherConfiguration.configurationId))
			&& (value == null ?  (otherConfiguration.value == null) : value.equals(otherConfiguration.value))
			&& (type == null ?  (otherConfiguration.type == null) : type.equals(otherConfiguration.type))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}