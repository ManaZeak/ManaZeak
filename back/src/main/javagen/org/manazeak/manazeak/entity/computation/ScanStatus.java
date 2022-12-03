package org.manazeak.manazeak.entity.computation;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;
import org.manazeak.manazeak.entity.reference.ScanStep;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="scan_status")
public class ScanStatus implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long scanStatusId;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private Boolean isActive;
	private Integer totalTrackScanned;
	private Boolean isRescan;
	private ScanStep scanStep;

    /**
     * No comment found in model diagram
     * @return value of scanStatusId
     */
    @Id
    @SequenceGenerator(name="SEQ_SCAN_STATUS", sequenceName="SEQ_SCAN_STATUS", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_SCAN_STATUS")
    @Column(name="scan_status_id", nullable=false)
	public Long getScanStatusId(){
		return scanStatusId;
    }  
    /**
     * No comment found in model diagram
     * @param scanStatusId new value to give to scanStatusId
     */
	public void setScanStatusId(final Long scanStatusId){
		this.scanStatusId = scanStatusId;
    }  
    /**
     * No comment found in model diagram
     * @return value of startTime
     */
    @Column(name="start_time", nullable=false)
	public LocalDateTime getStartTime(){
		return startTime;
    }  
    /**
     * No comment found in model diagram
     * @param startTime new value to give to startTime
     */
	public void setStartTime(final LocalDateTime startTime){
		this.startTime = startTime;
    }  
    /**
     * No comment found in model diagram
     * @return value of endTime
     */
    @Column(name="end_time", nullable=true)
	public LocalDateTime getEndTime(){
		return endTime;
    }  
    /**
     * No comment found in model diagram
     * @param endTime new value to give to endTime
     */
	public void setEndTime(final LocalDateTime endTime){
		this.endTime = endTime;
    }  
    /**
     * No comment found in model diagram
     * @return value of isActive
     */
    @Column(name="is_active", nullable=false)
	public Boolean getIsActive(){
		return isActive;
    }  
    /**
     * No comment found in model diagram
     * @param isActive new value to give to isActive
     */
	public void setIsActive(final Boolean isActive){
		this.isActive = isActive;
    }  
    /**
     * No comment found in model diagram
     * @return value of totalTrackScanned
     */
    @Column(name="total_track_scanned", nullable=true)
	public Integer getTotalTrackScanned(){
		return totalTrackScanned;
    }  
    /**
     * No comment found in model diagram
     * @param totalTrackScanned new value to give to totalTrackScanned
     */
	public void setTotalTrackScanned(final Integer totalTrackScanned){
		this.totalTrackScanned = totalTrackScanned;
    }  
    /**
     * No comment found in model diagram
     * @return value of isRescan
     */
    @Column(name="is_rescan", nullable=false)
	public Boolean getIsRescan(){
		return isRescan;
    }  
    /**
     * No comment found in model diagram
     * @param isRescan new value to give to isRescan
     */
	public void setIsRescan(final Boolean isRescan){
		this.isRescan = isRescan;
    }  
    /**
     * Association scan_status_step to ScanStep
     * @return value of scanStep
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="scan_step_id", referencedColumnName="scan_step_id")
	public ScanStep getScanStep(){
		return scanStep;
    }  
    /**
     * Association scan_status_step to ScanStep
     * @param scanStep new value to give to scanStep
     */
	public void setScanStep(final ScanStep scanStep){
		this.scanStep = scanStep;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (scanStatusId == null? 0 : scanStatusId.hashCode());
		result = 31 * result + (startTime == null? 0 : startTime.hashCode());
		result = 31 * result + (endTime == null? 0 : endTime.hashCode());
		result = 31 * result + (isActive == null? 0 : isActive.hashCode());
		result = 31 * result + (totalTrackScanned == null? 0 : totalTrackScanned.hashCode());
		result = 31 * result + (isRescan == null? 0 : isRescan.hashCode());
			
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
	    ScanStatus otherScanStatus = (ScanStatus) other;
	    
		return (scanStatusId == null ?  (otherScanStatus.scanStatusId == null) : scanStatusId.equals(otherScanStatus.scanStatusId))
			&& (startTime == null ?  (otherScanStatus.startTime == null) : startTime.equals(otherScanStatus.startTime))
			&& (endTime == null ?  (otherScanStatus.endTime == null) : endTime.equals(otherScanStatus.endTime))
			&& (isActive == null ?  (otherScanStatus.isActive == null) : isActive.equals(otherScanStatus.isActive))
			&& (totalTrackScanned == null ?  (otherScanStatus.totalTrackScanned == null) : totalTrackScanned.equals(otherScanStatus.totalTrackScanned))
			&& (isRescan == null ?  (otherScanStatus.isRescan == null) : isRescan.equals(otherScanStatus.isRescan))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}