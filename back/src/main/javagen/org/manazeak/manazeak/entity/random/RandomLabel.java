package org.manazeak.manazeak.entity.random;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import org.manazeak.manazeak.entity.track.Label;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="random_label")
public class RandomLabel implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long randomLabelId;
	private Long randomIndex;
	private Label label;

    /**
     * No comment found in model diagram
     * @return value of randomLabelId
     */
    @Id
    @SequenceGenerator(name="SEQ_RANDOM_LABEL", sequenceName="SEQ_RANDOM_LABEL", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_RANDOM_LABEL")
    @Column(name="random_label_id", nullable=false)
	public Long getRandomLabelId(){
		return randomLabelId;
    }  
    /**
     * No comment found in model diagram
     * @param randomLabelId new value to give to randomLabelId
     */
	public void setRandomLabelId(final Long randomLabelId){
		this.randomLabelId = randomLabelId;
    }  
    /**
     * No comment found in model diagram
     * @return value of randomIndex
     */
    @Column(name="random_index", nullable=false)
	public Long getRandomIndex(){
		return randomIndex;
    }  
    /**
     * No comment found in model diagram
     * @param randomIndex new value to give to randomIndex
     */
	public void setRandomIndex(final Long randomIndex){
		this.randomIndex = randomIndex;
    }  
    /**
     * Association rand_label to Label
     * @return value of label
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="label_id", referencedColumnName="label_id")
	public Label getLabel(){
		return label;
    }  
    /**
     * Association rand_label to Label
     * @param label new value to give to label
     */
	public void setLabel(final Label label){
		this.label = label;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (randomLabelId == null? 0 : randomLabelId.hashCode());
		result = 31 * result + (randomIndex == null? 0 : randomIndex.hashCode());
			
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
	    RandomLabel otherRandomLabel = (RandomLabel) other;
	    
		return (randomLabelId == null ?  (otherRandomLabel.randomLabelId == null) : randomLabelId.equals(otherRandomLabel.randomLabelId))
			&& (randomIndex == null ?  (otherRandomLabel.randomIndex == null) : randomIndex.equals(otherRandomLabel.randomIndex))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}