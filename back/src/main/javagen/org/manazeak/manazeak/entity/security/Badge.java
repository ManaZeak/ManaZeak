package org.manazeak.manazeak.entity.security;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.SequenceGenerator;
import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.JoinTable;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="badge")
public class Badge implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long badgeId;
	private String label;
	private Set<MzkUser> mzkUserList;

    /**
     * No comment found in model diagram
     * @return value of badgeId
     */
    @Id
    @SequenceGenerator(name="SEQ_BADGE", sequenceName="SEQ_BADGE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_BADGE")
    @Column(name="badge_id", nullable=false)
	public Long getBadgeId(){
		return badgeId;
    }  
    /**
     * No comment found in model diagram
     * @param badgeId new value to give to badgeId
     */
	public void setBadgeId(final Long badgeId){
		this.badgeId = badgeId;
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
     * Association badge_user to MzkUser
     * @return value of mzkUserList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="badge_user", joinColumns=@JoinColumn(name = "badge_id"), inverseJoinColumns=@JoinColumn(name = "user_id"))
	public Set<MzkUser> getMzkUserList(){
		return mzkUserList;
    }  
    /**
     * Association badge_user to MzkUser
     * @param mzkUserList new value to give to mzkUserList
     */
	public void setMzkUserList(final Set<MzkUser> mzkUserList){
		this.mzkUserList = mzkUserList;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (badgeId == null? 0 : badgeId.hashCode());
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
	    Badge otherBadge = (Badge) other;
	    
		return (badgeId == null ?  (otherBadge.badgeId == null) : badgeId.equals(otherBadge.badgeId))
			&& (label == null ?  (otherBadge.label == null) : label.equals(otherBadge.label))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}