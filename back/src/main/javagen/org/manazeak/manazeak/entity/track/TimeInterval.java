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
 * A time interval between two dates.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="time_interval")
public class TimeInterval implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long intervalId;
	private Integer startingDate;
	private Integer endingDate;
	private String intervalKey;

    /**
     * No comment found in model diagram
     * @return value of intervalId
     */
    @Id
    @SequenceGenerator(name="SEQ_TIME_INTERVAL", sequenceName="SEQ_TIME_INTERVAL", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_TIME_INTERVAL")
    @Column(name="interval_id", nullable=false)
	public Long getIntervalId(){
		return intervalId;
    }  
    /**
     * No comment found in model diagram
     * @param intervalId new value to give to intervalId
     */
	public void setIntervalId(final Long intervalId){
		this.intervalId = intervalId;
    }  
    /**
     * No comment found in model diagram
     * @return value of startingDate
     */
    @Column(name="starting_date", nullable=false)
	public Integer getStartingDate(){
		return startingDate;
    }  
    /**
     * No comment found in model diagram
     * @param startingDate new value to give to startingDate
     */
	public void setStartingDate(final Integer startingDate){
		this.startingDate = startingDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of endingDate
     */
    @Column(name="ending_date", nullable=true)
	public Integer getEndingDate(){
		return endingDate;
    }  
    /**
     * No comment found in model diagram
     * @param endingDate new value to give to endingDate
     */
	public void setEndingDate(final Integer endingDate){
		this.endingDate = endingDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of intervalKey
     */
    @Column(name="interval_key", nullable=false)
	public String getIntervalKey(){
		return intervalKey;
    }  
    /**
     * No comment found in model diagram
     * @param intervalKey new value to give to intervalKey
     */
	public void setIntervalKey(final String intervalKey){
		this.intervalKey = intervalKey;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (intervalId == null? 0 : intervalId.hashCode());
		result = 31 * result + (startingDate == null? 0 : startingDate.hashCode());
		result = 31 * result + (endingDate == null? 0 : endingDate.hashCode());
		result = 31 * result + (intervalKey == null? 0 : intervalKey.hashCode());
			
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
	    TimeInterval otherTimeInterval = (TimeInterval) other;
	    
		return (intervalId == null ?  (otherTimeInterval.intervalId == null) : intervalId.equals(otherTimeInterval.intervalId))
			&& (startingDate == null ?  (otherTimeInterval.startingDate == null) : startingDate.equals(otherTimeInterval.startingDate))
			&& (endingDate == null ?  (otherTimeInterval.endingDate == null) : endingDate.equals(otherTimeInterval.endingDate))
			&& (intervalKey == null ?  (otherTimeInterval.intervalKey == null) : intervalKey.equals(otherTimeInterval.intervalKey))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}