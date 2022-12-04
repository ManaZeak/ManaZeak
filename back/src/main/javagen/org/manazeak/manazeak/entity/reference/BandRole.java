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
 * A role of a member of a band.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="band_role")
public class BandRole implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long bandRoleId;
	private String label;
	private String description;

    /**
     * No comment found in model diagram
     * @return value of bandRoleId
     */
    @Id
    @SequenceGenerator(name="SEQ_BAND_ROLE", sequenceName="SEQ_BAND_ROLE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_BAND_ROLE")
    @Column(name="band_role_id", nullable=false)
	public Long getBandRoleId(){
		return bandRoleId;
    }  
    /**
     * No comment found in model diagram
     * @param bandRoleId new value to give to bandRoleId
     */
	public void setBandRoleId(final Long bandRoleId){
		this.bandRoleId = bandRoleId;
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
     * @return value of description
     */
    @Column(name="description", nullable=true)
	public String getDescription(){
		return description;
    }  
    /**
     * No comment found in model diagram
     * @param description new value to give to description
     */
	public void setDescription(final String description){
		this.description = description;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (bandRoleId == null? 0 : bandRoleId.hashCode());
		result = 31 * result + (label == null? 0 : label.hashCode());
		result = 31 * result + (description == null? 0 : description.hashCode());
			
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
	    BandRole otherBandRole = (BandRole) other;
	    
		return (bandRoleId == null ?  (otherBandRole.bandRoleId == null) : bandRoleId.equals(otherBandRole.bandRoleId))
			&& (label == null ?  (otherBandRole.label == null) : label.equals(otherBandRole.label))
			&& (description == null ?  (otherBandRole.description == null) : description.equals(otherBandRole.description))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}