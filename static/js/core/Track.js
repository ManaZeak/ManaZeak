/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Track class - track object from db with all its metadata                           *
 *                                                                                     *
 *  track     : raw track incoming from db JSON                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Track = function(track) {
    // Filling Track object
    this.id = {
        track: track.ID                         !== "null" ? track.ID : "",
        album: track.ALBUM.ID                   !== "null" ? track.ALBUM.ID : "",
        artists: this._getArtistsIDFromArtistsArray(track.ARTISTS)
    };
    this.title        = track.TITLE             !== "null" ? track.TITLE : "";
    this.year         = track.YEAR              !== "null" ? track.YEAR : "";
    this.composer     = track.COMPOSER          !== "null" ? track.COMPOSER : "";
    this.performer    = track.PERFORMER         !== "null" ? track.PERFORMER : "";
    this.track        = track.TRACK_NUMBER      !== "null" ? track.TRACK_NUMBER : "";
    this.trackTotal   = track.ALBUM.TOTAL_TRACK !== "null" ? track.ALBUM.TOTAL_TRACK : "";
    this.disc         = track.DISC_NUMBER       !== "null" ? track.DISC_NMBER : "";
    this.discTotal    = track.ALBUM.TOTAL_DISC  !== "null" ? track.ALBUM.TOTAL_DISC : "";
    this.bpm          = track.BPM               !== "null" ? track.BPM : "";
    this.lyrics       = track.LYRICS            !== "null" ? track.LYRICS : "";
    this.comment      = track.COMMENT           !== "null" ? track.COMMENT : "";
    this.bitRate      = track.BITRATE           !== "null" ? track.BITRATE : "";
    this.sampleRate   = track.SAMPLERATE        !== "null" ? track.SAMPLERATE : "";
    this.duration     = track.DURATION          !== "null" ? track.DURATION : "";
    this.size         = track.SIZE              !== "null" ? track.SIZE : "";
    this.lastModified = track.LAST_MODIFIED     !== "null" ? track.LAST_MODIFIED : "";
    this.artist       = this._getArtistFromArtistsArray(track.ARTISTS);
    this.album        = track.ALBUM.TITLE       !== "null" ? track.ALBUM.TITLE : "";
    this.genre        = track.GENRE             !== "null" ? track.GENRE : "";
    this.fileType     = track.FILE_TYPE         !== "null" ? track.FILE_TYPE : "";
    this.cover        = track.COVER             !== "null" ? "../static/img/covers/" + track.COVER : "../static/img/utils/defaultcover.svg";
};


Track.prototype = {

    _getArtistsIDFromArtistsArray: function(artists) {
        if (artists === "null") {
            return "";
        }

        var artistsID = [];

        for (var i = 0; i < artists.length ;++i) {
            artistsID.push(artists[i].ID);
        }

        return artistsID;
    },


    _getArtistFromArtistsArray: function(artists) {
        if (artists === "null") {
            return "";
        }

        var artistsName = []; // Artists name array
        var artist = ""; // Output string

        for (var i = 0; i < artists.length ;++i) {
            artistsName.push(artists[i].NAME);
        }

        artistsName.sort(); // In order to get artists alphabetically ordered

        for (i = 0; i < artistsName.length ;++i) {
            artist += artistsName[i];

            if (i < (artistsName.length - 1)) { artist += ", "; }
        }

        return artist;
    },


    updateMetadata: function(track) {
        // Filling Track object
        this.id = {
            track: track.ID                         !== "null" ? track.ID : "",
            album: track.ALBUM.ID                   !== "null" ? track.ALBUM.ID : "",
            artists: this._getArtistsIDFromArtistsArray(track.ARTISTS)
        };
        this.title        = track.TITLE             !== "null" ? track.TITLE : "";
        this.year         = track.YEAR              !== "null" ? track.YEAR : "";
        this.composer     = track.COMPOSER          !== "null" ? track.COMPOSER : "";
        this.performer    = track.PERFORMER         !== "null" ? track.PERFORMER : "";
        this.track        = track.TRACK_NUMBER      !== "null" ? track.TRACK_NUMBER : "";
        this.trackTotal   = track.ALBUM.TOTAL_TRACK !== "null" ? track.ALBUM.TOTAL_TRACK : "";
        this.disc         = track.DISC_NUMBER       !== "null" ? track.DISC_NMBER : "";
        this.discTotal    = track.ALBUM.TOTAL_DISC  !== "null" ? track.ALBUM.TOTAL_DISC : "";
        this.bpm          = track.BPM               !== "null" ? track.BPM : "";
        this.lyrics       = track.LYRICS            !== "null" ? track.LYRICS : "";
        this.comment      = track.COMMENT           !== "null" ? track.COMMENT : "";
        this.bitRate      = track.BITRATE           !== "null" ? track.BITRATE : "";
        this.sampleRate   = track.SAMPLERATE        !== "null" ? track.SAMPLERATE : "";
        this.duration     = track.DURATION          !== "null" ? track.DURATION : "";
        this.size         = track.SIZE              !== "null" ? track.SIZE : "";
        this.lastModified = track.LAST_MODIFIED     !== "null" ? track.LAST_MODIFIED : "";
        this.album        = track.ALBUM.TITLE       !== "null" ? track.ALBUM.TITLE : "";
        this.genre        = track.GENRE             !== "null" ? track.GENRE : "";
        this.fileType     = track.FILE_TYPE         !== "null" ? track.FILE_TYPE : "";
        this.cover        = track.COVER             !== "null" ? "../static/img/covers/" + track.COVER : "../static/img/utils/defaultcover.svg";
        this.artist       = this._getArtistFromArtistsArray(track.ARTISTS);
        this.albumArtist  = this._getArtistFromArtistsArray(track.ALBUM.ARTIST);
    }
};
