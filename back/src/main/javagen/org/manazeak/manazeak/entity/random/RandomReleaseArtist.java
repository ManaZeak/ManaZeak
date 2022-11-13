package org.manazeak.manazeak.entity.random;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import org.manazeak.manazeak.entity.track.Artist;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="random_release_artist")
public class RandomReleaseArtist implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long randomReleaseArtistId;
	private Long randomIndex;
	private Artist artist;

    /**
     * No comment found in model diagram
     * @return value of randomReleaseArtistId
     */
    @Id
    @SequenceGenerator(name="SEQ_RANDOM_RELEASE_ARTIST", sequenceName="SEQ_RANDOM_RELEASE_ARTIST", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_RANDOM_RELEASE_ARTIST")
    @Column(name="random_release_artist_id", nullable=false)
	public Long getRandomReleaseArtistId(){
		return randomReleaseArtistId;
    }  
    /**
     * No comment found in model diagram
     * @param randomReleaseArtistId new value to give to randomReleaseArtistId
     */
	public void setRandomReleaseArtistId(final Long randomReleaseArtistId){
		this.randomReleaseArtistId = randomReleaseArtistId;
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
     * Association rand_rl_artist to Artist
     * @return value of artist
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="artist_id", referencedColumnName="artist_id")
	public Artist getArtist(){
		return artist;
    }  
    /**
     * Association rand_rl_artist to Artist
     * @param artist new value to give to artist
     */
	public void setArtist(final Artist artist){
		this.artist = artist;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (randomReleaseArtistId == null? 0 : randomReleaseArtistId.hashCode());
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
	    RandomReleaseArtist otherRandomReleaseArtist = (RandomReleaseArtist) other;
	    
		return (randomReleaseArtistId == null ?  (otherRandomReleaseArtist.randomReleaseArtistId == null) : randomReleaseArtistId.equals(otherRandomReleaseArtist.randomReleaseArtistId))
			&& (randomIndex == null ?  (otherRandomReleaseArtist.randomIndex == null) : randomIndex.equals(otherRandomReleaseArtist.randomIndex))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}