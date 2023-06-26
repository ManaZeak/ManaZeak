package org.manazeak.manazeak.entity.management;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import org.manazeak.manazeak.entity.track.Track;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="moodbar_error")
public class MoodbarError implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long moodErrorId;
	private String error;
	private Track track;

    /**
     * No comment found in model diagram
     * @return value of moodErrorId
     */
    @Id
    @SequenceGenerator(name="SEQ_MOODBAR_ERROR", sequenceName="SEQ_MOODBAR_ERROR", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_MOODBAR_ERROR")
    @Column(name="mood_error_id", nullable=false)
	public Long getMoodErrorId(){
		return moodErrorId;
    }  
    /**
     * No comment found in model diagram
     * @param moodErrorId new value to give to moodErrorId
     */
	public void setMoodErrorId(final Long moodErrorId){
		this.moodErrorId = moodErrorId;
    }  
    /**
     * No comment found in model diagram
     * @return value of error
     */
    @Column(name="error", nullable=false)
	public String getError(){
		return error;
    }  
    /**
     * No comment found in model diagram
     * @param error new value to give to error
     */
	public void setError(final String error){
		this.error = error;
    }  
    /**
     * Association moobar_error_track to Track
     * @return value of track
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="track_id", referencedColumnName="track_id")
	public Track getTrack(){
		return track;
    }  
    /**
     * Association moobar_error_track to Track
     * @param track new value to give to track
     */
	public void setTrack(final Track track){
		this.track = track;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (moodErrorId == null? 0 : moodErrorId.hashCode());
		result = 31 * result + (error == null? 0 : error.hashCode());
			
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
	    MoodbarError otherMoodbarError = (MoodbarError) other;
	    
		return (moodErrorId == null ?  (otherMoodbarError.moodErrorId == null) : moodErrorId.equals(otherMoodbarError.moodErrorId))
			&& (error == null ?  (otherMoodbarError.error == null) : error.equals(otherMoodbarError.error))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}