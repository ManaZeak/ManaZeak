package org.manazeak.manazeak.entity.random;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import org.manazeak.manazeak.entity.track.Genre;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="random_genre")
public class RandomGenre implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long randomGenreId;
	private Long randomIndex;
	private Genre genre;

    /**
     * No comment found in model diagram
     * @return value of randomGenreId
     */
    @Id
    @SequenceGenerator(name="SEQ_RANDOM_GENRE", sequenceName="SEQ_RANDOM_GENRE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_RANDOM_GENRE")
    @Column(name="random_genre_id", nullable=false)
	public Long getRandomGenreId(){
		return randomGenreId;
    }  
    /**
     * No comment found in model diagram
     * @param randomGenreId new value to give to randomGenreId
     */
	public void setRandomGenreId(final Long randomGenreId){
		this.randomGenreId = randomGenreId;
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
     * Association rand_genre to Genre
     * @return value of genre
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="genre_id", referencedColumnName="genre_id")
	public Genre getGenre(){
		return genre;
    }  
    /**
     * Association rand_genre to Genre
     * @param genre new value to give to genre
     */
	public void setGenre(final Genre genre){
		this.genre = genre;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (randomGenreId == null? 0 : randomGenreId.hashCode());
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
	    RandomGenre otherRandomGenre = (RandomGenre) other;
	    
		return (randomGenreId == null ?  (otherRandomGenre.randomGenreId == null) : randomGenreId.equals(otherRandomGenre.randomGenreId))
			&& (randomIndex == null ?  (otherRandomGenre.randomIndex == null) : randomIndex.equals(otherRandomGenre.randomIndex))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}