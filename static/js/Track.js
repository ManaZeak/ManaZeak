/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Track class - track object from db with all its metadata                           *
 *                                                                                     *
 *  track     : raw track incoming from db JSON                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Track = function(track) {

    // Track internal attributes
    this.ui = {
        entry: null,
        id: null,
        x: 0,
        y: 0
    };
    this.isSelected = false;


    // Filling Track object
    this.id = {
        track: track.ID,
        album: track.ALBUM.ID,
        artists: this._getArtistsIDFromArtistsArray(track.ARTISTS)
    };
    this.title        = track.TITLE;
    this.year         = track.YEAR;
    this.composer     = track.COMPOSER;
    this.performer    = track.PERFORMER;
    this.track        = track.TRACK_NUMBER;
    this.trackTotal   = track.ALBUM.TOTAL_TRACK;
    this.disc         = track.DISC_NUMBER;
    this.discTotal    = track.ALBUM.TOTAL_DISC;
    this.bpm          = track.BPM;
    this.lyrics       = track.LYRICS;
    this.comment      = track.COMMENT;
    this.bitRate      = track.BITRATE;
    this.sampleRate   = track.SAMPLERATE;
    this.duration     = track.DURATION;
    this.size         = track.SIZE;
    this.lastModified = track.LAST_MODIFIED;
    this.artist       = this._getArtistFromArtistsArray(track.ARTISTS);
    this.album        = track.ALBUM.TITLE;
    this.genre        = track.GENRE;
    this.fileType     = track.FILE_TYPE;
};


Track.prototype = {

    _getArtistsIDFromArtistsArray: function(artists) {
        var artistsID = [];

        for (var i = 0; i < artists.length ;++i) {
            artistsID.push(artists[i].ID);
        }

        return artistsID;
    },


    _getArtistFromArtistsArray: function(artists) {
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
    }
};
