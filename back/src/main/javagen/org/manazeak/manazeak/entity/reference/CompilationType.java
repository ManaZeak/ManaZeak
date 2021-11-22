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
@Table(name="compilation_type")
public class CompilationType implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long compilationTypeId;
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
			&& (label == null ?  (otherCompilationType.label == null) : label.equals(otherCompilationType.label))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}