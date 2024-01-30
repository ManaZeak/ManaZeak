package org.manazeak.manazeak.entity.management;

import jakarta.persistence.*;

import java.io.Serializable;

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

	private Long configurationTechId;
	private Long configurationId;
	private String code;
	private String value;
	private String type;

    /**
     * No comment found in model diagram
     * @return value of configurationTechId
     */
    @Id
    @SequenceGenerator(name="SEQ_CONFIGURATION", sequenceName="SEQ_CONFIGURATION", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_CONFIGURATION")
    @Column(name="configuration_tech_id", nullable=false)
	public Long getConfigurationTechId(){
		return configurationTechId;
    }
    /**
     * No comment found in model diagram
     * @param configurationTechId new value to give to configurationTechId
     */
	public void setConfigurationTechId(final Long configurationTechId){
		this.configurationTechId = configurationTechId;
    }
    /**
     * No comment found in model diagram
     * @return value of configurationId
     */
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
		result = 31 * result + (configurationTechId == null? 0 : configurationTechId.hashCode());
		result = 31 * result + (configurationId == null? 0 : configurationId.hashCode());
		result = 31 * result + (code == null? 0 : code.hashCode());
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

		return (configurationTechId == null ?  (otherConfiguration.configurationTechId == null) : configurationTechId.equals(otherConfiguration.configurationTechId))
			&& (configurationId == null ?  (otherConfiguration.configurationId == null) : configurationId.equals(otherConfiguration.configurationId))
			&& (code == null ?  (otherConfiguration.code == null) : code.equals(otherConfiguration.code))
			&& (value == null ?  (otherConfiguration.value == null) : value.equals(otherConfiguration.value))
			&& (type == null ?  (otherConfiguration.type == null) : type.equals(otherConfiguration.type))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}