package org.manazeak.manazeak.entity.security;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import org.manazeak.manazeak.entity.reference.WishStatus;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="wish")
public class Wish implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long wishId;
	private String content;
	private MzkUser mzkUser;
	private WishStatus wishStatus;

    /**
     * No comment found in model diagram
     * @return value of wishId
     */
    @Id
    @SequenceGenerator(name="SEQ_WISH", sequenceName="SEQ_WISH", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_WISH")
    @Column(name="wish_id", nullable=false)
	public Long getWishId(){
		return wishId;
    }  
    /**
     * No comment found in model diagram
     * @param wishId new value to give to wishId
     */
	public void setWishId(final Long wishId){
		this.wishId = wishId;
    }  
    /**
     * No comment found in model diagram
     * @return value of content
     */
    @Column(name="content", nullable=false)
	public String getContent(){
		return content;
    }  
    /**
     * No comment found in model diagram
     * @param content new value to give to content
     */
	public void setContent(final String content){
		this.content = content;
    }  
    /**
     * Association user_wish to MzkUser
     * @return value of mzkUser
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName="user_id")
	public MzkUser getMzkUser(){
		return mzkUser;
    }  
    /**
     * Association user_wish to MzkUser
     * @param mzkUser new value to give to mzkUser
     */
	public void setMzkUser(final MzkUser mzkUser){
		this.mzkUser = mzkUser;
    }  
    /**
     * Association wish_status to WishStatus
     * @return value of wishStatus
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="wish_status_id", referencedColumnName="wish_status_id")
	public WishStatus getWishStatus(){
		return wishStatus;
    }  
    /**
     * Association wish_status to WishStatus
     * @param wishStatus new value to give to wishStatus
     */
	public void setWishStatus(final WishStatus wishStatus){
		this.wishStatus = wishStatus;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (wishId == null? 0 : wishId.hashCode());
		result = 31 * result + (content == null? 0 : content.hashCode());
			
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
	    Wish otherWish = (Wish) other;
	    
		return (wishId == null ?  (otherWish.wishId == null) : wishId.equals(otherWish.wishId))
			&& (content == null ?  (otherWish.content == null) : content.equals(otherWish.content))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}