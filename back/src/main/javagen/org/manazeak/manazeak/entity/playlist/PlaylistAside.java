package org.manazeak.manazeak.entity.playlist;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import org.manazeak.manazeak.entity.security.MzkUser;
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
@Table(name="playlist_aside")
public class PlaylistAside implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long playlistAsideId;
	private Integer rank;
	private Playlist playlist;
	private MzkUser mzkUser;

    /**
     * No comment found in model diagram
     * @return value of playlistAsideId
     */
    @Id
    @SequenceGenerator(name="SEQ_PLAYLIST_ASIDE", sequenceName="SEQ_PLAYLIST_ASIDE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_PLAYLIST_ASIDE")
    @Column(name="playlist_aside_id", nullable=false)
	public Long getPlaylistAsideId(){
		return playlistAsideId;
    }  
    /**
     * No comment found in model diagram
     * @param playlistAsideId new value to give to playlistAsideId
     */
	public void setPlaylistAsideId(final Long playlistAsideId){
		this.playlistAsideId = playlistAsideId;
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
     * Association playlist_aside_playlist to Playlist
     * @return value of playlist
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="playlist_id", referencedColumnName="playlist_id")
	public Playlist getPlaylist(){
		return playlist;
    }  
    /**
     * Association playlist_aside_playlist to Playlist
     * @param playlist new value to give to playlist
     */
	public void setPlaylist(final Playlist playlist){
		this.playlist = playlist;
    }  
    /**
     * Association playlist_aside_user to MzkUser
     * @return value of mzkUser
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName="user_id")
	public MzkUser getMzkUser(){
		return mzkUser;
    }  
    /**
     * Association playlist_aside_user to MzkUser
     * @param mzkUser new value to give to mzkUser
     */
	public void setMzkUser(final MzkUser mzkUser){
		this.mzkUser = mzkUser;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (playlistAsideId == null? 0 : playlistAsideId.hashCode());
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
	    PlaylistAside otherPlaylistAside = (PlaylistAside) other;
	    
		return (playlistAsideId == null ?  (otherPlaylistAside.playlistAsideId == null) : playlistAsideId.equals(otherPlaylistAside.playlistAsideId))
			&& (rank == null ?  (otherPlaylistAside.rank == null) : rank.equals(otherPlaylistAside.rank))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}