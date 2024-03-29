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
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="compilation_type")
public class CompilationType implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long compilationTypeId;
	private Integer code;
	private String label;

    /**
     * No comment found in model diagram
     * @return value of compilationTypeId
     */
    @Id
    @SequenceGenerator(name="SEQ_COMPILATION_TYPE", sequenceName="SEQ_COMPILATION_TYPE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_COMPILATION_TYPE")
    @Column(name="compilation_type_id", nullable=false)
	public Long getCompilationTypeId(){
		return compilationTypeId;
    }  
    /**
     * No comment found in model diagram
     * @param compilationTypeId new value to give to compilationTypeId
     */
	public void setCompilationTypeId(final Long compilationTypeId){
		this.compilationTypeId = compilationTypeId;
    }  
    /**
     * No comment found in model diagram
     * @return value of code
     */
    @Column(name="code", nullable=false)
	public Integer getCode(){
		return code;
    }  
    /**
     * No comment found in model diagram
     * @param code new value to give to code
     */
	public void setCode(final Integer code){
		this.code = code;
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

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (compilationTypeId == null? 0 : compilationTypeId.hashCode());
		result = 31 * result + (code == null? 0 : code.hashCode());
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
	    CompilationType otherCompilationType = (CompilationType) other;
	    
		return (compilationTypeId == null ?  (otherCompilationType.compilationTypeId == null) : compilationTypeId.equals(otherCompilationType.compilationTypeId))
			&& (code == null ?  (otherCompilationType.code == null) : code.equals(otherCompilationType.code))
			&& (label == null ?  (otherCompilationType.label == null) : label.equals(otherCompilationType.label))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}