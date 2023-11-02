package org.manazeak.manazeak.entity.track;

import jakarta.persistence.*;
import org.manazeak.manazeak.entity.reference.Locale;

import java.io.Serializable;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="testimony")
public class Testimony implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Integer testimonyId;
	private String text;
	private Artist fromArtist;
	private Locale locale;

    /**
     * No comment found in model diagram
     * @return value of testimonyId
     */
    @Id
    @SequenceGenerator(name="SEQ_TESTIMONY", sequenceName="SEQ_TESTIMONY", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_TESTIMONY")
    @Column(name="testimony_id", nullable=false)
	public Integer getTestimonyId(){
		return testimonyId;
    }  
    /**
     * No comment found in model diagram
     * @param testimonyId new value to give to testimonyId
     */
	public void setTestimonyId(final Integer testimonyId){
		this.testimonyId = testimonyId;
    }  
    /**
     * No comment found in model diagram
     * @return value of text
     */
    @Column(name="text", nullable=false)
	public String getText(){
		return text;
    }  
    /**
     * No comment found in model diagram
     * @param text new value to give to text
     */
	public void setText(final String text){
		this.text = text;
    }  
    /**
     * Association testimony_from_artist to Artist
     * @return value of fromArtist
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="from_artist_id", referencedColumnName="artist_id")
	public Artist getFromArtist(){
		return fromArtist;
    }  
    /**
     * Association testimony_from_artist to Artist
     * @param fromArtist new value to give to fromArtist
     */
	public void setFromArtist(final Artist fromArtist){
		this.fromArtist = fromArtist;
    }  
    /**
     * Association testimony_locale to Locale
     * @return value of locale
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="locale_id", referencedColumnName="locale_id")
	public Locale getLocale(){
		return locale;
    }  
    /**
     * Association testimony_locale to Locale
     * @param locale new value to give to locale
     */
	public void setLocale(final Locale locale){
		this.locale = locale;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (testimonyId == null? 0 : testimonyId.hashCode());
		result = 31 * result + (text == null? 0 : text.hashCode());
			
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
	    Testimony otherTestimony = (Testimony) other;
	    
		return (testimonyId == null ?  (otherTestimony.testimonyId == null) : testimonyId.equals(otherTestimony.testimonyId))
			&& (text == null ?  (otherTestimony.text == null) : text.equals(otherTestimony.text))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}