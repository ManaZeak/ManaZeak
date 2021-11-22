package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import javax.persistence.ManyToMany;
import java.time.LocalDate;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.CascadeType;
import org.manazeak.manazeak.entity.reference.Country;
import javax.persistence.Id;
import org.manazeak.manazeak.entity.reference.Key;
import javax.persistence.JoinTable;

/**
 * The track information.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="track")
public class Track implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long trackId;
	private String title;
	private Integer discNumber;
	private Integer trackNumber;
	private String isrc;
	private String lyrics;
	private LocalDate startRecordingDate;
	private LocalDate endRecordingDate;
	private Double duration;
	private String opus;
	private String subtitle;
	private Album album;
	private Set<Artist> producerList;
	private Set<Artist> composerList;
	private Set<Artist> lyricistList;
	private Set<Artist> performerList;
	private Set<Artist> engineerList;
	private Set<Artist> arrangerList;
	private Set<Band> artistsList;
	private Bpm bpm;
	private Set<Genre> genreList;
	private Set<Key> keyList;
	private Set<Country> countryList;

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
     * No comment found in model diagram
     * @return value of title
     */
    @Column(name="title", nullable=false)
	public String getTitle(){
		return title;
    }  
    /**
     * No comment found in model diagram
     * @param title new value to give to title
     */
	public void setTitle(final String title){
		this.title = title;
    }  
    /**
     * No comment found in model diagram
     * @return value of discNumber
     */
    @Column(name="disc_number", nullable=false)
	public Integer getDiscNumber(){
		return discNumber;
    }  
    /**
     * No comment found in model diagram
     * @param discNumber new value to give to discNumber
     */
	public void setDiscNumber(final Integer discNumber){
		this.discNumber = discNumber;
    }  
    /**
     * No comment found in model diagram
     * @return value of trackNumber
     */
    @Column(name="track_number", nullable=false)
	public Integer getTrackNumber(){
		return trackNumber;
    }  
    /**
     * No comment found in model diagram
     * @param trackNumber new value to give to trackNumber
     */
	public void setTrackNumber(final Integer trackNumber){
		this.trackNumber = trackNumber;
    }  
    /**
     * No comment found in model diagram
     * @return value of isrc
     */
    @Column(name="isrc", nullable=true)
	public String getIsrc(){
		return isrc;
    }  
    /**
     * No comment found in model diagram
     * @param isrc new value to give to isrc
     */
	public void setIsrc(final String isrc){
		this.isrc = isrc;
    }  
    /**
     * No comment found in model diagram
     * @return value of lyrics
     */
    @Column(name="lyrics", nullable=true)
	public String getLyrics(){
		return lyrics;
    }  
    /**
     * No comment found in model diagram
     * @param lyrics new value to give to lyrics
     */
	public void setLyrics(final String lyrics){
		this.lyrics = lyrics;
    }  
    /**
     * No comment found in model diagram
     * @return value of startRecordingDate
     */
    @Column(name="start_recording_date", nullable=true)
	public LocalDate getStartRecordingDate(){
		return startRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @param startRecordingDate new value to give to startRecordingDate
     */
	public void setStartRecordingDate(final LocalDate startRecordingDate){
		this.startRecordingDate = startRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of endRecordingDate
     */
    @Column(name="end_recording_date", nullable=true)
	public LocalDate getEndRecordingDate(){
		return endRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @param endRecordingDate new value to give to endRecordingDate
     */
	public void setEndRecordingDate(final LocalDate endRecordingDate){
		this.endRecordingDate = endRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of duration
     */
    @Column(name="duration", nullable=false)
	public Double getDuration(){
		return duration;
    }  
    /**
     * No comment found in model diagram
     * @param duration new value to give to duration
     */
	public void setDuration(final Double duration){
		this.duration = duration;
    }  
    /**
     * No comment found in model diagram
     * @return value of opus
     */
    @Column(name="opus", nullable=true)
	public String getOpus(){
		return opus;
    }  
    /**
     * No comment found in model diagram
     * @param opus new value to give to opus
     */
	public void setOpus(final String opus){
		this.opus = opus;
    }  
    /**
     * No comment found in model diagram
     * @return value of subtitle
     */
    @Column(name="subtitle", nullable=true)
	public String getSubtitle(){
		return subtitle;
    }  
    /**
     * No comment found in model diagram
     * @param subtitle new value to give to subtitle
     */
	public void setSubtitle(final String subtitle){
		this.subtitle = subtitle;
    }  
    /**
     * Association track_album to Album
     * @return value of album
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="album_id", referencedColumnName="album_id")
	public Album getAlbum(){
		return album;
    }  
    /**
     * Association track_album to Album
     * @param album new value to give to album
     */
	public void setAlbum(final Album album){
		this.album = album;
    }  
    /**
     * Association track_producer to Artist
     * @return value of producerList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_producer", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getProducerList(){
		return producerList;
    }  
    /**
     * Association track_producer to Artist
     * @param producerList new value to give to producerList
     */
	public void setProducerList(final Set<Artist> producerList){
		this.producerList = producerList;
    }  
    /**
     * Association track_composer to Artist
     * @return value of composerList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_composer", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getComposerList(){
		return composerList;
    }  
    /**
     * Association track_composer to Artist
     * @param composerList new value to give to composerList
     */
	public void setComposerList(final Set<Artist> composerList){
		this.composerList = composerList;
    }  
    /**
     * Association track_lyricist to Artist
     * @return value of lyricistList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_lyricist", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getLyricistList(){
		return lyricistList;
    }  
    /**
     * Association track_lyricist to Artist
     * @param lyricistList new value to give to lyricistList
     */
	public void setLyricistList(final Set<Artist> lyricistList){
		this.lyricistList = lyricistList;
    }  
    /**
     * Association track_performer to Artist
     * @return value of performerList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_performer", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getPerformerList(){
		return performerList;
    }  
    /**
     * Association track_performer to Artist
     * @param performerList new value to give to performerList
     */
	public void setPerformerList(final Set<Artist> performerList){
		this.performerList = performerList;
    }  
    /**
     * Association track_engineer to Artist
     * @return value of engineerList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_engineer", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getEngineerList(){
		return engineerList;
    }  
    /**
     * Association track_engineer to Artist
     * @param engineerList new value to give to engineerList
     */
	public void setEngineerList(final Set<Artist> engineerList){
		this.engineerList = engineerList;
    }  
    /**
     * Association track_arranger to Artist
     * @return value of arrangerList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_arranger", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "artist_id"))
	public Set<Artist> getArrangerList(){
		return arrangerList;
    }  
    /**
     * Association track_arranger to Artist
     * @param arrangerList new value to give to arrangerList
     */
	public void setArrangerList(final Set<Artist> arrangerList){
		this.arrangerList = arrangerList;
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
     * Association track_bpm to Bpm
     * @return value of bpm
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="bpm_id", referencedColumnName="bpm_id")
	public Bpm getBpm(){
		return bpm;
    }  
    /**
     * Association track_bpm to Bpm
     * @param bpm new value to give to bpm
     */
	public void setBpm(final Bpm bpm){
		this.bpm = bpm;
    }  
    /**
     * Association track_genre to Genre
     * @return value of genreList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_genre", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "genre_id"))
	public Set<Genre> getGenreList(){
		return genreList;
    }  
    /**
     * Association track_genre to Genre
     * @param genreList new value to give to genreList
     */
	public void setGenreList(final Set<Genre> genreList){
		this.genreList = genreList;
    }  
    /**
     * Association track_key to Key
     * @return value of keyList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_key", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "key_id"))
	public Set<Key> getKeyList(){
		return keyList;
    }  
    /**
     * Association track_key to Key
     * @param keyList new value to give to keyList
     */
	public void setKeyList(final Set<Key> keyList){
		this.keyList = keyList;
    }  
    /**
     * Association track_recording_location to Country
     * @return value of countryList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="track_recording_location", joinColumns=@JoinColumn(name = "track_id"), inverseJoinColumns=@JoinColumn(name = "country_id"))
	public Set<Country> getCountryList(){
		return countryList;
    }  
    /**
     * Association track_recording_location to Country
     * @param countryList new value to give to countryList
     */
	public void setCountryList(final Set<Country> countryList){
		this.countryList = countryList;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (trackId == null? 0 : trackId.hashCode());
		result = 31 * result + (title == null? 0 : title.hashCode());
		result = 31 * result + (discNumber == null? 0 : discNumber.hashCode());
		result = 31 * result + (trackNumber == null? 0 : trackNumber.hashCode());
		result = 31 * result + (isrc == null? 0 : isrc.hashCode());
		result = 31 * result + (lyrics == null? 0 : lyrics.hashCode());
		result = 31 * result + (startRecordingDate == null? 0 : startRecordingDate.hashCode());
		result = 31 * result + (endRecordingDate == null? 0 : endRecordingDate.hashCode());
		result = 31 * result + (duration == null? 0 : duration.hashCode());
		result = 31 * result + (opus == null? 0 : opus.hashCode());
		result = 31 * result + (subtitle == null? 0 : subtitle.hashCode());
			
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
			&& (title == null ?  (otherTrack.title == null) : title.equals(otherTrack.title))
			&& (discNumber == null ?  (otherTrack.discNumber == null) : discNumber.equals(otherTrack.discNumber))
			&& (trackNumber == null ?  (otherTrack.trackNumber == null) : trackNumber.equals(otherTrack.trackNumber))
			&& (isrc == null ?  (otherTrack.isrc == null) : isrc.equals(otherTrack.isrc))
			&& (lyrics == null ?  (otherTrack.lyrics == null) : lyrics.equals(otherTrack.lyrics))
			&& (startRecordingDate == null ?  (otherTrack.startRecordingDate == null) : startRecordingDate.equals(otherTrack.startRecordingDate))
			&& (endRecordingDate == null ?  (otherTrack.endRecordingDate == null) : endRecordingDate.equals(otherTrack.endRecordingDate))
			&& (duration == null ?  (otherTrack.duration == null) : duration.equals(otherTrack.duration))
			&& (opus == null ?  (otherTrack.opus == null) : opus.equals(otherTrack.opus))
			&& (subtitle == null ?  (otherTrack.subtitle == null) : subtitle.equals(otherTrack.subtitle))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}