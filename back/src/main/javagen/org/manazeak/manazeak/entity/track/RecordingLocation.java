package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import org.manazeak.manazeak.entity.reference.Country;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;

/**
 * Contains location where album where recorded.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="recording_location")
public class RecordingLocation implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long recordingLocationId;
	private String label;
	private Country country;

    /**
     * No comment found in model diagram
     * @return value of recordingLocationId
     */
    @Id
    @SequenceGenerator(name="SEQ_RECORDING_LOCATION", sequenceName="SEQ_RECORDING_LOCATION", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_RECORDING_LOCATION")
    @Column(name="recording_location_id", nullable=false)
	public Long getRecordingLocationId(){
		return recordingLocationId;
    }  
    /**
     * No comment found in model diagram
     * @param recordingLocationId new value to give to recordingLocationId
     */
	public void setRecordingLocationId(final Long recordingLocationId){
		this.recordingLocationId = recordingLocationId;
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
     * Association recording_location_country to Country
     * @return value of country
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="country_id", referencedColumnName="country_id")
	public Country getCountry(){
		return country;
    }  
    /**
     * Association recording_location_country to Country
     * @param country new value to give to country
     */
	public void setCountry(final Country country){
		this.country = country;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (recordingLocationId == null? 0 : recordingLocationId.hashCode());
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
	    RecordingLocation otherRecordingLocation = (RecordingLocation) other;
	    
		return (recordingLocationId == null ?  (otherRecordingLocation.recordingLocationId == null) : recordingLocationId.equals(otherRecordingLocation.recordingLocationId))
			&& (label == null ?  (otherRecordingLocation.label == null) : label.equals(otherRecordingLocation.label))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}