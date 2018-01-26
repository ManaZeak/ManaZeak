/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Track class                                    *
 *                                                 *
 *  Track object from db with all its metadata     *
 *                                                 *
 *  track : {object} Raw track from database JSON  *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import MzkObject from './MzkObject.js'

class Track extends MzkObject{

    constructor(track) {
        super();
        this.updateMetadata(track);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : updateMetadata (public)
     * class  : Track
     * desc   : Update metadata contained in Track (UI) object
     * arg    : {object} track - Raw JSON track
     **/
    updateMetadata(track) {
        this.id = {
            track:          track.ID                ? track.ID                : "",
            album:          track.ALBUM.ID          ? track.ALBUM.ID          : "",
            artists:        this._getArtistsIDFromArtistsArray(track.ARTISTS)
        };
        this.title        = track.TITLE             ? track.TITLE             : "";
        this.year         = track.YEAR              ? track.YEAR              : "";
        this.composer     = track.COMPOSER          ? track.COMPOSER          : "";
        this.performer    = track.PERFORMER         ? track.PERFORMER         : "";
        this.track        = track.TRACK_NUMBER      ? track.TRACK_NUMBER      : "";
        this.trackTotal   = track.ALBUM.TOTAL_TRACK ? track.ALBUM.TOTAL_TRACK : "";
        this.disc         = track.DISC_NUMBER       ? track.DISC_NUMBER        : "";
        this.discTotal    = track.ALBUM.TOTAL_DISC  ? track.ALBUM.TOTAL_DISC  : "";
        this.bpm          = track.BPM               ? track.BPM               : "";
        this.lyrics       = track.LYRICS            ? track.LYRICS            : "";
        this.comment      = track.COMMENT           ? track.COMMENT           : "";
        this.bitRate      = track.BITRATE           ? track.BITRATE           : "";
        this.sampleRate   = track.SAMPLERATE        ? track.SAMPLERATE        : "";
        this.duration     = track.DURATION          ? track.DURATION          : "";
        this.size         = track.SIZE              ? track.SIZE              : "";
        this.lastModified = track.LAST_MODIFIED     ? track.LAST_MODIFIED     : "";
        this.album        = track.ALBUM.TITLE       ? track.ALBUM.TITLE       : "";
        this.genre        = track.GENRE             ? track.GENRE             : "";
        this.fileType     = track.FILE_TYPE         ? track.FILE_TYPE         : "";
        this.cover        = track.COVER             ? "../static/img/covers/" + track.COVER : "../static/img/utils/defaultcover.svg";
        this.artist       = this._getArtistFromArtistsArray(track.ARTISTS);
        this.albumArtist  = this._getArtistFromArtistsArray(track.ALBUM.ARTISTS);
        this.playCount    = track.PLAY_COUNTER      ? track.PLAY_COUNTER      : 0;
        this.fileName     = track.FILENAME          ? track.FILENAME          : "";
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _getArtistsIDFromArtistsArray (private)
     * class  : Track
     * desc   : Extract artists IDs from JSON
     * arg    : {[object]} artists - Raw JSON array of objects
     * return : {[int]} - The artists ID array
     **/
    _getArtistsIDFromArtistsArray(artists) {
        if (artists === null || artists === undefined) { return ""; }

        let artistsID = [];
        for (let i = 0; i < artists.length; ++i) {
            artistsID.push(artists[i].ID);
        }

        return artistsID;
    }


    /**
     * method : _getArtistFromArtistsArray (private)
     * class  : Track
     * desc   : Create artists string from artist's names in [object]
     * arg    : {[object]} artists - Raw JSON array of objects
     * return : {string} The Artists concated string
     **/
    _getArtistFromArtistsArray(artists) {
        if (artists === null || artists === undefined) { return ""; }

        let artistsName = []; // Artists name array
        for (let i = 0; i < artists.length; ++i) {
            artistsName.push(artists[i].NAME);
        }

        artistsName.sort(); // In order to get artists alphabetically ordered

        let artist = ""; // Output string
        for (let i = 0; i < artistsName.length; ++i) {
            artist += artistsName[i];
            if (i < (artistsName.length - 1)) { artist += ", "; }
        }

        return artist;
    }

}

export default Track