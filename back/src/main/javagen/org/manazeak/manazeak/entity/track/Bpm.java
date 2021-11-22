package org.manazeak.manazeak.entity.track;

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
@Table(name="bpm")
public class Bpm implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long bpmId;
	private Double bpm;
	private Double bpmOffset;
	private Double firstBar;

    /**
     * No comment found in model diagram
     * @return value of bpmId
     */
    @Id
    @SequenceGenerator(name="SEQ_BPM", sequenceName="SEQ_BPM", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_BPM")
    @Column(name="bpm_id", nullable=false)
	public Long getBpmId(){
		return bpmId;
    }  
    /**
     * No comment found in model diagram
     * @param bpmId new value to give to bpmId
     */
	public void setBpmId(final Long bpmId){
		this.bpmId = bpmId;
    }  
    /**
     * No comment found in model diagram
     * @return value of bpm
     */
    @Column(name="bpm", nullable=false)
	public Double getBpm(){
		return bpm;
    }  
    /**
     * No comment found in model diagram
     * @param bpm new value to give to bpm
     */
	public void setBpm(final Double bpm){
		this.bpm = bpm;
    }  
    /**
     * No comment found in model diagram
     * @return value of bpmOffset
     */
    @Column(name="bpm_offset", nullable=true)
	public Double getBpmOffset(){
		return bpmOffset;
    }  
    /**
     * No comment found in model diagram
     * @param bpmOffset new value to give to bpmOffset
     */
	public void setBpmOffset(final Double bpmOffset){
		this.bpmOffset = bpmOffset;
    }  
    /**
     * No comment found in model diagram
     * @return value of firstBar
     */
    @Column(name="first_bar", nullable=true)
	public Double getFirstBar(){
		return firstBar;
    }  
    /**
     * No comment found in model diagram
     * @param firstBar new value to give to firstBar
     */
	public void setFirstBar(final Double firstBar){
		this.firstBar = firstBar;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (bpmId == null? 0 : bpmId.hashCode());
		result = 31 * result + (bpm == null? 0 : bpm.hashCode());
		result = 31 * result + (bpmOffset == null? 0 : bpmOffset.hashCode());
		result = 31 * result + (firstBar == null? 0 : firstBar.hashCode());
			
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
	    Bpm otherBpm = (Bpm) other;
	    
		return (bpmId == null ?  (otherBpm.bpmId == null) : bpmId.equals(otherBpm.bpmId))
			&& (bpm == null ?  (otherBpm.bpm == null) : bpm.equals(otherBpm.bpm))
			&& (bpmOffset == null ?  (otherBpm.bpmOffset == null) : bpmOffset.equals(otherBpm.bpmOffset))
			&& (firstBar == null ?  (otherBpm.firstBar == null) : firstBar.equals(otherBpm.firstBar))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}