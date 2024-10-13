package org.manazeak.manazeak.entity.playlist;

import java.io.Serializable;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import org.manazeak.manazeak.entity.security.MzkUser;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import org.manazeak.manazeak.entity.track.Track;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="playlist_track")
public class PlaylistTrack implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long playlistTrackId;
	private LocalDateTime dateAdded;
	private Integer rank;
	private Playlist playlist;
	private MzkUser addedBy;
	private Track track;

    /**
     * No comment found in model diagram
     * @return value of playlistTrackId
     */
    @Id
    @SequenceGenerator(name="SEQ_PLAYLIST_TRACK", sequenceName="SEQ_PLAYLIST_TRACK", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_PLAYLIST_TRACK")
    @Column(name="playlist_track_id", nullable=false)
	public Long getPlaylistTrackId(){
		return playlistTrackId;
    }  
    /**
     * No comment found in model diagram
     * @param playlistTrackId new value to give to playlistTrackId
     */
	public void setPlaylistTrackId(final Long playlistTrackId){
		this.playlistTrackId = playlistTrackId;
    }  
    /**
     * No comment found in model diagram
     * @return value of dateAdded
     */
    @Column(name="date_added", nullable=false)
	public LocalDateTime getDateAdded(){
		return dateAdded;
    }  
    /**
     * No comment found in model diagram
     * @param dateAdded new value to give to dateAdded
     */
	public void setDateAdded(final LocalDateTime dateAdded){
		this.dateAdded = dateAdded;
    }  
    /**
     * No comment found in model diagram
     * @return value of rank
     */
    @Column(name="rank", nullable=false)
	public Integer getRank(){
		return rank;
    }  
    /**
     * No comment found in model diagram
     * @param rank new value to give to rank
     */
	public void setRank(final Integer rank){
		this.rank = rank;
    }  
    /**
     * Association playlist_track_playlist to Playlist
     * @return value of playlist
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="playlist_id", referencedColumnName="playlist_id")
	public Playlist getPlaylist(){
		return playlist;
    }  
    /**
     * Association playlist_track_playlist to Playlist
     * @param playlist new value to give to playlist
     */
	public void setPlaylist(final Playlist playlist){
		this.playlist = playlist;
    }  
    /**
     * Association added_by to MzkUser
     * @return value of addedBy
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName="user_id")
	public MzkUser getAddedBy(){
		return addedBy;
    }  
    /**
     * Association added_by to MzkUser
     * @param addedBy new value to give to addedBy
     */
	public void setAddedBy(final MzkUser addedBy){
		this.addedBy = addedBy;
    }  
    /**
     * Association track_playlist to Track
     * @return value of track
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="track_id", referencedColumnName="track_id")
	public Track getTrack(){
		return track;
    }  
    /**
     * Association track_playlist to Track
     * @param track new value to give to track
     */
	public void setTrack(final Track track){
		this.track = track;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (playlistTrackId == null? 0 : playlistTrackId.hashCode());
		result = 31 * result + (dateAdded == null? 0 : dateAdded.hashCode());
		result = 31 * result + (rank == null? 0 : rank.hashCode());
			
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
	    PlaylistTrack otherPlaylistTrack = (PlaylistTrack) other;
	    
		return (playlistTrackId == null ?  (otherPlaylistTrack.playlistTrackId == null) : playlistTrackId.equals(otherPlaylistTrack.playlistTrackId))
			&& (dateAdded == null ?  (otherPlaylistTrack.dateAdded == null) : dateAdded.equals(otherPlaylistTrack.dateAdded))
			&& (rank == null ?  (otherPlaylistTrack.rank == null) : rank.equals(otherPlaylistTrack.rank))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}