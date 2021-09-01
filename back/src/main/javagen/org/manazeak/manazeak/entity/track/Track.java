package org.manazeak.manazeak.entity.track;

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
 * The track information.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="Track")
public class Track implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long trackId;
	private Set<Band> artistsList;
	private Set<Band> performersList;

    /**
     * No comment found in model diagram
     * @return value of trackId
     */
    @Id
    @SequenceGenerator(name="SEQ_TRACK", sequenceName="SEQ_TRACK", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_TRACK")
    @Column(name="track_id", nullable=false)
	public Long getTrackId(){
		return trackId;
    }  
    /**
     * No comment found in model diagram
     * @param trackId new value to give to trackId
     */
	public void setTrackId(final Long trackId){
		this.trackId = trackId;
    }  
    /**
     * Association track_band_artist to Band
     * @return value of artistsList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_band_artist", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "band_id"))
	public Set<Band> getArtistsList(){
		return artistsList;
    }  
    /**
     * Association track_band_artist to Band
     * @param artistsList new value to give to artistsList
     */
	public void setArtistsList(final Set<Band> artistsList){
		this.artistsList = artistsList;
    }  
    /**
     * Association track_band_performer to Band
     * @return value of performersList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_band_performer", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "band_id"))
	public Set<Band> getPerformersList(){
		return performersList;
    }  
    /**
     * Association track_band_performer to Band
     * @param performersList new value to give to performersList
     */
	public void setPerformersList(final Set<Band> performersList){
		this.performersList = performersList;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (trackId == null? 0 : trackId.hashCode());
			
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
	    Track otherTrack = (Track) other;
	    
		return (trackId == null ?  (otherTrack.trackId == null) : trackId.equals(otherTrack.trackId))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}