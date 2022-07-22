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
@Table(name="scan_step")
public class ScanStep implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long scanStepId;
	private String label;
	private String code;

    /**
     * No comment found in model diagram
     * @return value of scanStepId
     */
    @Id
    @SequenceGenerator(name="SEQ_SCAN_STEP", sequenceName="SEQ_SCAN_STEP", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_SCAN_STEP")
    @Column(name="scan_step_id", nullable=false)
	public Long getScanStepId(){
		return scanStepId;
    }  
    /**
     * No comment found in model diagram
     * @param scanStepId new value to give to scanStepId
     */
	public void setScanStepId(final Long scanStepId){
		this.scanStepId = scanStepId;
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

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (scanStepId == null? 0 : scanStepId.hashCode());
		result = 31 * result + (label == null? 0 : label.hashCode());
		result = 31 * result + (code == null? 0 : code.hashCode());
			
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
	    ScanStep otherScanStep = (ScanStep) other;
	    
		return (scanStepId == null ?  (otherScanStep.scanStepId == null) : scanStepId.equals(otherScanStep.scanStepId))
			&& (label == null ?  (otherScanStep.label == null) : label.equals(otherScanStep.label))
			&& (code == null ?  (otherScanStep.code == null) : code.equals(otherScanStep.code))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}